<script>
  import Button from '../reusable/Button.svelte';

  const numberRounds = [3, 5];
  const deciderTypes = ['Round High Score'];

  let selectedRounds = '';
  let selectedDecider = '';

  function handleSelectRounds(event) {
    selectedRounds = event.target.value;
  }
  function handleSelectDecider(event) {
    selectedDecider = event.target.value;
  }
</script>

<main>
  <div class="customizer-content">
    <div class="customizer-header">
      <h1>Customize your scoreboard!</h1>
    </div>
    <div class="customizer-settings">
      <div>
        <label for="roundSelection">Number of Rounds</label>
        <br />
        <select
          id="roundSelection"
          bind:value={selectedRounds}
          on:change={handleSelectRounds}
        >
          {#each numberRounds as numberRound (numberRound)}
            <option value={numberRound}>{numberRound}</option>
          {/each}
        </select>
      </div>
      <div>
        <label for="deciderType">Decider Type</label>
        <br />
        <select
          id="deciderType"
          bind:value={selectedDecider}
          on:change={handleSelectDecider}
        >
          {#each deciderTypes as deciderType (deciderType)}
            <option value={deciderType}>{deciderType}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="createButton">
      <Button>Create</Button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-flow: row wrap;
  }

  .createButton {
    padding-top: 2em;
  }

  option,
  select {
    color: black;
  }
</style>
