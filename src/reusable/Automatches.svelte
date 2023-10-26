<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  export let agmatch;
  const dp = createEventDispatcher();
</script>

<div class="matches-list">
  <h1 class="card-image">{agmatch[0].name} - {agmatch[1].name}</h1>
  <h2 class="matchup-header">{agmatch[0].name} - {agmatch[1].name}</h2>
  <Button
    class="group-adjust-button"
    on:cClick={() => dp('chooseevent', agmatch[0], agmatch[1])}
    >PLAY MATCH</Button
  >
</div>

<style>
  .matches-list {
    width: 100%;
    margin-bottom: 2em;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding-top: 3em;
    padding-bottom: 3em;
    border-radius: 1em;
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(31, 0, 24, 0.295);
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transition-duration: 0.3s;
  }

  .matches-list:hover {
    scale: 1.01;
  }
  .matchup-header {
    font-size: 1.3em;
    padding-bottom: 1em;
  }

  .card-image {
    margin-top: 0em;
    opacity: 0;
    filter: blur(1px);
    position: absolute;
    font-size: 1.8em;
    z-index: -99;
    transition-duration: 0.3s;
  }
  .matches-list:hover .card-image {
    scale: 1.1;
    opacity: 0.3;
    filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5)) brightness(1)
      blur(2px);
  }
</style>
