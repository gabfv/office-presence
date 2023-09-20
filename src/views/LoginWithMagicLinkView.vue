<script setup>
    import { ref } from 'vue';
    import altogic from '@/libs/altogic';
    import validateEmailDomain from '@/libs/emailDomain';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const successMessage = ref('');
    const loading = ref(false);
    const email = ref('');
    let errors = ref(null);
    async function loginHandler() {
        loading.value = true;
        errors.value = null;

        if (!validateEmailDomain(email.value)) {
            errors.value = { items: [{ message: 'Invalid email address!' }] };
            console.log('invalid email')
            loading.value = false;
            return;
        }

        const { errors: apiErrors } = await altogic.auth.sendMagicLinkEmail(email.value);
        loading.value = false;
        let emailAddress = email.value;
        successMessage.value = 'Email sent! Check your inbox.';
        email.value = '';
        if (apiErrors) {
            // register with magic link
            await registerMagicLink(emailAddress);

        }
    };
    async function registerMagicLink(emailAddress) {
        // get name from all characters before @
        let name = emailAddress.split('@')[0];
        // generate a random pw
        let password = Math.random().toString(36).slice(-32);
        loading.value = true;
        errors.value = null;
        const { errors: apiErrors } = await altogic.auth.signUpWithEmail(emailAddress, password, name);
        loading.value = false;
        if (apiErrors) {
            console.log('Magic link failed!')
        }
    };
</script>

<template>
    <section class="flex flex-col items-center justify-center h-96 gap-4">
        <form @submit.prevent="loginHandler" class="flex flex-col gap-2 w-full md:w-96">
            <h1 class="self-start text-3xl font-bold">Login with magic link</h1>
            <div v-if="successMessage" class="bg-green-600 text-white text-[13px] p-2">{{ successMessage }}</div>
            <div v-if="errors" class="bg-red-600 text-white text-[13px] p-2">
                <p v-for="(error, index) in errors.items" :key="index">{{ error.message }}</p>
            </div>

            <input v-model="email" type="email" placeholder="Type your email" required />
            <div class="flex justify-between gap-4 items-start">
                <button
                    :disabled="loading"
                    type="submit"
                    class="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0"
                >
                    Send magic link
                </button>
            </div>
        </form>
    </section>
</template>