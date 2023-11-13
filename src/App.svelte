<script>
  import Router from './utils/Router.svelte';
  import Header from './core/Header.svelte';
  import Navbar from './core/Navbar.svelte';
  import Sidebar from './core/Sidebar.svelte';

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
