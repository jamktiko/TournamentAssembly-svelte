<script>
  const contestants = [
    { id: 0, name: 'Tikon Pallo' },
    { id: 1, name: 'Jamkin Palloilijat' },
    { id: 2, name: 'Jykylän Potku' },
    {
      id: 3,
      name: 'Ticorporate FC',
    },
    { id: 4, name: 'Kouvostoliiton Työväen Seura' },
    { id: 5, name: 'K-Kauppiaat' },
    { id: 6, name: 'Potkikset FC' },
    {
      id: 7,
      name: 'Turpasaunan Pallo',
    },
    { id: 8, name: 'Ball Of TaiKou' },
    { id: 9, name: 'Dippaa Sun JalkaPallot' },
    { id: 10, name: 'Mikan Faijan FC' },
    {
      id: 11,
      name: 'Pallo Pyörii Uudelleen',
    },
    { id: 12, name: 'Omistajien Klubi' },
    { id: 13, name: 'Frööbelin Pallot' },
    { id: 14, name: 'Työttömät FC' },
    {
      id: 15,
      name: 'Tenon PilviVeikot',
    },
  ];

  let rounds = [];
  let winners = [];

  const placeholder = 'Waiting for results';

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
    console.log(winner);
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

  // Calculate matchups and assign round names
  calcMatchups(contestants.length);
  assignRoundNames(rounds);
  console.log(rounds);

  function revertMatch(matchData) {
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

    console.log('Home: ', homeIndex, ' Away: ', awayIndex);

    winners.splice(homeIndex, 1);
    winners.splice(awayIndex - 1, 1);

    console.log(winners);
  }
</script>

<main>
  <h1>CUSTOMIZERISTA TOURNAMENT NAME TÄHÄN</h1>
  <h3>by ORGANIZER NAME TÄHÄN</h3>
  <div class="playoff-container">
    {#each rounds as round, i}
      <div class="round">
        <h2>{round.name}</h2>
        {#each round as match, mi}
          {#if i !== 0}
            <button on:click={() => revertMatch({ round: i, match: mi })}
              >Revert</button
            >
          {/if}
          <div class="match">
            <p
              class:match-winner={match.home &&
                winners.find(
                  (id) => id.round === i && id.winner === match.home.id
                )}
              class:match-loser={winners.find(
                (id) => id.round === i && id.winner === match.away.id
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
                  (id) => id.round === i && id.winner === match.away.id
                )}
              class:match-loser={winners.find(
                (id) => id.round === i && id.winner === match.home.id
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
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .playoff-container {
    display: flex;
    margin-top: 3em;
    margin-bottom: 3em;
  }

  .round {
    position: relative;
    padding: 5em 1em 2em;
    margin-right: 2em;
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
  }
  h2 {
    display: flex;
    justify-content: center;
    text-align: right;
    position: absolute;
    font-size: 2em;
    top: 20px;
  }

  p {
    cursor: pointer;
    color: #fff;
    font-size: 1.1em;
    margin-left: 0.2em;
    animation: pulse 3s infinite;
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
