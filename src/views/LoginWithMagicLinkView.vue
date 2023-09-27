<script setup>
import { ref } from 'vue';
import { supabase } from '@/libs/supabase';
//import validateEmailDomain from '@/libs/emailDomain';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useForm, Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup'

let toast = useToast();
let router = useRouter();

let loginSchema = toTypedSchema(
    yup.object({
        email: yup.string().required().email(),
    }),
);

let { errors, defineInputBinds } = useForm({
    validationSchema: loginSchema,
});

let email = defineInputBinds('email');

const successMessage = ref('');
const loading = ref(false);

async function validateEmailDomain(email) {
    loginSchema

    let domain = email.split('@')[1];
    if (domain !== null) {
        const { data, error } = await supabase.functions.invoke('validate-email-domain', {
            body: {domain: domain,},
        });
        if (error) {
            toast.error(error.message);
            return false;
        } else {
            return data.valid;
        }
    }
}

function onInvalidSubmit({ values, errors, results}) {
    for (let [key, value] of Object.entries(errors)) {
        toast.error(value);
    }
}

async function onSubmit(values, { resetForm }) {
    loading.value = true;
    const isEmailValid = await validateEmailDomain(values.email);

    if (!isEmailValid) {
        toast.error('Invalid email!');
        loading.value = false;
        return;
    } else {
        //TODO: Proceed with login.
    }

    resetForm();
}

async function loginHandler() {
    loading.value = true;


    //TODO: use edge functions to validate email domain but validate email format locally first
    // let { data, error } = await supabase.functions.invoke('validate_email_domains', {
    //    email: email.value,
    // });

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
        <Form @submit="onSubmit" :validation-schema="loginSchema" @invalid-submit="onInvalidSubmit" class="flex flex-col gap-2 w-full md:w-96">
            <h1 class="self-start text-3xl font-bold">Login with magic link</h1>
            <Field v-bind="email" type="email" name="email" label="Email field" placeholder="Type your email" />
            <div class="flex justify-between gap-4 items-start">
                <button :disabled="loading" type="submit"
                    class="border py-2 px-3 border-gray-500 hover:bg-gray-500 hover:text-white transition shrink-0">
                    {{ loading ? 'Loading...' : 'Sign in with magic link!' }}
                </button>
            </div>
        </Form>
    </section>
</template>