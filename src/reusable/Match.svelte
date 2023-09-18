<script>
  export let match;
  let scores = [0, 0];
</script>

<div>
  <h2>{match[0].name}</h2>
  <p>{scores[0]}</p>
  <br />
  <p>{scores[match[1].name]}</p>
  <h2>{scores[1]}</h2>
</div>

<style></style>
