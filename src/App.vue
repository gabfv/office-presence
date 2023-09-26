<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { auth } from '@/stores/auth';
import { supabase } from '@/libs/supabase';
import { Slide } from 'vue3-burger-menu'
import { useToast } from 'vue-toast-notification'

let toast = useToast();

let { data, error } = supabase.auth.getSession();
if (error) {
  console.log(error.message);
} else if (data) {
  auth.state.user = data.user;
}
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    toast.info('You have been signed out.');
    auth.state.user = {};
  } else if (event === 'SIGNED_IN') {
    auth.state.user = session.user;
  }
});
</script>

<template>
  <div id="app">
    <Slide :closeOnNavigation="true">
      <span>
        <RouterLink to="/">Home</RouterLink>
      </span>
      <span>
        <RouterLink to="/about">About</RouterLink>
      </span>
      <span v-if="!auth.state.user">
        <RouterLink to="/login">Login</RouterLink>
      </span>
      <span v-if="auth.state.user">
        <RouterLink v-if="auth.state.user" to="/profile">Profile</RouterLink>
      </span>
    </Slide>
  </div>

  <main id="page-wrap">
    <RouterView />
  </main>

</template> 

<style scoped>
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  padding: 0.8em;
}
</style>