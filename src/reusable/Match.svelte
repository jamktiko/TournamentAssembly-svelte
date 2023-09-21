<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  const dp = createEventDispatcher();

  export let match;
  let scores = [0, 0];

  function resolveMatch(matchData) {
    matchData.goalDiff =
      scores[0] - scores[1] < 0
        ? (scores[0] - scores[1]) * -1
        : scores[0] - scores[1];
    dp('winnerevent', matchData);
  }
</script>

<main>
  <div class="match-container">
    <div class="team-content-container">
      <div class="team-container">
        <h2>Team</h2>
        {match[0].name}
        <h3>Score</h3>
        {scores[0]}
      </div>

      <div class="adjust-buttons-container">
        <Button class="adjust-button" on:cClick={() => scores[0]++}>+</Button>
        <Button class="adjust-button" on:cClick={() => scores[0]--}>-</Button>
        <Button
          class="adjust-button"
          on:cClick={() => resolveMatch({ winner: match[0], loser: match[1] })}
          >Win</Button
        >
      </div>
    </div>

    <div class="team-content-container">
      <div class="team-container">
        <h2>Team</h2>
        {match[1].name}
        <h3>Score</h3>
        {scores[1]}
      </div>
      <div class="adjust-buttons-container">
        <Button class="adjust-button" on:cClick={() => scores[1]++}>+</Button>
        <Button class="adjust-button" on:cClick={() => scores[1]--}>-</Button>
        <Button
          class="adjust-button"
          on:cClick={() => resolveMatch({ winner: match[1], loser: match[0] })}
          >Win</Button
        >
      </div>
    </div>
  </div>
  <div class="draw-container">
    <Button
      class="adjust-button"
      on:cClick={resolveMatch({
        draw: true,
        contestants: [match[0], match[1]],
      })}>Draw</Button
    >
  </div>
</main>

<style>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
  }

  .match-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1em;
  }

  .team-content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .team-container {
    flex: 1;
    padding: 1em;
  }

  .adjust-buttons-container {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .draw-container {
    padding: 1em, 0em;
  }
</style>
