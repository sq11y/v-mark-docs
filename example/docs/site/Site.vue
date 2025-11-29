<template>
  <nav>
    <ul>
      <template v-for="route of routes" :key="route.path">
        <li>
          <router-link :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </li>
      </template>
    </ul>
  </nav>

  <RouterView />

  <MyButton>A button</MyButton>
</template>

<script lang="ts" setup>
  import routes from "v-mark-docs:routes";

  import MyButton from "../../src/components/Button.vue";
</script>
