<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<main>
  <div class="button-container">
    <div class="back-arrow-container">
      <Button on:cClick={() => push('/')}>
        <svg
          class="back-arrow"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          ><path
            d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
          /></svg
        >
      </Button>
    </div>
    <div class="buttons">
      <Button>Create A Tournament</Button>
      <Button>My Tournaments</Button>
    </div>
  </div>
</main>

<style>
  .button-container {
    width: 75vw;
    margin: auto;
  }
  .back-arrow-container {
    position: absolute;
    top: 3em;
    left: 2em;
  }
  .back-arrow {
    width: 4em;
    height: 4em;
    fill: rgb(255, 255, 255);
  }
  .buttons {
    display: flex;
    justify-content: space-evenly;
    padding: 5em;
  }
</style>
