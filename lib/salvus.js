(function() {
    'use strict';
})();

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
     * @param {String} elementum
     * @returns {Array}
     * @constructor
     * @private
     */
    extraho: function Salvus$extraho (elementum) {

        var par = elementum.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/),
            substantia;

        if (par) {
            substantia = {
                semita: elementum.substr(0, elementum.search(/\(|\[|\{/)).split('.'),
                elementum: {}
            };
            par = (par[1] || par[2] || par[3]).split(',');
            par.forEach(function(pecunia) {
                pecunia = pecunia.trim().split(':');
                substantia.elementum[pecunia[0]] = pecunia[1];
            });
        }

        return substantia;
    },

    /**
     * Writes any value to the property. Nested properties will
     * result create the nested objects and append the property where required.
     *
     * @param {String} elementum
     * @returns {salvus} - The object with the new properties/value.
     * @constructor
     */
    noto: function Salvus$noto (elementum) {

        var sui = this,
            semita,
            multiSubstantia = salvus.extraho(elementum);

        if (multiSubstantia) {
            semita = multiSubstantia.semita;
        } else {
            elementum = elementum.split(':');
            semita = elementum[0].split('.');
        }

        for (var bona=0; bona < semita.length-1; ++bona) {
            if (!sui[semita[bona]]) {
                sui[semita[bona]] = {};
            }
            sui = sui[semita[bona]];
        }

        if (multiSubstantia) {
            sui[semita[semita.length-1]] = sui[semita[semita.length-1]] || {};
            for (var element in multiSubstantia.elementum) {
                if (multiSubstantia.elementum.hasOwnProperty(element)) {
                    sui[semita[semita.length-1]][element] = multiSubstantia.elementum[element];
                }
            }
        } else {
            sui[semita[semita.length-1]] = elementum[1];
        }

        return this;
    },

    /**
     * Reads any property's value. Non-existent properties will return
     * false.
     *
     * @param {String} elementum
     * @returns {Boolean | Value} - The found value or false.
     * @constructor
     */
    lego: function Salvus$lego (elementum) {

        var sui = self;

        try {
            return sui[elementum]; // Build the correct path here
        } catch (e) {
            return false;
        }
    },

    /**
     * Removes all properties specified in elementum.
     *
     * @param {String | Array} elementum - Properties to remove
     * @param {Boolean} radix - Should base property also be removed. Defaults to false.
     * @returns {salvus} - The cleaned object.
     * @constructor
     */
    erado: function Salvus$erado (elementum, radix) {

        // console.log(obj.erado('name, age, place, address.country'));
        // console.log(obj.erado(['name', 'age', 'place', 'address.country']));
        var sui = this;

        elementum = Array.isArray(elementum) ? elementum : elementum.split(',');
        elementum.forEach(function(bona) {
            if (sui.hasOwnProperty(bona.trim())) {
                delete sui[bona.trim()];
            }
        });

        return sui;
    },

    /**
     * Removes all empty properties -recursively- from the object.
     * Properties which values are "undefined" or "null" will also
     * be purged, this also includes empty objects and empty arrays.
     *
     * @returns {salvus} - The purged object.
     * @constructor
     */
    purgo: function Salvus$purgo (obj) {

        var sui = obj || this,
            isArray,
            isEmptyArray,
            isObject,
            isEmptyObject;

        for (var property in sui) {
            if (sui.hasOwnProperty(property)) {

                isArray = Array.isArray(sui[property]);
                isEmptyArray = (isArray && sui[property].length === 0) || false;
                isObject = (!isArray && sui[property] && typeof sui[property] === 'object') || false;
                isEmptyObject = (isObject && Object.keys(sui[property]).length === 0) || false;

                if (isObject && !isEmptyObject) {
                    salvus.purgo(sui[property]);
                } else if (!sui[property] || isEmptyArray || (isObject && isEmptyObject)) {
                    delete sui[property];
                    salvus.purgo(sui);
                }
            }
        }

        return sui;
    }

};

module.exports = (function() {

    Object.prototype.noto = salvus.noto;

    Object.prototype.lego = salvus.lego;

    Object.prototype.erado = salvus.erado;

    Object.prototype.purgo = salvus.purgo;

})();
