<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Loading from '../reusable/Loading.svelte';
</script>

<main>
  <Button class="back-button2" on:cClick={() => push('/')}>Back</Button>
  <div class="dev-info-header">
    <h1>Developers</h1>
  </div>
  <div class="information-content">
    <div class="developer-content">
      <h2>Eemi Salonen</h2>
      <h3>Product Owner, Tekniikka, Testaus</h3>
    </div>
    <div class="developer-content">
      <h2>Jani Haakana</h2>
      <h3>Scrum Master, Sisällöntuotanto, UI/UX</h3>
    </div>
    <div class="developer-content">
      <h2>Nikolas Orava</h2>
      <h3>Tekniikka</h3>
    </div>
    <div class="developer-content">
      <h2>Mikko Hämäläinen</h2>
      <h3>Tekniikka, Liiketalous</h3>
    </div>
    <div class="developer-content">
      <h2>Teemu Vorho</h2>
      <h3>Sisällöntuotanto, UI/UX, Liiketalous</h3>
    </div>
  </div>
</main>
<div id="loading-div">
  <Loading />
</div>

<style>
  main {
    text-align: center;
  }

  #loading-div {
    position: absolute;
    top: 80%;
    left: 50%;
  }

  .dev-info-header {
    padding-top: 2em;
    text-decoration: underline;
  }

  .information-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    padding: 1em;
  }

  .developer-content {
    text-align: center;
    width: 25%;
    margin: 0.5em;
  }
</style>
