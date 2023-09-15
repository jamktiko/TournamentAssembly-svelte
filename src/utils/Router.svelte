<script>
  import Router from 'svelte-spa-router';
  import Login from '../core/Login.svelte';
  import Selection from '../core/Selection.svelte';

  const routes = {
    '/': Login,
  };
</script>

<Router {routes} />
