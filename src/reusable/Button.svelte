<script>
  import { createEventDispatcher } from 'svelte';

  const dp = createEventDispatcher();

  const customBtnClick = () => dp('cClick');
</script>

<button on:click={customBtnClick}>
  <slot />
</button>

<style>
  button {
    font-weight: 700;
    margin-bottom: 1em;
    font-size: 1.5em;
    padding: 1em 2em;
    border: solid 1px #ffffff3c;
    border-radius: 40px;
    background: linear-gradient(
      129deg,
      rgb(11, 11, 52) 0%,
      rgb(34, 5, 32) 100%
    );
    color: whitesmoke;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  button:active {
    scale: 0.95;
    color: #444444;
  }

  button:hover {
    border: solid 1px #2f001d;
    filter: brightness(1.2);
    filter: contrast(1.1);
    scale: 1.1;
  }
</style>
