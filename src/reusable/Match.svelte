<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

  const dp = createEventDispatcher();

  export let match;
  let scores = [0, 0];

  function resolveMatch() {
    const matchData = {};
    if (scores[0] > scores[1]) {
      matchData.winner = match[0];
      matchData.loser = match[1];
    } else if (scores[1] > scores[0]) {
      matchData.winner = match[1];
      matchData.loser = match[0];
    } else {
      matchData.draw = true;
      matchData.contestants = [match[0], match[1]];
    }

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
  <h1 class="match-header">MATCH SCORING</h1>
  <p>
    Adjust the score of your ongoing match. When the final score is decided,
    press the CONCLUDE MATCH button.
  </p>
  <div class="match-container">
    <div class="team-content-container">
      <div class="team-container">
        <h2 class="team-name-header">Team</h2>
        <p class="team-name">{match[0].name}</p>
        <h3>Score</h3>
        <p class="team-score">{scores[0]}</p>
      </div>

      <div class="adjust-buttons-container">
        <Button class="league-plus-minus-button" on:cClick={() => scores[0]++}>+</Button>
        <Button
          disabled={scores[0] === 0 ? true : false}
          class="league-plus-minus-button"
          on:cClick={() => scores[0]--}>-</Button

        >
      </div>
    </div>

    <div class="team-content-container">
      <div class="team-container">
        <h2 class="team-name-header">Team</h2>
        <p class="team-name">{match[1].name}</p>
        <h3>Score</h3>
        <p class="team-score">{scores[1]}</p>
      </div>
      <div class="adjust-buttons-container">
        <Button class="league-plus-minus-button" on:cClick={() => scores[1]++}>+</Button>
        <Button
          disabled={scores[1] === 0 ? true : false}
          class="league-plus-minus-button"
          on:cClick={() => scores[1]--}>-</Button

        >
      </div>
    </div>
  </div>
  <div class="draw-container">
    <Button class="league-plus-minus-button" on:cClick={resolveMatch}
      >CONCLUDE MATCH</Button
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
    margin-top: 1em;
    width: 25vw;
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
    padding-bottom: 1em;
  }

  .draw-container {
    padding: 1em, 0em;
  }

  .team-name-header {
    font-size: 2em;
  }

  .team-name {
    font-size: 1.3em;
  }

  .match-header {
    font-size: 3em;
    margin-top: 2em;
  }

  p {
    font-size: 1.3em;
  }

  h3 {
    margin-top: 0.7em;
    font-size: 1.5em;
  }
</style>
