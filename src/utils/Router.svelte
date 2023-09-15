<script>
  import Router from 'svelte-spa-router';
  import Login from '../core/Login.svelte';
  import Selection from '../core/Selection.svelte';
  import Profile from '../core/Profile.svelte';
  import LoginUser from '../reusable/LoginUser.svelte';
  import Signup from '../reusable/Signup.svelte';
  import Scoreboard from '../core/Scoreboard.svelte';
  import League from '../core/League.svelte';

  const routes = {
    '/': Login,
    '/profile': Profile,
    '/selection': Selection,
    '/loginuser': LoginUser,
    '/signup': Signup,
    '/scoreboard': Scoreboard,
    '/league': League,
  };
</script>

<Router {routes} />
