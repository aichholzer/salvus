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
                pecunia = pecunia.split(':');
                substantia.elementum[pecunia[0]] = pecunia[1];
            });
        }

        return substantia;
    },

    noto: function Salvus$noto (elementum) {

        var obiectum = this,
            semita,
            multiSubstantia = salvus.extraho(elementum);

        if (multiSubstantia) {
            semita = multiSubstantia.semita;
        } else {
            elementum = elementum.split(':');
            semita = elementum[0].split('.');
        }

        for (var bona=0; bona < semita.length-1; ++bona) {
            if (!obiectum[semita[bona]]) {
                obiectum[semita[bona]] = {};
            }
            obiectum = obiectum[semita[bona]];
        }

        if (multiSubstantia) {
            obiectum[semita[semita.length-1]] = obiectum[semita[semita.length-1]] || {};
            for (var element in multiSubstantia.elementum) {
                if (multiSubstantia.elementum.hasOwnProperty(element)) {
                    obiectum[semita[semita.length-1]][element] = multiSubstantia.elementum[element];
                }
            }
        } else {
            obiectum[semita[semita.length-1]] = elementum[1];
        }

        return this;
    },

    lego: function Salvus$lego (elementum) {
        // Read any property if it exists
    },

    /**
     * Removes all properties specified in elementum.
     *
     * @param elementum - String; Properties to remove
     * @param radix - Boolean; Should base property also be removed. Defaults to false.
     * @returns {salvus}
     * @constructor
     */
    erado: function Salvus$erado (elementum, radix) {

        // console.log(obj.erado('name, age, place, address.country'));
        var self = this;

        elementum = Array.isArray(elementum) ? elementum : elementum.split(',');
        elementum.forEach(function(bona) {
            if (self.hasOwnProperty(bona.trim())) {
                delete self[bona.trim()];
            }
        });

        return self;
    },

    /**
     * Removes all empty properties -recursively- from the object.
     * Properties which values are "undefined" or "null" will also
     * be purged, this also includes empty objects and empty arrays.
     *
     * @returns {salvus}
     * @constructor
     */
    purgo: function Salvus$purgo (obj) {

        var self = obj || this,
            isArray,
            isEmptyArray,
            isObject,
            isEmptyObject;

        for (var property in self) {
            if (self.hasOwnProperty(property)) {

                isArray = Array.isArray(self[property]);
                isEmptyArray = (isArray && self[property].length === 0) || false;
                isObject = (!isArray && self[property] && typeof self[property] === 'object') || false;
                isEmptyObject = (isObject && Object.keys(self[property]).length === 0) || false;

                if (isObject && !isEmptyObject) {
                    salvus.purgo(self[property]);
                } else if (!self[property] || isEmptyArray || (isObject && isEmptyObject)) {
                    delete self[property];
                    salvus.purgo(self);
                }
            }
        }

        return self;
    }

};

module.exports = (function() {

    Object.prototype.noto = salvus.noto;

    Object.prototype.lego = salvus.lego;

    Object.prototype.erado = salvus.erado;

    Object.prototype.purgo = salvus.purgo;

})();
