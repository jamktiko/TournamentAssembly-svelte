import { writable } from "svelte/store";
import { calcId } from "./lib";

const stateStore = writable({});

const stateController = {
  apiUrl:
    "https://touras-api-env.eba-82ijsew9.eu-north-1.elasticbeanstalk.com/",
  subscribe: stateStore.subscribe,

  set(item) {
    stateStore.set(item);
  },

  loginAsGuest() {
    const guest = {
      username: "guest",
      password: null,
      isGuest: true,
      tournamentData: null,
    };
    stateStore.set(guest);
  },

  async customFetch(urlExt, opt) {
    const res = await fetch(this.apiUrl + urlExt, opt);
    const data = await res.json();

    return data;
  },

  async register(user) {
    const res = await this.customFetch("register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.apiUrl,
      },
      body: JSON.stringify(user),
    });
    console.log(res);
    return res;
  },

  async login(user) {
    const res = await this.customFetch("login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.apiUrl,
      },
      body: JSON.stringify(user),
    });
    console.log(res);

    if (res.success) {
      const userData = {
        id: res.id,
        username: res.username,
        token: res.token,
        tournaments: res.tournaments,
      };

      stateStore.set(userData);
      window.sessionStorage.setItem("user", JSON.stringify(userData));
      localStorage.clear();
    }
    return res;
  },

  async createTournament(tournament, type) {
    let user;
    const unsub = this.subscribe((userData) => (user = userData));
    unsub();

    tournament.type = type;

    const tourData = {
      username: user.username,
      tournament,
      token: user.token,
    };

    const opt = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.apiUrl,
      },
      body: JSON.stringify(tourData),
    };

    const res = await this.customFetch("addTour", opt);

    user.tournaments.push(res.result);
    window.sessionStorage.setItem("user", JSON.stringify(user));

    return res;
  },

  async updateTourState(state, id) {
    let user;
    const unsub = this.subscribe((userData) => (user = userData));
    unsub();

    const tourData = {
      id,
      state,
      token: user.token,
    };

    const opt = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.apiUrl,
      },

      body: JSON.stringify(tourData),
    };
    const updated = user.tournaments.find((tour) => tour._id === id);
    updated.state = state;

    stateController.set(user);
    window.sessionStorage.setItem("user", JSON.stringify(user));

    const res = await this.customFetch("tourState", opt);
    return res;
  },

  async deleteTournament(id) {
    let user;
    const unsub = this.subscribe((userData) => (user = userData));
    unsub();

    const tourData = {
      username: user.username,
      id,
      token: user.token,
    };

    const opt = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": this.apiUrl,
      },

      body: JSON.stringify(tourData),
    };
    const res = this.customFetch("delTour", opt);

    stateController.set(user);
    window.sessionStorage.setItem("user", JSON.stringify(user));

    return res;
  },
};

export default stateController;
