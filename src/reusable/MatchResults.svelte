<script>
  export let matchResult;
</script>

<h1 class="results-header">RESULTS</h1>
<p>
  Below is alist of concluded matches and their results. You can hide the
  results from view by clicking the HIDE RESULTS button.
</p>
<table>
  <thead>
    <tr>
      <th>Team 1</th>
      <th>Score</th>
      <th>Team 2</th>
    </tr>
  </thead>
  <tbody>
    {#if matchResult.draw == true}
      <tr>
        <td class="teamname-td">{matchResult.contestants[0].name}</td>
        <td class="separator-td"
          >{matchResult.contestants[0].score} - {matchResult.contestants[1]
            .score}</td
        >
        <td class="teamname-td">{matchResult.contestants[1].name}</td>
      </tr>
    {:else if matchResult[0].contestants[0].win == true}
      <tr>
        <td class="winner-td">{matchResult[0].contestants[0].name}</td>
        <td class="separator-td"
          >{matchResult[0].contestants[0].score} - {matchResult[0]
            .contestants[1].score}</td
        >
        <td class="teamname-td">{matchResult[0].contestants[1].name}</td>
      </tr>
    {:else}
      <tr>
        <td class="teamname-td">{matchResult[0].contestants[0].name}</td>
        <td class="separator-td"
          >{matchResult[0].contestants[0].score} - {matchResult[0]
            .contestants[1].score}</td
        >
        <td class="winner-td">{matchResult[0].contestants[1].name}</td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
  th {
    text-transform: uppercase;
    text-align: center;
    width: 10em;
    text-decoration: underline;
    font-size: 1.6em;
  }

  td {
    text-align: center;
    font-size: 1.25em;
  }

  .teamname-td {
    flex: 1;
    font-weight: 300;
  }

  .separator-td {
    font-size: 1.5em;
    padding: 0em;
    font-weight: 300;
  }

  .winner-td {
    font-weight: 300;
    color: rgba(43, 185, 0);
  }

  table {
    margin-bottom: 2em;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  .results-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    text-transform: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }
</style>
