export default {
  loadToCache(key, value) {
    localStorage.setItem(key, value);
  },
  getFromCache(key) {
    return localStorage.getItem(key);
  },
  tokenify(arr) {
    let output = "";
    for (let obj of arr) {
      for (let key in obj) {
        output += key + ":" + obj[key];
        output += ".";
      }
      output += "|";
    }
    console.log(output);
    return output;
  },

  detokenify(token) {
    const reconstruction = [];

    const objs = token.split("|");
    objs.pop();

    for (let obj of objs) {
      const kvps = obj.split(".");
      kvps.pop();
      const construct = kvps.reduce((acc, curr) => {
        const sepr = curr.split(":");
        acc[sepr[0]] = sepr[1];
        return acc;
      }, {});
      reconstruction.push(construct);
    }
    return reconstruction;
  },
};
