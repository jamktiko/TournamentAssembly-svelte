<script>
  import Router from './utils/Router.svelte';
  import Header from './core/Header.svelte';
  import Button from './reusable/Button.svelte';
  import { pop, location, push } from 'svelte-spa-router';
  import stateController from './utils/stateStore';

  let userData;

  stateController.subscribe(($userData) => {
    userData = $userData;
  });

  console.log(userData);
</script>

<Header />

{#if $location !== '/' && $location !== '/errorpage' && $location !== '/LoginUser' && $location !== '/Signup'}
  {#if $location == '/selection'}
    <Button class="back-button" on:cClick={() => push('/')}
      ><svg
        class="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        fill="#ffffff"
        viewBox="0 -960 960 960"
        width="48"><path d="M560-280 360-480l200-200v400Z" /></svg
      > Back</Button
    >
  {:else}
    <Button class="back-button" on:cClick={() => push('/selection')}
      ><svg
        class="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        fill="#ffffff"
        viewBox="0 -960 960 960"
        width="48"><path d="M560-280 360-480l200-200v400Z" /></svg
      > Back</Button
    >
  {/if}
{/if}

{#if userData.username !== 'guest' && userData.username}
  <Button class="profile-button" on:cClick={() => push('/profile')}
    >Profile</Button
  >
{/if}

<Router />

<style>
  .back-arrow {
    fill: #fff;
    position: absolute;
    top: 10%;
    left: 8%;
    margin-right: 1em;
  }
</style>
