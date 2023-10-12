<script>
  import Router from './utils/Router.svelte';
  import Header from './core/Header.svelte';
  import Button from './reusable/Button.svelte';
  import { pop, location } from 'svelte-spa-router';
  console.log($location);
</script>

<Header />

{#if $location !== '/' && $location !== '/errorpage'}
  <Button class="back-button" on:cClick={() => pop()}>Back</Button>
{/if}

<Router />

<style>
</style>
