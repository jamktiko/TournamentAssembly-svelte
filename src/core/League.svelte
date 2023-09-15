<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  let teams = [
    { id: 1, name: 'Tikopallo', score: 1, wins: 3, losses: 2 },
    { id: 2, name: 'BITpallo', score: 2, wins: 6, losses: 4 },
    { id: 3, name: 'Kauppispallo', score: 3, wins: 9, losses: 6 },
    { id: 4, name: 'Insinööripallo', score: 4, wins: 12, losses: 8 },
    { id: 5, name: 'Vitun Spede', score: 5, wins: 15, losses: 1 },
  ];

  let sortBy = '';
  let sortOrder = 1;

  function toggleSortOrder(column) {
    if (sortBy === column) {
      sortOrder *= -1;
    } else {
      sortBy = column;
      sortOrder = 1;
    }

    teams = teams.sort((a, b) => {
      return sortOrder * (a[column] > b[column] ? 1 : -1);
    });
  }
</script>

<div class="league-content">
  <div class="back-arrow-container">
    <Button on:cClick={() => push('/selection')}>
      <svg
        class="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        ><path
          d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
        /></svg
      >
    </Button>
  </div>
  <table>
    <thead>
      <tr>
        <th on:click={() => toggleSortOrder('name')}>Team Name</th>
        <th on:click={() => toggleSortOrder('score')}>Score</th>
        <th on:click={() => toggleSortOrder('wins')}>W</th>
        <th on:click={() => toggleSortOrder('losses')}>L</th>
      </tr>
    </thead>
    <tbody>
      {#each teams as team (team.id)}
        <tr>
          <td>{team.name}</td>
          <td>{team.score}</td>
          <td>{team.wins}</td>
          <td>{team.losses}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .league-content {
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
  }

  th {
    text-decoration: underline;
    text-align: left;
    padding-right: 3em;
  }

  .back-arrow-container {
    position: absolute;
    top: 3em;
    left: 2em;
  }

  .back-arrow {
    width: 4em;
    height: 4em;
    fill: rgb(255, 255, 255);
  }
</style>
