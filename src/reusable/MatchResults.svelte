<script>
const matches = [
  {
    contestants: [
      { name: "todellapitkänimi", score: 1, win: true },
      { name: "test2", score: 2, win: false },
    ],
    draw: false,
  },
];

</script>
<main>
<td>Team 1</td>
<td>Score</td>
<td> </td>
<td>Score</td>
<td>Team 2</td>
<p></p>
{#if matches[0].draw == true} 
<td>{matches[0].contestants[0].name}</td>
<td>{matches[0].contestants[0].score}</td> 
<td> - </td> 

<td>{matches[0].contestants[1].score}</td>      
<td>{matches[0].contestants[1].name}</td>
{:else if matches[0].contestants[0].win == true}
<th>{matches[0].contestants[0].name}</th>
<td>{matches[0].contestants[0].score}</td> 
<td> - </td> 

<td>{matches[0].contestants[1].score}</td>      
<td>{matches[0].contestants[1].name}</td>
{:else}
<td>{matches[0].contestants[0].name}</td>
<td>{matches[0].contestants[0].score}</td> 
<td> - </td> 

<td>{matches[0].contestants[1].score}</td>      
<th>{matches[0].contestants[1].name}</th>
{/if}


      
</main>
<style>
    td {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.308);
    border: 1px solid white;
    text-align: center;
    font-size: 1.7em;
    width: 5em;
    max-width: 5em;
  }
  th {
    font-weight: 700;
    background-color: gold;
    border: 1px solid white;
    text-align: center;
    font-size: 1.7em;
    width: 5em;
    max-width: 5em;
  }
</style>