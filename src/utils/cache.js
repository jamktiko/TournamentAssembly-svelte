export default {
  saveToCache(key, value) {
    localStorage.setItem(key, this.tokenify(value));
  },
  getFromCache(key) {
    return this.detokenify(localStorage.getItem(key));
  },
  isInCache(key) {
    return localStorage.getItem(key) ? true : false;
  },
  /**
   * Turns an array of objects in to a string
   * @param {Array} arr An array of objects to be tokenified, turns into a string
   * @returns String
   */
  tokenify(arr) {
    let output = "";
    for (let obj of arr) {
      for (let key in obj) {
        output += key + ":" + obj[key];
        output += ".";
      }
      output += "|";
    }
    return output;
  },
  /**
   * Turns a string in to an array of objects
   * @param {String} token string to be turned in to an object
   * @returns Object
   */
  detokenify(token) {
    const reconstruction = [];

    const objs = token.split("|");
    objs.pop();

    for (let obj of objs) {
      const kvps = obj.split(".");
      kvps.pop();
      const construct = kvps.reduce((acc, curr) => {
        const sepr = curr.split(":");
        acc[sepr[0]] = isNaN(parseInt(sepr[1])) ? sepr[1] : parseInt(sepr[1]);
        return acc;
      }, {});
      reconstruction.push(construct);
    }
    return reconstruction;
  },
};
