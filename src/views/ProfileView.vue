<script setup>
import { supabase } from '@/libs/supabase';
import UserInfo from '@/components/UserInfo.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

let toast = useToast();
let router = useRouter();

async function logout() {
    try {
        await supabase.auth.signOut();
        await router.push({ name: 'login' });
    } catch (error) {
        toast.error('Logout failed!');
        console.log(error.message);
    }
}
</script>

<template>
    <section class="h-screen py-4 space-y-4 flex flex-col text-center items-center">
        <UserInfo />
        <button @click="logout()" class="bg-gray-400 rounded py-2 px-3 text-white">Logout</button>
    </section>
</template>