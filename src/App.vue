<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { Slide } from 'vue3-burger-menu'

const auth = useAuthStore();

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
      <span v-if="!auth.session">
        <RouterLink to="/login">Login</RouterLink>
      </span>
      <span v-if="auth.session">
        <RouterLink v-if="auth.session" to="/profile">Profile</RouterLink>
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
