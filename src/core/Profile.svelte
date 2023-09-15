<script>
  import Button from '../reusable/Button.svelte';
</script>

<main>
  <div class="button-container">
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
  .buttons {
    display: flex;
    justify-content: space-evenly;
    padding: 5em;
  }
</style>
