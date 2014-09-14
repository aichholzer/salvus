'use strict';


String.prototype.extraho = function() {
	var par = this.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/),
		substantia;

	if (par) {
		substantia = {
			semita: this.substr(0, this.search(/\(|\[|\{/)).split('.'),
			elementum: {}
		};
		par = (par[1] || par[2] || par[3]).split(',');
		par.forEach(function(pecunia) {
			pecunia = pecunia.split(':');
			substantia.elementum[pecunia[0]] = pecunia[1];
		});
	}

	return substantia;
};


module.exports = (function() {

	Object.prototype.noto = function Salvus$noto (elementum) {

		var obiectum = this,
			semita,
			multiSubstantia = elementum.extraho();

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
	};


	Object.prototype.lego = function () {
		console.log('get');
	};

})();


/*

 var obj = {
 name: 'Stefan',
 age: 34,
 address: {
 home: 'Amsterdam',
 office: 'London'
 }
 };

TEST
obj.noto('address(city:Roma,direction:north,river:water)');
//obj.noto('address.city:Roma');
console.log(obj);
*/
