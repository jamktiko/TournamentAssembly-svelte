<script>
  import { createEventDispatcher } from "svelte";

  const dp = createEventDispatcher();

  const customBtnClick = () => dp("cClick");
</script>

<button on:click={customBtnClick}>
  <slot />
</button>

<style>
  button {
    padding: 20px;
    border-radius: 20px;
    background-color: #444444;
    color: whitesmoke;
  }

  button:active {
    background-color: whitesmoke;
    color: #444444;
  }
</style>
