<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

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
    <div
      class="team-content-container"
      transition:slide={{
        delay: 0,
        duration: 100,
        easing: quintOut,
        axis: 'y',
      }}
    >
      <div class="team-container">
        <h2 class="team-name-header">Team</h2>
        <p class="team-name">{match[0].name}</p>
        <h3 class="score-header">Score</h3>
        <p class="team-score">{scores[0]}</p>
      </div>

      <div class="adjust-buttons-container">
        <Button class="league-plus-minus-button" on:cClick={() => scores[0]++}
          >+</Button
        >
        <Button
          disabled={scores[0] === 0 ? true : false}
          class="league-plus-minus-button"
          on:cClick={() => scores[0]--}>-</Button
        >
      </div>
    </div>
    <h1 id="vs-header">VS</h1>
    <div
      class="team-content-container"
      transition:slide={{
        delay: 0,
        duration: 100,
        easing: quintOut,
        axis: 'y',
      }}
    >
      <div class="team-container">
        <h2 class="team-name-header">Team</h2>
        <p class="team-name">{match[1].name}</p>
        <h3 class="score-header">Score</h3>
        <p class="team-score">{scores[1]}</p>
      </div>
      <div class="adjust-buttons-container">
        <Button class="league-plus-minus-button" on:cClick={() => scores[1]++}
          >+</Button
        >
        <Button
          disabled={scores[1] === 0 ? true : false}
          class="league-plus-minus-button"
          on:cClick={() => scores[1]--}>-</Button
        >
      </div>
    </div>
  </div>
  <div class="draw-container">
    <Button class="conclude-match-button" on:cClick={resolveMatch}
      >CONCLUDE MATCH</Button
    >
    {#if match[0] && match[1]}
      <Button class="cancel-match-button" on:cClick={() => dp('cancelevent')}
        >CANCEL MATCH</Button
      >
    {/if}
  </div>
</main>

<style>
  main {
    margin-top: 26vh;
    margin-left: 15%;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .match-container {
    width: 80%;
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    justify-content: center;
    align-items: center;
    padding: 1em;
  }

  .team-content-container {
    margin-top: 1em;
    width: 25vw;
    padding: 0.7em 0.7em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border-radius: 1em;
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(31, 0, 24, 0.295);
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }

  .team-container {
    flex: 1;
    padding: 0.5em;
  }

  .adjust-buttons-container {
    padding-bottom: 1em;
  }

  .draw-container {
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 60%;
    display: grid;
    grid-template-columns: 200px 200px;
    grid-column-gap: 2em;
    padding: 1em, 0em;
  }

  .team-name-header {
    font-size: 2em;
  }

  .team-name {
    font-size: 1.6em;
  }

  .score-header {
    font-size: 2em;
  }

  .team-score {
    font-size: 1.6em;
  }

  .match-header {
    font-size: 2.2em;
    margin-top: 0.3em;
  }

  p {
    font-size: 1.3em;
  }

  h3 {
    margin-top: 0.5em;
    font-size: 1em;
  }

  #vs-header {
    font-size: 3.5em;
    padding-left: 1em;
    padding-right: 1em;
    filter: drop-shadow(0px 0px 0.1rem #ffff);
    animation: pulse 3s infinite;
  }

  @keyframes pulse {
    0% {
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }

    50% {
      filter: brightness(2.5) drop-shadow(0 0 0.5rem rgb(255, 255, 255, 0.5));
    }

    100% {
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      margin-top: 0vh;
    }

    .match-container {
      width: 100%;
      padding: 1em;
      margin: 0em 1em;
    }

    .team-content-container {
      margin-top: 1em;
      width: 25vw;
      padding: 0.7em 0.7em;
    }

    #vs-header {
      padding-left: 1em;
      padding-right: 1em;
    }

    .draw-container {
      grid-column-gap: 5em;
    }
  }


  /* Mobile Phone */
  @media only screen and (max-width: 600px) {
    #vs-header {
      padding-left: 0.1em;
      padding-right: 0.1em;
    }

    .match-container {
      width: 100%;
      padding: 1em;
      margin: 0em 1em;
    }

    .team-content-container {
      margin-top: 1em;
      width: 34vw;

      padding: 0.7em 0.7em;
    }

    .draw-container {
      grid-column-gap: 4em;
    }
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    .draw-container {
      grid-template-columns: 175px 175px;
    }
  }
</style>
