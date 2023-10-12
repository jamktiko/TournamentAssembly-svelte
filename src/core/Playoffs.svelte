<script>
  import cch from '../utils/cache';
  import Button from '../reusable/Button.svelte';
  import Winner from '../reusable/Winner.svelte';
  import { push } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut, elasticInOut, quadInOut } from 'svelte/easing';

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
      const consObj = { name: contestant, id: calcId(parsed) };
      parsed.push(consObj);
    }
    return parsed;
  }

  function calcId(arr) {
    if (arr.length != 0) return Math.max(...arr.map((obj) => obj.id)) + 1;
    return 0;
  }

  function revertMatch(matchData) {
    if (!staticbutton) {
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

  function moveToNextRound(winner, loser, match, round) {
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

    console.log(winners);
    winners.push({ winner: winner.id, round: roundIndex });

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

    // Searches for an empty spot in the pointed match and places winner when found
    for (let team in rounds[roundIndex + 1][pointer]) {
      if (!rounds[roundIndex + 1][pointer][team]) {
        rounds[roundIndex + 1][pointer][team] = winner;
        break;
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

  calcMatchups(contestants.length);
  assignRoundNames(rounds);
  console.log(rounds);

  function closewindow() {
    tournamentWinner = null;
    staticbutton = true;
  }
</script>

<main>
  <h1>{contestantData.tournamentName}</h1>
  <h3>Organized by: {contestantData.organizerName}</h3>
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
                disabled={staticbutton}
                on:cClick={() => revertMatch({ round: i, match: mi })}
                >UNDO MATCH</Button
              >
            {/if}
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
              on:keydown={() => {}}
              on:click={() =>
                moveToNextRound(match.home, match.away, match, round)}
            >
              {match.home ? match.home.name : placeholder}
            </p>

            <hr class="separate-line" />
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
              id="lower-name"
              on:keydown={() => {}}
              on:click={() =>
                moveToNextRound(match.away, match.home, match, round)}
            >
              {match.away ? match.away.name : placeholder}
            </p>
          </div>
        {/each}
      </div>
    {/each}
  </div>
  {#if tournamentWinner}
    <Winner
      config={contestantData}
      winner={tournamentWinner}
      on:closeevent={closewindow}
    />
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

  .playoff-container {
    padding-left: 10em;
    padding-right: 2em;
    width: 90%;
    overflow: auto;
    overflow-anchor: left;
    overflow-x: left;
    display: flex;
    justify-content: flex-start;
    margin-top: 3em;
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
    background-color: rgba(0, 0, 0, 0.308);
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
      rgb(11, 11, 52) 0%,
      rgb(34, 5, 32) 100%
    );
  }

  .separate-line {
    opacity: 0.3;
    width: 250px;
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
  }

  p {
    cursor: pointer;
    color: #fff;
    font-size: 1.1em;
    margin-left: 0.2em;
    animation: pulse 3s infinite;
    width: 100%;
  }
  @keyframes pulse {
    0% {
      filter: brightness(1);
    }

    50% {
      filter: brightness(0.7);
    }

    100% {
      filter: brightness(1);
    }
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
