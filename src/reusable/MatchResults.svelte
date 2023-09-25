<script>
  export let matchResult;
</script>

<main>
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
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  th {
    text-align: center;
    width: 5em;
    text-decoration: underline;
    font-size: 1.5em;
  }

  td {
    text-align: center;
    font-size: 1.25em;
  }

  .teamname-td {
    width: auto;
    padding: 0em 2.25em;
    font-weight: 700;
  }

  .separator-td {
    font-size: 1.5em;
    width: 100%;
  }

  .winner-td {
    width: auto;
    padding: 0em 2.25em;
    font-weight: 700;
    color: rgba(43, 185, 0);
  }
</style>
