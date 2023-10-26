<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  export let agmatch;
  const dp = createEventDispatcher();
</script>

<div class="matches-list">
  <h2>{agmatch[0].name} vs {agmatch[1].name}</h2>
  <Button
    class="group-adjust-button"
    on:cClick={() => dp('chooseevent', agmatch[0], agmatch[1])}
    >PLAY MATCH</Button
  >
</div>

<style>
  .matches-list {
    margin-bottom: 1em;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
