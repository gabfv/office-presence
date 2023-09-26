<script setup>
    import { auth } from '@/stores/auth';
    import { supabase } from '@/libs/supabase';
    import { ref } from 'vue';

    const username = ref(auth?.state?.user?.user_metadata?.full_name);
    const loading = ref(false);
    const inputRef = ref(null);
    const changeMode = ref(false);
    const errors = ref(null);

    function openChangeMode() {
        changeMode.value = true;
        setTimeout(() => {
            inputRef.value.focus();
        }, 100);
    }

    //TODO: update user full name.
</script>

<template>
    <section class="border p-4 w-full">
        <div class="flex items-center justify-center" v-if="changeMode">
            <input
                ref="inputRef"
                type="text"
                v-model="username"
                class="border-none text-3xl text-center"
            />
        </div>
        <div class="space-y-4" v-else>
            <h1 class="text-3xl">Hello, {{ auth?.state?.user?.user_metadata?.full_name }}</h1>
            <button @click="openChangeMode" class="border p-2">Change name</button>
        </div>
        <div v-if="errors">{{ errors }}</div>
    </section>
</template>