<script>
  import Router from 'svelte-spa-router';
  import Login from '../core/Login.svelte';
  import Selection from '../core/Selection.svelte';
  import Profile from '../core/Profile.svelte';
  import LoginUser from '../reusable/LoginUser.svelte';
  import Signup from '../reusable/Signup.svelte';
  import Scoreboard from '../core/Scoreboard.svelte';
  import League from '../core/League.svelte';
  import Customizer from '../core/Customizer.svelte';
  import Group from '../core/Group.svelte';
  import Playoffs from '../core/Playoffs.svelte';
  import DevInfo from '../core/DevInfo.svelte';
  import Errorpage from '../core/Errorpage.svelte';
  import Winner from '../reusable/Winner.svelte';

  const routes = {
    '/': Login,
    '/profile': Profile,
    '/selection': Selection,
    '/loginuser': LoginUser,
    '/signup': Signup,
    '/scoreboard': Scoreboard,
    '/customizer/:id': Customizer,
    '/group/:tourdata': Group,
    '/playoffs/:tourdata': Playoffs,
    '/league/:tourdata': League,
    '/devinfo': DevInfo,
    '/winner': Winner,
    '/profile': Profile,
    '*': Errorpage,
  };
</script>

<Router {routes} />
