<script>
  import { onDestroy } from "svelte";
  import { stateController } from "../utils/stateStore.js";

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  onDestroy(() => {
    if (unsub) unsub();
  });

  console.log(user);
</script>

<main />
