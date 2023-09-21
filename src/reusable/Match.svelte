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

<div>
  <h2>{match[0].name}</h2>
  <p>{scores[0]}</p>

  <Button on:cClick={() => scores[0]++}>+</Button>
  <Button on:cClick={() => scores[0]--}>-</Button>
  <Button on:cClick={() => resolveMatch({ winner: match[0], loser: match[1] })}
    >Win</Button
  >
  <br />
  <Button on:cClick={() => scores[1]++}>+</Button>
  <Button on:cClick={() => scores[1]--}>-</Button>
  <Button on:cClick={() => resolveMatch({ winner: match[1], loser: match[0] })}
    >Win</Button
  >

  <p>{scores[1]}</p>
  <h2>{match[1].name}</h2>

  <Button
    on:cClick={resolveMatch({
      draw: true,
      contestants: [match[0], match[1]],
    })}>Draw</Button
  >
</div>

<style></style>
