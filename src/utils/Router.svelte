<script>
  import Router from 'svelte-spa-router';
  import Login from '../core/Login.svelte';
  import Profile from '../core/Profile.svelte';

  const routes = {
    '/': Login,
    '/profile': Profile,
  };
</script>

<Router {routes} />
