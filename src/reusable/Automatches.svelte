<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  export let agmatch
  const dp = createEventDispatcher();
</script>


  {agmatch[0].name} vs {agmatch[1].name} <Button class="remove-player-button" on:cClick={() => dp('chooseevent', agmatch[0], agmatch[1])}>Choose</Button>
<p></p>
