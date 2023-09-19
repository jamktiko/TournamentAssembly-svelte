<script>
  import Button from "../reusable/Button.svelte";

  const groups = [
    { id: 0, name: "Group A", participants: ["Pertti"] },
    { id: 1, name: "Group B", participants: ["Jorma", "Nakki", "Makkara"] },
    { id: 2, name: "Group C", participants: ["Seppo", "Ismo"] },
  ];

  $: selected = null;

  function selectGroup(group) {
    selected = group;
  }
  function updateName(group){
    groups[group].participant = target.value;
  }
</script>

<main>
  <div id="group-manage">
    {#each groups as group}
      <h2>{group.name}</h2>
      <Button on:cClick={() => selectGroup(group)}>Click to manage group</Button
      >
    {/each}
  </div>
  <div id="group-view">
    {#if selected}
      <div id="group">
        <h2>{selected.name}</h2>
        <table>
          <tr>
            <th> Name </th>
          </tr>
          {#each selected.participants as participant}
            <tr>
              <input
            type="text"
            bind:value={participant}
            on:input={(event) => updateName(participant, event)}
          />
              

            </tr>
          {/each}
        </table>
      </div>
    {/if}
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

  #group-view {
    grid-column: 2;
  }
  input {
    color: rgb(255, 255, 255);

    font-size: 1.3em;
    padding: 0.5em 2em;
    border-radius: 20px;
    background-color: rgb(21, 21, 21);
    color: #ffffff;
    text-align: center;
  }
</style>
