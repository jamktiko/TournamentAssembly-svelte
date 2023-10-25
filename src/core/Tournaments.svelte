<script>
  import { onDestroy } from 'svelte';
  import stateController from '../utils/stateStore';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  onDestroy(() => {
    if (unsub) unsub();
  });

  const tournaments = user.tournaments;

  console.log(tournaments);

  let testData = [
    { name: 'Tournament 1', type: 'League' },
    { name: 'Tournament 2', type: 'Playoffs' },
    { name: 'Tournament 3', type: 'Groups' },
    { name: 'Scoreboard 1', type: 'Scoreboard' },
    { name: 'Scoreboard 2', type: 'Scoreboard' },
    { name: 'Scoreboard 3', type: 'Scoreboard' },
  ];
</script>

<main>
  <div class="tournaments-header">
    <h1>Tournaments & Scoreboards</h1>
  </div>
  <div class="tournaments-description">
    <p>Below is a list of your created Tournaments and Scoreboards</p>
  </div>
  <div class="list">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {#each testData as data (data.name)}
          <tr>
            <td>{data.name}</td>
            <td>{data.type}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    margin-left: 15%;
    margin-top: 2em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding-top: 4em;
    padding-bottom: 3em;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1 {
    text-transform: uppercase;
    font-size: 2em;
  }

  table {
    font-size: 1.3em;
    margin: 0em 1em;
  }

  tr {
    height: 1em;
  }

  th {
    text-transform: uppercase;
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    text-align: center;
  }

  td {
    font-weight: 700;
    padding: 0.5em;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    border-bottom: 1px solid white;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .list {
    margin-top: 2em;
  }
</style>
