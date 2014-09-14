'use strict';


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

	lego: function Salvus$purgo (elementum) {
		// Read any property if it exists
	},

	purgo: function Salvus$purgo () {
		// Clean all empty properties from an object
	}

};


module.exports = (function() {

	Object.prototype.noto = salvus.noto;

	Object.prototype.lego = salvus.lego;

	Object.prototype.purgo = salvus.purgo;

})();
