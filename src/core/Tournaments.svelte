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
  import { loadFromSession } from '../utils/lib';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));
  console.log(user);

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  onDestroy(() => {
    if (unsub) unsub();
  });

  console.log(user.tournaments);
  let tournaments = user.tournaments;

  function openTournament(tournament) {
    const configTkn = cch.tokenify(tournament.config);

    if (tournament.state) {
      user.state = tournament.state;
      user.config = tournament.config;
      user.config.id = tournament._id;
    }

    stateController.set(user);
    if (tournament.type === 'scoreboard') {
      push(`/${tournament.type}/`);
    } else {
      push(`/${tournament.type}/${configTkn}`);
    }
  }

  async function deleteTournament(id) {
    const deleted = tournaments.find((tour) => tour._id === id);
    tournaments.splice(tournaments.indexOf(deleted), 1);

    tournaments = tournaments;

    user.tournaments = tournaments;

    await stateController.deleteTournament(id);
  }

  /* Function check if the window is for tablet, used for alternative playerlist */
  let isTablet = false;
  const checkScreenSize = () => {
    isTablet = window.matchMedia('(max-width: 1450px)').matches;
  };
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
</script>

{#if !isTablet}
  <main
    transition:slide={{
      duration: 700,
      easing: quintOut,
      axis: 'y',
    }}
  >
    <div class="tournaments-header">
      <h1>My Tournaments</h1>
    </div>
    <div class="tournaments-description">
      <p>
        Below is a list of all your saved tournaments and scoreboards. Choose
        any of them to continue playing or delete them.
      </p>
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
            <th />
          </tr>
        </thead>
        <tbody>
          {#each tournaments as tournament}
            <tr>
              <td>
                <Button
                  class="add-player-button"
                  on:cClick={() => openTournament(tournament)}>Open</Button
                >
              </td>
              <td
                >{tournament.config.tournamentName
                  ? tournament.config.tournamentName
                  : ''}</td
              >
              <td
                >{tournament.config.tourDecider
                  ? tournament.config.tourDecider
                  : ''}</td
              >
              <td
                >{tournament.config.numberOfGroups
                  ? tournament.config.numberOfGroups
                  : ''}</td
              >
              <td
                >{tournament.config.teamsInGroup
                  ? tournament.config.teamsInGroup
                  : ''}</td
              >
              <td
                >{tournament.config.pointsPerWin
                  ? tournament.config.pointsPerWin
                  : ''}</td
              >
              <td
                >{tournament.config.pointsPerDraw
                  ? tournament.config.pointsPerDraw
                  : ''}</td
              >
              <td>{tournament.type ? tournament.type.toUpperCase() : ''}</td>

              <td
                ><Button
                  class="delete-player-button"
                  on:cClick={() => deleteTournament(tournament._id)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
{:else}
  <main
    transition:slide={{
      duration: 700,
      easing: quintOut,
      axis: 'y',
    }}
  >
    <div class="tablet-header">
      <div class="tournaments-header">
        <h1>My Tournaments</h1>
      </div>
      <div class="tournaments-description">
        <p>
          Below is a list of all your saved tournaments and scoreboards. Choose
          any of them to continue playing or delete them.
        </p>
      </div>
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
            <th />
          </tr>
        </thead>
        <tbody>
          {#each tournaments as tournament (tournament._id)}
            <tr>
              <td>
                <Button
                  class="add-player-button"
                  on:cClick={() => openTournament(tournament)}>Open</Button
                >
              </td>
              <td
              >{tournament.config.tournamentName
                ? tournament.config.tournamentName
                : ''}</td
            >
            <td
              >{tournament.config.tourDecider
                ? tournament.config.tourDecider
                : ''}</td
            >
            <td
              >{tournament.config.numberOfGroups
                ? tournament.config.numberOfGroups
                : ''}</td
            >
            <td
              >{tournament.config.teamsInGroup
                ? tournament.config.teamsInGroup
                : ''}</td
            >
            <td
              >{tournament.config.pointsPerWin
                ? tournament.config.pointsPerWin
                : ''}</td
            >
            <td
              >{tournament.config.pointsPerDraw
                ? tournament.config.pointsPerDraw
                : ''}</td
            >
            <td>{tournament.type ? tournament.type.toUpperCase() : ''}</td>

            <td
                ><Button
                  class="delete-player-button"
                  on:cClick={() => deleteTournament(tournament._id)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
{/if}

<style>
  main {
    margin-left: 15%;
    margin-top: 30vh;
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
    font-size: 3em;
  }

  table {
    font-size: 1.3em;
    margin: 0em 1em;
    text-transform: uppercase;
    border-collapse: separate;
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

  .trash-can {
    fill: rgba(110, 0, 0);
  }
  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      width: 70%;
      margin-left: 15%;
      padding-top: 2em;
      margin-top: 25vh;
      background-color: transparent;
    }

    .tablet-header {
      text-align: center;
      padding: 3em 2em;
      border-radius: 40px;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 135%;
      margin: 1em 6em;
      padding-top: 4em;
      padding-bottom: 4em;
      border-radius: 40px;
      background-color: rgba(0, 0, 0, 0.5);
    }

    table {
      margin-top: -3em;
      scale: 0.8;
    }

    /* Mobile Phone */
    @media only screen and (max-width: 500px) {
      main {
        margin-top: 25vh;
        margin-left: 5%;
        width: 90%;
      }

      .tablet-header {
        text-align: center;
        padding: 3em 2em;
        border-radius: 40px;
        background-color: rgba(0, 0, 0, 0.5);
      }

      h1 {
        text-transform: uppercase;
        font-size: 2.5em;
      }

      p {
        font-size: 1.1em;
      }

      .list {
        width: 100%;
        padding-top: 1em;
        margin-top: 1em;
      }

      table {
        scale: 0.4;
        font-size: 1.4em;
        margin: 0em 0em;
        text-transform: uppercase;
        border-collapse: separate;
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
    }
  }
</style>
