<script>
  import Button from "../reusable/Button.svelte";

  const groups = ["Group A", "Group B", "Group C"];
</script>

<main>
  <div id="group-manage">
    {#each groups as group}
      <h2>{group}</h2>
      <Button>Click to manage group</Button>
    {/each}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr fr 1fr;
    grid-template-rows: auto;
    height: 100%;
  }

  #group-manage {
    grid-column: 1;
    margin-left: 20px;
  }
</style>
