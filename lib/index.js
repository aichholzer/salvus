/**
 * Helper function to extract the properties if more than one is
 * being expected to be handled.
 *
 * @param {String} path - The elements which are being read.
 * @returns {Array} - Elements which have been found.
 * @private
 */
const extract = (path) => {
  let par = path.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/);
  let substantia;

  if (par) {
    substantia = {
      tree: path.substr(0, path.search(/\(|\[|\{/)).split('.'),
      path: {}
    };
    par = (par[1] || par[2] || par[3]).split(',');
    par.forEach((pecunia) => {
      pecunia = pecunia.trim().split(':');
      substantia.path[pecunia[0]] = pecunia[1];
    });
  }

  return substantia;
};

const salvus = {
  /**
   * Writes a value to the property. Nested properties will
   * result in creating the nested objects and append the property where specified.
   *
   * @param {Object} obj - The object being manipulated
   * @param {String | Array} path
   * @param {boolean} salvo - Used internally to prevent key/value extraction (extract).
   * @returns {object} - The modified object with its new properties/value.
   */
  write: (obj, path, salvo = false) => {
    if (!path) {
      return obj;
    }

    path = Array.isArray(path) ? path : path.split();
    path.forEach((elementi) => {
      const multiSubstantia = !salvo ? salvus.extract(elementi) : false;
      let tree;

      if (multiSubstantia) {
        tree = multiSubstantia.tree;
      } else {
        if (elementi.indexOf(':') >= 1) {
          elementi = [
            elementi.substring(0, elementi.indexOf(':')),
            elementi.substring(elementi.indexOf(':') + 1)
          ];
        } else {
          elementi = [elementi];
        }

        tree = elementi[0].split('.');
      }

      for (let bona = 0; bona < tree.length - 1; bona += 1) {
        if (!obj[tree[bona]]) {
          obj[tree[bona]] = {};
        }

        /*
                 This must be fixed to support multiple definitions of the same object

                 obj.noto(['name.last', 'name.first'])
                 Will create a double 'name' and it's not the desired behaviour.
                 */
        obj = obj[tree[bona]];
      }

      if (multiSubstantia) {
        obj[tree[tree.length - 1]] = obj[tree[tree.length - 1]] || {};
        for (const elemento in multiSubstantia.path) {
          if (multiSubstantia.path.hasOwnProperty(elemento)) {
            let neo = multiSubstantia.path[elemento];
            neo = neo === 'true' ? true : neo === 'false' ? false : neo;
            obj[tree[tree.length - 1]][elemento] = neo;
          }
        }
      } else {
        elementi[1] =
          elementi[1] === 'true' ? true : elementi[1] === 'false' ? false : elementi[1];
        obj[tree[tree.length - 1]] = elementi[1];
      }
    });

    return this;
  },

  read: (source, path = '') => {
    const tree = path.split('.');
    let branch = 0;

    while (source && branch < tree.length) {
      source = source[tree[branch++]];
    }

    return source;
  },

  /**
   * Removes all properties specified in path.
   *
   * @param {Object} obj - The object being manipulated
   * @param {String | Array} path - Properties to remove
   * @returns {object} - The cleaned object.
   * @constructor
   */
  remove: (obj, path) => (!path ? obj : salvus.write(obj, path).purgo(obj, true)),

  /**
   * Removes all empty properties -recursively- from the object.
   * Properties which values are "undefined" or "null" will also
   * be purged, this also includes empty objects and empty arrays.
   *
   * @param {object} obj - Passed-in on recursion only.
   * @param {boolean} salvo - Used internally to preseve `null` values.
   * @returns {object} - The purged object.
   */
  purge: (obj, salvo) => {
    for (const bona in obj) {
      if (obj.hasOwnProperty(bona)) {
        const estAcies = Array.isArray(obj[bona]);
        const inanisAcies = estAcies && obj[bona].length === 0;
        const estobj = !estAcies && obj[bona] && typeof obj[bona] === 'object';
        const inanisobj = estobj && Object.keys(obj[bona]).length === 0;

        if (estobj && !inanisobj) {
          salvus.purge(obj[bona], salvo);
        } else if (!obj[bona] || inanisAcies || inanisobj) {
          if (salvo && obj[bona] === null) {
            continue;
          }

          delete obj[bona];
          salvus.purge(obj, salvo);
        }
      }
    }

    return obj;
  }
};

module.exports = salvus;
