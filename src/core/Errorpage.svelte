<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<main>
  <div class="error-message-container">
    <div class="image-container">
      <img src="../images/error404.jpg" alt="ErrorPicture" />
    </div>
    <div class="message-container">
      <h1>
        *Lipsmack* What a shame, it was a good page. What a rotten way to go.
      </h1>
    </div>
    <div class="error-container">
      <h2>Error 404 - page not found.</h2>
    </div>
    <Button class="error-button" on:cClick={() => push('/')}
      >Return to Tournament Assembly</Button
    >
  </div>
</main>

<style>
  .error-message-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
  }

  .image-container {
    padding: 2em 0em;
    opacity: 0.5;
    border-radius: 40px;
  }

  .message-container {
    padding: 0em 0em;
  }

  .error-container {
    padding: 2em 0em;
  }
</style>
