<script>
  export let matchResult;
</script>

<main>
  <div class="backdrop" />
  <td>Team 1</td>
  <td>Score</td>
  {#if matchResult.draw == true}
    <td><b>Draw</b></td>
  {:else}
    <td />
  {/if}
  <td>Score</td>
  <td>Team 2</td>
  <p />
  {#if matchResult.draw == true}
    <td>{matchResult.contestants[0].name}</td>
    <td>{matchResult.contestants[0].score}</td>
    <td> - </td>
    <td>{matchResult.contestants[1].score}</td>
    <td>{matchResult.contestants[1].name}</td>
  {:else if matchResult[0].contestants[0].win == true}
    <td><b>{matchResult[0].contestants[0].name}</b></td>
    <td>{matchResult[0].contestants[0].score}</td>
    <td> - </td>
    <td>{matchResult[0].contestants[1].score}</td>
    <td>{matchResult[0].contestants[1].name}</td>
  {:else}
    <td>{matchResult[0].contestants[0].name}</td>
    <td>{matchResult[0].contestants[0].score}</td>
    <td> - </td>
    <td>{matchResult[0].contestants[1].score}</td>
    <td><b>{matchResult[0].contestants[1].name}</b></td>
  {/if}
</main>

<style>
  td {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.308);
    border: 1px solid white;
    text-align: center;
    font-size: 1.7em;
    width: 5em;
    max-width: 5em;
  }

  b {
    color: rgba(43, 185, 0);
  }
</style>
