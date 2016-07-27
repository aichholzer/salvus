'use strict';


/*!
 * Copyright (c) 2014 Stefan Aichholzer <theaichholzer@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var salvus = {

    /**
     * Helper function to extract the properties if more than one is
     * being expected to be handled.
     *
     * @param {String} elementum - The elements which are being read.
     * @returns {Array} - Elements which have been found.
     * @private
     */
    extraho: function Salvus$extraho(elementum) {

        var par = elementum.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/),
            substantia;

        if (par) {
            substantia = {
                semita: elementum.substr(0, elementum.search(/\(|\[|\{/)).split('.'),
                elementum: {}
            };
            par = (par[1] || par[2] || par[3]).split(',');
            par.forEach(function (pecunia) {
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
     * @returns {object} - The modified object with its new properties/value.
     */
    noto: function Salvus$noto(sui, elementum) {

        if (!elementum) {
            return this;
        }

        var semita,
            multiSubstantia,
            bona,
            elemento;

        elementum = Array.isArray(elementum) ? elementum : elementum.split();
        elementum.forEach(function (elementi) {

            multiSubstantia = salvus.extraho(elementi);

            if (multiSubstantia) {
                semita = multiSubstantia.semita;
            } else {
                elementi = elementi.split(':');
                semita = elementi[0].split('.');
            }

            for (bona = 0; bona < semita.length - 1; bona += 1) {
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
                for (elemento in multiSubstantia.elementum) {
                    if (multiSubstantia.elementum.hasOwnProperty(elemento)) {
                        multiSubstantia.elementum[elemento] = multiSubstantia.elementum[elemento] === 'true' ?
                            true :
                            multiSubstantia.elementum[elemento] === 'false' ? false : multiSubstantia.elementum[elemento];

                        sui[semita[semita.length - 1]][elemento] = multiSubstantia.elementum[elemento];
                    }
                }
            } else {
                elementi[1] = elementi[1] === 'true' ? true : elementi[1] === 'false' ? false : elementi[1];
                sui[semita[semita.length-1]] = elementi[1];
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
    lego: function Salvus$lego (sui, elementum, refero, stricto, intellego) {

        if (!sui || !elementum) {
            return undefined;
        }

        var semita = elementum.split('.'),
            valorem,
            bona;

        for (bona = 0; bona < semita.length; bona += 1) {

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
    erado: function Salvus$erado(sui, elementum) {

        if (!elementum) {
            return this;
        }

        return this.noto(sui, elementum).purgo(sui, true);
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
    purgo: function Salvus$purgo(sui, salvo) {

        var estAcies,
            inanisAcies,
            estSui,
            inanisSui,
            bona;

        for (bona in sui) {
            if (sui.hasOwnProperty(bona)) {

                estAcies = Array.isArray(sui[bona]);
                inanisAcies = estAcies && sui[bona].length === 0;
                estSui = !estAcies && sui[bona] && typeof sui[bona] === 'object';
                inanisSui = estSui && Object.keys(sui[bona]).length === 0;

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
