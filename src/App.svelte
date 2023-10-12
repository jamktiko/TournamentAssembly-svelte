<script>
	import Router from "./utils/Router.svelte";
	import Header from "./core/Header.svelte";
	import Button from "./reusable/Button.svelte";
	import { pop, location } from "svelte-spa-router";
</script>

<Header />

{#if $location !== "/" && $location !== "/errorpage" && $location !== "/LoginUser" && $location !== "/Signup"}
	<Button class="back-button" on:cClick={() => pop()}>Back</Button>
{/if}

<Router />

<style>
</style>
