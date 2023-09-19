<script>
  import { createEventDispatcher } from "svelte";
  import Button from "./Button.svelte";

  const dp = createEventDispatcher();

  export let match;
  let scores = [0, 0];

  function resolveMatch(winner) {
    console.log(winner);
    dp("winnerevent", winner);
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
</div>

<style></style>
