<script setup>
import { ref } from 'vue';
import { supabase } from '@/libs/supabase';
import validateEmailDomain from '@/libs/emailDomain';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

let toast = useToast();

const router = useRouter();

const successMessage = ref('');
const loading = ref(false);
const email = ref('');
let errors = ref(null);
async function loginHandler() {
    loading.value = true;
    errors.value = null;

    if (!validateEmailDomain(email.value)) { // TODO: use edge functions to validate email domain
        toast.error('Invalid email!');
        console.log('invalid email');
        setTimeout(() => {
            loading.value = false;
        }, 5000);
        return;
    }

    // get full name from email address
    let fullName = email.value.split('@')[0];
    if (fullName.includes('.')) {
        fullName = fullName.split('.').map((name) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    } else {
        fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    }

    let { data, error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
            shouldCreateUser: true,
            data: {
                full_name: fullName,
            },
        },
    });
    loading.value = false;
    email.value = '';
    if (error) {
        loading.value = true;
        toast.error('Sign in with magic link failed!');
        errors.value = { items: [{ message: 'Sign in with magic link failed!' }] };
        console.log('Sign in with magic link failed!');
        console.log(error.message);
        setTimeout(() => {
            loading.value = false;
        }, 5000);
    } else {
        toast.success('Email sent! Check your inbox.');
        successMessage.value = 'Email sent! Check your inbox.';
        setTimeout(() => {
            successMessage.value = '';
        }, 5000);
    }
};
</script>

<template>
    <section class="flex flex-col items-center justify-center h-96 gap-4">
        <form @submit.prevent="loginHandler" class="flex flex-col gap-2 w-full md:w-96">
            <h1 class="self-start text-3xl font-bold">Login with magic link</h1>
            <input v-model="email" type="email" placeholder="Type your email" required />
            <div class="flex justify-between gap-4 items-start">
                <button :disabled="loading" type="submit"
                    class="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0">
                    Send magic link
                </button>
            </div>
        </form>
    </section>
</template>