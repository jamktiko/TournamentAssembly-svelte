<script>
  import cch from '../utils/cache';
  import Button from '../reusable/Button.svelte';
  import Winner from '../reusable/Winner.svelte';
  import { push } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut, elasticInOut, quadInOut } from 'svelte/easing';
  import stateController from '../utils/stateStore';
  import { onDestroy } from 'svelte';
  import { loadFromSession } from '../utils/lib';
  import Tooltip from '../reusable/Tooltip.svelte';

  let showMatchWinPopup = false;
  let matchWinPopupMessage = '';

  let showRoundAdvancePopup = false;
  let roundAdvancePopupMessage = '';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  onDestroy(() => {
    if (unsub) unsub();

    if (user.state) delete user.state;
  });

  export let params;

  console.log(params);

  let staticbutton = false;
  const contestantData = cch.detokenify(params.tourdata)[0];

  const contestants = parseContestants(contestantData.players);
  console.log(contestants);
  let rounds = [];
  let winners = [];
  let tournamentWinner = null;

  const placeholder = 'Waiting for results';

  function parseContestants(contestants) {
    const parsed = [];
    for (let contestant of contestants) {
      const consObj = { name: contestant, id: calcId(parsed), score: 0 };
      parsed.push(consObj);
    }
    return parsed;
  }

  function calcId(arr) {
    if (arr.length != 0) return Math.max(...arr.map((obj) => obj.id)) + 1;
    return 0;
  }

  function revertMatch(matchData, game) {
    if (!staticbutton) {
      game.home.score = 0;
      game.away.score = 0;
      rounds = [...rounds];
      const { round, match } = matchData;
      console.log(round);
      if (round === 0) return;

      const homeIndex = winners.indexOf(
        winners.find(
          (winner) =>
            rounds[round][match].home.id === winner.winner &&
            winner.round === round - 1
        )
      );
      const awayIndex = winners.indexOf(
        winners.find(
          (winner) =>
            rounds[round][match].away.id === winner.winner &&
            winner.round === round - 1
        )
      );

      rounds[round][match].home = false;
      rounds[round][match].away = false;
      rounds[round - 1][match].home.score = 0;
      rounds[round - 1][match].away.score = 0;
      rounds[round - 1][match + 1].home.score = 0;
      rounds[round - 1][match + 1].away.score = 0;

      winners.splice(homeIndex, 1);
      winners.splice(awayIndex - 1, 1);

      console.log(winners);
    }
  }

  function calcMatchups(amount) {
    calcMatchNumberPerRound(amount);

    let j = 0;
    for (let i = 0; i < contestants.length; i += 2) {
      rounds[0][j].home = contestants[i];
      rounds[0][j].away = contestants[i + 1];
      if (j < rounds[0].length - 1) j++;
    }

    console.log(rounds);
  }

  function calcMatchNumberPerRound(amount) {
    do {
      const round = [];
      amount /= 2;
      for (let i = 0; i < amount; i++) {
        round.push({ home: false, away: false });
      }
      rounds.push(round);
    } while (amount > 1);
  }
  let showpopupTimeout = 0;
  function stopTimeout() {
    clearTimeout(showpopupTimeout);
  }
  function moveToNextRound(winner, loser, match, round) {
    if (winner && loser) {
      if (
        !winners.find(
          (id) =>
            (id.round === rounds.indexOf(round) && id.winner === loser.id) ||
            winners.find(
              (id) =>
                id.round === rounds.indexOf(round) && id.winner === winner.id
            )
        )
      ) {
        winner.score += 1;

        if (winner.score >= bestOfvalue) {
          stopTimeout();
          // Player advances to the next round
          roundAdvancePopupMessage = `${winner.name} advances to the next round!`;
          showRoundAdvancePopup = true;
          showMatchWinPopup = false;
        } else {
          stopTimeout();
          // Player wins a match
          matchWinPopupMessage = `${winner.name} won a match against ${loser.name} and the series is now ${winner.score}-${loser.score}.`;
          showMatchWinPopup = true;
          showRoundAdvancePopup = false;
        }
      }

      showpopupTimeout = setTimeout(() => {
        showMatchWinPopup = false;
        showRoundAdvancePopup = false;
      }, 2000); // Adjust the delay as needed
    }

    rounds = [...rounds];
    if (winner.score >= bestOfvalue) {
      winner.score = 0;
      const roundIndex = rounds.indexOf(round);

      if (
        !winner ||
        !loser ||
        winners.find(
          (id) =>
            (id.round === roundIndex && id.winner === loser.id) ||
            winners.find(
              (id) => id.round === roundIndex && id.winner === winner.id
            )
        )
      )
        return;

      const pointers = new Map();

      winners.push({ winner: winner.id, round: roundIndex });
      console.log(winners);

      if (resolveWinner(roundIndex, winner)) return;

      for (let j = 0; j < rounds[roundIndex].length; j++) {
        for (let i = 0; i < rounds[roundIndex + 1].length; i++) {
          let total = 0;
          pointers.forEach((value) => {
            if (value === i) {
              total++;
            }
          });
          if (total < 2) {
            pointers.set(j, i);
            break;
          }
        }
      }

      const matchIndex = rounds[roundIndex].indexOf(match);
      const pointer = pointers.get(matchIndex);

      // Searches for an empty spot in the pointed match and places the winner when found
      for (let team in rounds[roundIndex + 1][pointer]) {
        if (!rounds[roundIndex + 1][pointer][team]) {
          rounds[roundIndex + 1][pointer][team] = winner;
          break;
        }
      }
    }
  }

  function resolveWinner(rdi, winner) {
    if (rdi === rounds.length - 1) {
      tournamentWinner = winner;
      return true;
    }
    return false;
  }

  function assignRoundNames(rounds) {
    const roundNames = [
      'ROUND 1',
      'ROUND 2',
      'ROUND 3',
      'ROUND 4',
      'ROUND 5',
      'ROUND 6',
    ];
    const specialRoundNames = [
      'PRE-QUARTERFINALS',
      'QUARTERFINALS',
      'SEMIFINALS',
      'FINALS',
    ];

    for (let i = 0; i < rounds.length; i++) {
      // Check if it's a special round and set the corresponding name
      if (i >= rounds.length - specialRoundNames.length) {
        rounds[i].name =
          specialRoundNames[i - (rounds.length - specialRoundNames.length)];
      } else {
        rounds[i].name = roundNames[i];
      }
    }
  }
  if (!user.isGuest && user.state) {
    rounds = user.state.rounds;
    winners = user.state.winners;

    console.log(winners, 'winners');
  } else {
    calcMatchups(contestants.length);
  }

  assignRoundNames(rounds);
  console.log(rounds);
  let winarrer = null;
  function closewindow() {
    winarrer = tournamentWinner;
    tournamentWinner = null;
    staticbutton = true;
  }

  function checkifresolved(winners, i, match) {
    if (
      winners.find(
        (id) => (id.round === i && id.winner === match.home.id) == true
      )
    ) {
      return true;
    }
    if (
      winners.find(
        (id) => (id.round === i && id.winner === match.away.id) == true
      )
    ) {
      return true;
    }
    return false;
  }

  async function save() {
    const state = {
      winners,
      rounds,
    };

    const res = await stateController.updateTourState(
      state,
      user.config.id,
      user.username
    );

    console.log(res);
  }
  function bestOfTransformation() {
    if (contestantData.bestOf == 3) {
      return 2;
    }
    if (contestantData.bestOf == 5) {
      return 3;
    }
    if (contestantData.bestOf == 7) {
      return 4;
    }
    if (contestantData.bestOf == 1) {
      return 1;
    }
  }
  let bestOfvalue = bestOfTransformation();
  console.log(bestOfvalue);
  function reopenWinner() {
    tournamentWinner = winarrer;
  }
</script>

<main>
  <h1>{contestantData.tournamentName}</h1>
  {#if winarrer}<Button on:cClick={reopenWinner}>TOGGLE WINNER MESSAGE</Button>
  {/if}
  <h3>Organized by: {contestantData.organizerName}</h3>

  {#if !user.isGuest && user.username}
    <Tooltip
      text="Press to save any unfinished tournament progress and continue it later via the PORFILE page."
    >
      <Button on:cClick={save}>SAVE</Button>
    </Tooltip>
  {/if}
  <p class="info-message">
    In the playoffs participants play against each other in order to either
    eliminate from the tournament or advance to the next round. CLICK on the
    participant name to add a win to their series tally.
  </p>
  {#if tournamentWinner}
    <Winner
      config={contestantData}
      winner={tournamentWinner}
      on:closeevent={closewindow}
    />
  {/if}
  <div
    class="playoff-container"
    transition:slide={{
      duration: 700,
      easing: quadInOut,
      axis: 'x',
    }}
  >
    {#each rounds as round, i}
      <div class="round">
        <h2>{round.name}</h2>
        {#each round as match, mi}
          <div class="match">
            {#if i !== 0}
              <Button
                class="revert-button"
                disabled={staticbutton ||
                  match.home.name == null ||
                  match.away.name == null ||
                  checkifresolved(winners, i, match)}
                on:cClick={() => revertMatch({ round: i, match: mi }, match)}
                >UNDO MATCH</Button
              >
            {/if}
            <div
              class="player-info"
              on:keydown={() => {}}
              on:click={() =>
                moveToNextRound(match.home, match.away, match, round)}
            >
              <p
                class:match-winner={match.home &&
                  winners.find(
                    (id) =>
                      (id.round === i && id.winner === match.home.id) ||
                      tournamentWinner === match.home
                  )}
                class:match-loser={winners.find(
                  (id) =>
                    (id.round === i && id.winner === match.away.id) ||
                    tournamentWinner === match.home
                )}
              >
                {match.home ? match.home.name : placeholder}
              </p>
              <p class="player-score">
                {#if winners.find((id) => (id.round === i && id.winner === match.home.id) == true)}
                  {bestOfvalue}
                {:else if match.home.score}
                  {match.home.score}
                {:else}
                  0
                {/if}
              </p>
            </div>
            <hr class="separate-line" />
            <div
              class="player-info"
              on:keydown={() => {}}
              on:click={() =>
                moveToNextRound(match.away, match.home, match, round)}
            >
              <p
                class:match-winner={match.away &&
                  winners.find(
                    (id) =>
                      (id.round === i && id.winner === match.away.id) ||
                      tournamentWinner === match.home
                  )}
                class:match-loser={winners.find(
                  (id) =>
                    (id.round === i && id.winner === match.home.id) ||
                    tournamentWinner === match.home
                )}
              >
                {match.away ? match.away.name : placeholder}
              </p>
              <p class="player-score">
                {#if winners.find((id) => (id.round === i && id.winner === match.away.id) == true)}
                  {bestOfvalue}
                {:else if match.away.score}
                  {match.away.score}
                {:else}
                  0
                {/if}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
  {#if showMatchWinPopup && !tournamentWinner}
    <div class="popup">
      <p class="popup-message">{matchWinPopupMessage}</p>
    </div>
  {/if}

  {#if showRoundAdvancePopup && !tournamentWinner}
    <div class="popup">
      <p class="popup-message">{roundAdvancePopupMessage}</p>
    </div>
  {/if}
</main>

<style>
  main {
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .popup {
    border-radius: 10px;
    position: fixed;
    text-align: center;
    font-size: 1.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    color: white;
    border-radius: 5px;
    z-index: 9999;
  }

  .playoff-container {
    padding-left: 10em;
    padding-right: 2em;
    width: 90%;
    overflow: auto;
    overflow-anchor: left;
    overflow-x: left;
    display: flex;
    justify-content: flex-start;
    margin-top: 1em;
    margin-bottom: 3em;
  }

  .round {
    position: relative;
    padding-top: 5em;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 2em;
    margin-right: 3em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    transition-duration: 0.2s;
  }

  .round:hover {
    filter: brightness(1.1);
  }
  .match {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid #ffffff33;
    background: linear-gradient(
      129deg,
      rgb(11, 11, 52, 0.5) 0%,
      rgba(35, 27, 117, 0.5) 100%
    );
  }

  .separate-line {
    opacity: 0.3;
    width: 300px;
  }

  .player-info {
    width: calc(80%);
    max-width: max-content;
    display: grid;
    grid-template-columns: 200px 1fr;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .player-info:hover {
    opacity: 0.7;
  }

  .player-score {
    position: absolute;
    right: 0;
    margin-right: 1.5em;
    text-align: right;
  }
  h1 {
    margin-top: 1em;
    font: 900;
    font-size: 3em;
    text-transform: uppercase;
  }

  h2 {
    display: flex;
    justify-content: center;
    text-align: right;
    position: absolute;
    font-size: 2em;
    top: 20px;
  }

  h3 {
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }

  .popup-message {
    cursor: pointer;
    color: #fff;
    margin-left: 0.2em;
    width: 100%;
  }

  .info-message {
    font-size: 1.3em;
    text-align: center;
    cursor: pointer;
    color: #fff;
    margin-left: 0.2em;
    margin-top: 2em;
    width: 40%;
  }

  p {
    cursor: pointer;
    color: #fff;
    font-size: 1.1em;
    margin-left: 0.2em;
    width: 100%;
  }

  .match-winner {
    filter: drop-shadow(0px 0px 1px #9efb89);
    color: #00ff37;
    animation: none;
  }

  .match-loser {
    color: #b70000;
    filter: drop-shadow(0px 0px 1px #572b2b);
    animation: none;
  }
</style>
