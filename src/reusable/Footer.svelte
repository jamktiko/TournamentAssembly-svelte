<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<main>
  <div class="footer-content">
    <Button class="footer-button" on:cClick={() => push('/DevInfo')}
      ><h3>Tournament Assembly © 2023</h3></Button
    >
  </div>
</main>

<style>
  .footer-content {
    margin-top: 25em;
    position: sticky;
    bottom: 0%;
    font-size: 0.7em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    border-radius: 0px;
    border-top: solid 2px #ffffff;
    background-color: rgba(0, 0, 0, 0.308);
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    .footer-content {
      margin-top: 5em;
    }
  }
</style>
