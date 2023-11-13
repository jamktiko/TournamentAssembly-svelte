<script>
  import Router from './utils/Router.svelte';
  import Header from './core/Header.svelte';
  import Button from './reusable/Button.svelte';
  import { pop, location, push } from 'svelte-spa-router';
  import stateController from './utils/stateStore';
  import { slide } from 'svelte/transition';
  import { backIn } from 'svelte/easing';
  import Navbar from './core/Navbar.svelte';
  import Sidebar from './core/Sidebar.svelte';

  let userData;

  stateController.subscribe(($userData) => {
    userData = $userData;
  });

  function logout() {
    window.sessionStorage.removeItem('user');
    localStorage.clear();
    stateController.set({});

    push('/');
  }

  console.log(userData);

  let showSideBar = false;
  function toggleSideBar() {
    showSideBar = !showSideBar;
  }
</script>

<Header />

<Navbar on:toggleSidebar={toggleSideBar} />

{#if showSideBar}
  <Sidebar on:toggleSidebar={toggleSideBar} />
{/if}

<Router />

<style>
</style>
