'use strict';


const salvus = {

    /**
     * Helper function to extract the properties if more than one is
     * being expected to be handled.
     *
     * @param {String} elementum - The elements which are being read.
     * @returns {Array} - Elements which have been found.
     * @private
     */
    extraho: elementum => {

        let par = elementum.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/);
        let substantia;

        if (par) {
            substantia = {
                semita: elementum.substr(0, elementum.search(/\(|\[|\{/)).split('.'),
                elementum: {}
            };
            par = (par[1] || par[2] || par[3]).split(',');
            par.forEach(pecunia => {
                pecunia = pecunia.trim().split(':');
                substantia.elementum[pecunia[0]] = pecunia[1];
            });
        }

        return substantia;
    },

    /**
     * Writes a value to the property. Nested properties will
     * result in creating the nested objects and append the property where specified.
     *
     * @param {Object} sui - The object being manipulated
     * @param {String | Array} elementum
     * @param {boolean} salvo - Used internally to prevent key/value extraction (extraho).
     * @returns {object} - The modified object with its new properties/value.
     */
    noto: function (sui, elementum, salvo = false) {

        if (!elementum) {
            return this;
        }

        elementum = Array.isArray(elementum) ? elementum : elementum.split();
        elementum.forEach(elementi => {

            let multiSubstantia = !salvo ? salvus.extraho(elementi) : false;
            let semita;

            if (multiSubstantia) {
                semita = multiSubstantia.semita;
            } else {
                if (elementi.indexOf(':') >= 1) {
                    elementi = [
                        elementi.substring(0, elementi.indexOf(':')),
                        elementi.substring(elementi.indexOf(':') + 1)
                    ];
                } else {
                    elementi = [elementi];
                }

                semita = elementi[0].split('.');
            }

            for (let bona = 0; bona < semita.length - 1; bona += 1) {
                if (!sui[semita[bona]]) {
                    sui[semita[bona]] = {};
                }

                /*
                 This must be fixed to support multiple definitions of the same object

                 obj.noto(['name.last', 'name.first'])
                 Will create a double 'name' and it's not the desired behaviour.
                 */
                sui = sui[semita[bona]];
            }

            if (multiSubstantia) {
                sui[semita[semita.length - 1]] = sui[semita[semita.length - 1]] || {};
                for (let elemento in multiSubstantia.elementum) {
                    if (multiSubstantia.elementum.hasOwnProperty(elemento)) {
                        let neo = multiSubstantia.elementum[elemento];
                        neo = neo === 'true' ? true : neo === 'false' ? false : neo;
                        sui[semita[semita.length - 1]][elemento] = neo;
                    }
                }
            } else {
                elementi[1] = elementi[1] === 'true' ? true : elementi[1] === 'false' ? false : elementi[1];
                sui[semita[semita.length - 1]] = elementi[1];
            }

        });

        return this;
    },

    /**
     * Reads any property's value. Non-existent properties will return
     * undefined.
     *
     * @param {Object} sui - The object being manipulated
     * @param {String} elementum - The elements which are being read.
     * @param {Boolean} refero - Identify the 'undefined' property trying to be accessed. Defaults to 'false'.
     * @param {Boolean} stricto - Only actual values are returned, everything else will be 'undefined'. Defaults to 'false'.
     * @param {String} intellego - Prepend this string to the undefined property. Requires 'refero' to be true. Defaults to '!!'.
     * @returns {String | Boolean | undefined} - The found value, 'undefined' or a string describing the 'undefined' property (Requires 'refero' to be true).
     */
    lego: (sui, elementum, refero, stricto, intellego) => {

        if (!sui || !elementum) {
            return undefined;
        }

        let semita = elementum.split('.');
        let valorem;

        for (let bona = 0; bona < semita.length; bona += 1) {

            if (sui[semita[bona]] === null) {
                valorem = stricto ? sui[semita[bona]] || false : null;
                return valorem === null ? valorem : refero ? (intellego || '!!') + semita[bona] : undefined;
            }

            if (!stricto && typeof sui[semita[bona]] === 'boolean' && sui[semita[bona]] === false) {
                return refero ? (intellego || '!!') + semita[bona] : false;
            }

            valorem = sui[semita[bona].trim()];
            valorem = stricto ? valorem || false : (valorem || valorem === null) ? valorem : false;

            if (valorem || valorem === null) {
                sui = valorem;
            } else {
                return (refero) ? (intellego || '!!') + semita[bona] : undefined;
            }
        }

        return valorem;
    },

    /**
     * Removes all properties specified in elementum.
     *
     * @param {Object} sui - The object being manipulated
     * @param {String | Array} elementum - Properties to remove
     * @returns {object} - The cleaned object.
     * @constructor
     */
    erado: function (sui, elementum) {
        return !elementum ? this : this.noto(sui, elementum).purgo(sui, true);
    },

    /**
     * Removes all empty properties -recursively- from the object.
     * Properties which values are "undefined" or "null" will also
     * be purged, this also includes empty objects and empty arrays.
     *
     * @param {object} sui - Passed-in on recursion only.
     * @param {boolean} salvo - Used internally to preseve `null` values.
     * @returns {object} - The purged object.
     */
    purgo: (sui, salvo) => {

        for (let bona in sui) {
            if (sui.hasOwnProperty(bona)) {

                const estAcies = Array.isArray(sui[bona]);
                const inanisAcies = estAcies && sui[bona].length === 0;
                const estSui = !estAcies && sui[bona] && typeof sui[bona] === 'object';
                const inanisSui = estSui && Object.keys(sui[bona]).length === 0;

                if (estSui && !inanisSui) {
                    salvus.purgo(sui[bona], salvo);
                } else if (!sui[bona] || inanisAcies || inanisSui) {
                    if (salvo && sui[bona] === null) {
                        continue;
                    }

                    delete sui[bona];
                    salvus.purgo(sui, salvo);
                }
            }
        }

        return sui;
    }
};

module.exports = {
    noto: salvus.noto,
    lego: salvus.lego,
    erado: salvus.erado,
    purgo: salvus.purgo
};
