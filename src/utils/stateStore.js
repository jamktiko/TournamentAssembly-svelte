import { writable } from "svelte/store";

const stateStore = writable();

const stateController = {
  subscribe: stateStore.subscribe,

  loginAsGuest() {
    const guest = {
      username: "guest",
      password: null,
      isGuest: true,
      tournamentData: null,
    };
    stateStore.set({ user: guest });
  },
};

export default stateController;
