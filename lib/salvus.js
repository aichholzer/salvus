'use strict';


String.prototype.extract = function() {
	var matches = this.match(/\[([^\]]+)]|\(([^)]+)\)/);
	if (matches) {
		return (matches[1] || matches[2]).split(',');
	}

	return null;
};


module.exports = (function() {

	Object.prototype.noto = function Salvus$noto (elements) {

		var obj = this,
			properties,
			multipleProperties = elements.extract(); // TODO: take care of multiple properties

		elements = elements.split(':');
		properties = elements[0].split('.');

		for (var i=0; i < properties.length-1; i++) {
			if (!obj[properties[i]]) {
				obj[properties[i]] = {};
			}

			obj = obj[properties[i]];
		}

		obj[properties[properties.length-1]] = elements[1];

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
