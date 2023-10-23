<script>
	import Router from "./utils/Router.svelte";
	import Header from "./core/Header.svelte";
	import Button from "./reusable/Button.svelte";
	import { pop, location, push} from "svelte-spa-router";
</script>

<Header />

{#if $location !== "/" && $location !== "/errorpage" && $location !== "/LoginUser" && $location !== "/Signup"}
	{#if $location == "/selection"}
    <Button class="back-button" on:cClick={() => push('/')}>Back</Button>
    {:else}
      <Button class="back-button" on:cClick={() => push('/selection')}>Back</Button>
  {/if}
{/if}

<Router />

<style>
</style>
