'use strict';

require('should');
require('../lib/salvus.js');

var object = {
	name: 'Salvus',
	age: '1',
	address: {
		city: 'Rome'
	}
};

describe('Salvus', function () {

	describe('#Set single property', function () {
		it('Should return an object', function (done) {

			object.noto('address.country:Italy');
			console.log(object);
			done();

		});
	});

});
