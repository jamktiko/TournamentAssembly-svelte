export default {
  saveToCache(key, value) {
    localStorage.setItem(key, this.tokenify(value));
  },
  getFromCache(key) {
    return this.detokenify(localStorage.getItem(key));
  },
  getToken(key) {
    return localStorage.getItem(key);
  },
  isInCache(key) {
    return localStorage.getItem(key) ? true : false;
  },
  /**
   * Turns an array of objects in to a string
   * @param {Object} arr An array of objects to be tokenified, turns into a string
   * @returns String
   */
  tokenify(tkn) {
    let output = "";
    if (Array.isArray(tkn)) {
      for (let obj of tkn) {
        for (let key in obj) {
          if (Array.isArray(obj[key])) {
            output += "[";
            output += key + "=";
            for (let item of obj[key]) {
              for (let arrKey in item) {
                output += arrKey + ":" + item[arrKey];
                output += ".";
              }
              output += ",";
            }
            output += "]";
          } else {
            output += key + ":" + obj[key];
            output += ".";
          }
        }

        output += "|";
      }
    } else {
      for (let key in tkn) {
        output += key + ":" + tkn[key];
        output += ".";
      }
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
    const rcSubArr = [];
    let label;
    let remainder;

    const objs = token.split("|");
    if (objs.length > 1) objs.pop();

    for (let obj of objs) {
      if (obj.includes("[")) {
        remainder = obj.slice(0, obj.indexOf("["));
        console.log(remainder, "remainder");

        const subArr = obj
          .slice(obj.indexOf("[") + 1, obj.indexOf("]"))
          .split("=");

        label = subArr[0];
        const content = subArr[1].split(",");
        content.pop();

        let objGroup = [];
        for (let unit of content) {
          const kvps = unit.split(".");
          const construct = kvps.reduce((acc, curr) => {
            const sepr = curr.split(":");
            acc[sepr[0]] = isNaN(parseInt(sepr[1]))
              ? sepr[1]
              : parseInt(sepr[1]);
            return acc;
          }, {});
          objGroup.push(construct);
        }
        rcSubArr.push(objGroup);
        objGroup = [];
      }
      let kvps;
      remainder ? (kvps = remainder.split(".")) : (kvps = obj.split("."));

      kvps.pop();
      const construct = kvps.reduce((acc, curr) => {
        const sepr = curr.split(":");
        if (sepr[1].includes(",")) {
          acc[sepr[0]] = sepr[1].split(",");
          return acc;
        }
        acc[sepr[0]] = isNaN(parseInt(sepr[1])) ? sepr[1] : parseInt(sepr[1]);
        return acc;
      }, {});
      reconstruction.push(construct);
    }
    if (rcSubArr.length !== 0) {
      for (let i = 0; i < rcSubArr.length; i++) {
        reconstruction[i][label] = rcSubArr[i];
      }
    }
    return reconstruction;
  },
};
