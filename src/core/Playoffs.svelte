<script>
    const contestants = [
	{ id: 0, name: "Tikon Pallo" },
	{ id: 1, name: "Jamkin Palloilijat" },
	{ id: 2, name: "Jykylän Potku" },
	{
		id: 3,
		name: "Ticorporate FC",
	},
	{ id: 4, name: "Kouvostoliiton Työväen Seura" },
	{ id: 5, name: "K-Kauppiaat" },
	{ id: 6, name: "Potkikset FC" },
	{
		id: 7,
		name: "Turpasaunan Pallo",
	},
	{ id: 0, name: "Ball Of TaiKou" },
	{ id: 1, name: "Dippaa Sun JalkaPallot" },
	{ id: 2, name: "Mikan Faijan FC" },
	{
		id: 3,
		name: "Pallo Pyörii Uudelleen",
	},
	{ id: 4, name: "Omistajien Klubi" },
	{ id: 5, name: "Frööbelin Pallot" },
	{ id: 6, name: "Työttömät FC" },
	{
		id: 7,
		name: "Tenon PilviVeikot",
	},
];


    let rounds = [];

    const placeholder = "____________________";

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

    function moveToNextRound(winner, match, round) {
		const pointers = new Map();
		const roundIndex = rounds.indexOf(round);

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

    calcMatchups(8);

</script>

<main>
    {#each rounds as round}
        <div class="round">
            {#each round as match}
            <div class="match">
                <p on:keydown={() => {}} on:click={() => moveToNextRound(match.home,match,round)}>
                    {match.home ? match.home.name : placeholder}
                </p>
                <br>
                <p on:keydown={() => {}} on:click={() => moveToNextRound(match.home,match,round)}>
                    {match.away ? match.away.name : placeholder}
                </p>
            </div>
            {/each}
        </div>
    {/each}
</main>

<style>
    main {
        display:flex;
        justify-content: center;
    }
    .round {
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    }

    .match {
    	margin: 30px;
    }

</style>