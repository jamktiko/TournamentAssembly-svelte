import { writable } from "svelte/store";

const stateStore = writable();

const stateController = {
  apiUrl: "http://localhost:3000/",
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

  login() {},

  async customFetch(urlExt, opt) {
    const res = await fetch(this.apiUrl + urlExt, opt);
    const data = await res.json();

    return data;
  },
};

export default stateController;
