<script>
  import Button from '../reusable/Button.svelte';
  import { pop, location, push } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import { backInOut, linear } from 'svelte/easing';
  import stateController from '../utils/stateStore';
  import { createEventDispatcher } from 'svelte';

  let userData;

  stateController.subscribe(($userData) => {
    userData = $userData;
  });

  function logout() {
    window.sessionStorage.removeItem('user');
    localStorage.clear();
    stateController.set({});

    push('/');
  }

  const dispatch = createEventDispatcher();
  function closeSidebar() {
    dispatch('toggleSidebar');
  }
</script>

<div
  class="sidebar"
  transition:slide={{ x: -200, duration: 300, easing: linear }}
>
  <Button class="profile-button" on:cClick={() => push('/profile')}
    ><svg
      class="profile"
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
      ><path
        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
      /></svg
    >Profile</Button
  >
  <Button class="logout-button" on:cClick={closeSidebar} on:cClick={logout}
    ><svg
      class="log-out"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      ><path
        d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
      /></svg
    >Log out</Button
  >
</div>

<style>
  .profile {
    fill: #fff;
    position: absolute;
    top: 20%;
    left: 8%;
    margin-right: 1em;
  }

  .log-out {
    fill: #fff;
    position: absolute;
    top: 30%;
    left: 14%;
    margin-right: 1em;
  }

  .sidebar {
    top: 25vh;
    display: flex;
    position: fixed;
    right: 0;
    width: 5%;
    height: 25%;
    transition: right 0.3s ease-in-out;
    color: #ffffff;
    padding: 0.1em 3em;
    background: none;
    border-radius: 10px;
    z-index: 100;
    border: none;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    .sidebar {
      top: 23vh;
      width: 7%;
      right: 0.2em;
      padding-top: 0.2em;
    }
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    .profile {
      top: 20%;
      left: 8%;
      margin-right: 1em;
    }

    .log-out {
      top: 30%;
      left: 14%;
      margin-right: 1em;
    }

    .sidebar {
      display: flex;
      position: fixed;
      right: 0;
      width: 5%;
      height: 25%;
      padding: 0.1em 3em;
    }
  }
</style>
