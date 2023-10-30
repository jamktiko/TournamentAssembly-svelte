<script>
  import { onDestroy } from 'svelte';
  import Button from '../reusable/Button.svelte';
  import stateController from '../utils/stateStore';
  import { push } from 'svelte-spa-router';
  import cch from '../utils/cache';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut, elasticInOut, quadInOut } from 'svelte/easing';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  onDestroy(() => {
    if (unsub) unsub();
  });

  const tournaments = user.tournaments;

  function openTournament(tournament) {
    const configTkn = cch.tokenify(tournament.config);

    if (tournament.state) {
      user.state = tournament.state;
      user.config = tournament.config;
    }

    stateController.set(user);

    push(`/${tournament.type}/${configTkn}`);
  }
</script>

<main
  transition:slide={{
    duration: 700,
    easing: quintOut,
    axis: 'y',
  }}
>
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
          <th />
          <th>Name</th>
          <th>Decider</th>
          <th>Groups</th>
          <th>Teams in Group</th>
          <th>Points for Win</th>
          <th>Points for Draw</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {#each tournaments as tournament (tournament.id)}
          <tr>
            <td>
              <Button
                class="add-player-button"
                on:cClick={() => openTournament(tournament)}>Open</Button
              >
            </td>
            <td>{tournament.config.tournamentName}</td>
            <td>{tournament.config.tourDecider}</td>
            <td>{tournament.config.numberOfGroups}</td>
            <td>{tournament.config.teamsInGroup}</td>
            <td>{tournament.config.pointsPerWin}</td>
            <td>{tournament.config.pointsPerDraw}</td>
            <td>{tournament.type.toUpperCase()}</td>
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

  table {
    text-transform: uppercase;
    border-collapse: separate;
  }

  h1 {
    text-transform: uppercase;
    font-size: 3em;
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
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid white;
    text-align: center;
    padding: 0em 1em;
  }

  td {
    font-weight: 700;
    padding: 0.5em;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    border-top: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .list {
    margin-top: 2em;
  }
</style>
