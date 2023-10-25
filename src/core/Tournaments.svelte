<script>
  import { onDestroy } from "svelte";
  import stateController from "../utils/stateStore";

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  onDestroy(() => {
    if (unsub) unsub();
  });

  const tournaments = user.tournaments;

  console.log(tournaments);
</script>

<main />
