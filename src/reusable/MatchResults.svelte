<script>
  export let matchResult;
</script>

{#if !matchResult.group}
  {matchResult[0].group}
{:else}
  {matchResult.group}
{/if}

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

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    table {
      margin: 0em 1em;
    }
  }
</style>
