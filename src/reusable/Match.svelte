<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  const dp = createEventDispatcher();

  export let match;
  let scores = [0, 0];

  function resolveMatch(matchData) {
    matchData.result1 = scores[0];
    matchData.result2 = scores[1];
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
    padding: 1em 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border-radius: 1em;
    background-color: rgba(69, 69, 69, 0.418);
    border-color: rgba(31, 0, 24, 0.295);
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
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
