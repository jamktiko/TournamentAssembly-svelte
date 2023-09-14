<script>
  import { createEventDispatcher } from "svelte";

  const dp = createEventDispatcher();

  function customBtnClick() {
    dp("cClick");
  }
</script>

<button on:click={customBtnClick}>
  <slot />
</button>

<style></style>
