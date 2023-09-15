<script>
  import { push } from "svelte-spa-router";

  import Button from "../reusable/Button.svelte";
</script>

<main>
  <div class="text-container">
    <h2>Welcome user</h2>
    <h1>Create</h1>
  </div>
  <div class="button-container">
    <div class="buttons">
      <Button>Groups</Button>
      <Button>Playoffs</Button>
      <Button on:cClick={() => push("/scoreboard")}>Scoreboard</Button>
      <Button>League</Button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    padding: 1em;
    margin-left: 1em;
    margin-right: 1em;
  }

  .button-container {
    width: 35vw;
    margin: 4em;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: center;
  }

  h2 {
    padding-bottom: 1em;
  }
</style>
