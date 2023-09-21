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
    text-align: center;
  }
</style>
