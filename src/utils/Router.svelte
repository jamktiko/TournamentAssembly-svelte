<script>
  import Router from "svelte-spa-router";
  import Login from "../core/Login.svelte";
  import Selection from "../core/Selection.svelte";
  import Profile from "../core/Profile.svelte";
  import Scoreboard from "../core/Scoreboard.svelte";

  const routes = {
    "/": Login,
    "/profile": Profile,
    "/selection": Selection,
    "/scoreboard": Scoreboard,
  };
</script>

<Router {routes} />
