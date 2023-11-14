<script>
  import Button from '../reusable/Button.svelte';
  import { pop, location, push } from 'svelte-spa-router';
  import stateController from '../utils/stateStore';
  import { createEventDispatcher } from 'svelte';

  let userData;
  let rotateSettingsIcon = false;
  let settingsButton;

  stateController.subscribe(($userData) => {
    userData = $userData;
  });

  function logout() {
    window.sessionStorage.removeItem('user');
    localStorage.clear();
    stateController.set({});

    push('/');
  }

  console.log(userData);

  const dispatch = createEventDispatcher();
  function openSidebar() {
    rotateSettingsIcon = !rotateSettingsIcon; // Toggle rotation state
    dispatch('toggleSidebar');
  }
</script>

<nav class="navbar" style={$$props.style}>
  <ul class="navbar-nav">
    {#if $location !== '/' && $location !== '/errorpage' && $location !== '/LoginUser' && $location !== '/Signup'}
      {#if $location == '/selection'}
        <Button class="back-button" on:cClick={() => push('/')}>
          <svg
            class="back-arrow"
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            fill="#ffffff"
            viewBox="0 -960 960 960"
            width="48"><path d="M560-280 360-480l200-200v400Z" /></svg
          >
          Back
        </Button>
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
      <Button
        class="settings-button"
        on:cClick={openSidebar}
        bind:this={settingsButton}
      >
        <svg
          class="settings-icon {rotateSettingsIcon ? 'rotated' : ''}"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path
            d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
          />
        </svg>
        Settings
      </Button>
    {/if}
  </ul>
</nav>

<style>
  .navbar {
    justify-content: space-between;
    height: 5em;
    background: linear-gradient(rgb(0, 0, 40, 1) 0%, rgba(0, 0, 40, 0.15)) 100%;
    padding-right: 0.5em;
    border-top: 1px solid #ffffff;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar-nav {
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .back-arrow {
    fill: #fff;
    position: absolute;
    top: 10%;
    left: 8%;
    margin-right: 1em;
  }

  .settings-icon {
    fill: #fff;
    position: absolute;
    top: 20%;
    left: 8%;
    margin-right: 1em;
    transition: transform 0.3s ease;
    transform: rotate(0deg);
  }

  .settings-icon.rotated {
    transform: rotate(360deg);
  }

  .settings-icon:focus {
    transform: rotate(360deg);
  }

  @media only screen and (max-width: 1450px) {
    .navbar {
      height: 4em;
    }
  }
</style>
