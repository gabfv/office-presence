<script setup>
import { supabase } from '@/libs/supabase';
import UserInfo from '@/components/UserInfo.vue';
import { useRouter } from 'vue-router';

async function logout() {
    const router = useRouter();
    try {
        await supabase.auth.signOut();
        router.push({ name: 'login' });
    } catch (error) {
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