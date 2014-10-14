'use strict';

require('../lib/salvus.js');
var chai = require('chai'),
    expect = chai.expect,
    roman = { };

describe('Salvus: Tu ne cede malis sed contra audentior ito.', function () {

    beforeEach(function () {

        roman = {
            name: 'Salvus',
            age: 21,
            rank: null,
            ancestors: '',
            address: {
                city: 'Rome',
                country: 'IT',
                street: 'Circus maximus',
                phone: null
            }
        };

    });

    // Write
    describe('{}.noto()', function () {

        describe('- Set a single property', function () {
            it('Should return an object with the written property', function (done) {

                // This property has a different value
                expect(roman.address.country).to.be.eql('IT');

                // Set from string
                roman.noto('address.country:Italy');
                expect(roman.address.country).to.be.eql('Italy');

                // Set from array
                roman.noto(['address.country:Italia']);
                expect(roman.address.country).to.be.eql('Italia');

                done();
            });
        });

        describe('- Set a single, nested, property', function () {
            it('Should return an object with the written, nested, property', function (done) {

                // This property does not exist
                expect(roman.lego('address.villa.apartment')).to.be.eql(undefined);

                // Set from string
                roman.noto('address.villa.apartment:1AC');
                expect(roman.address.villa.apartment).to.be.eql('1AC');

                // Set from array
                roman.noto(['address.villa.apartment:1BC']);
                expect(roman.address.villa.apartment).to.be.eql('1BC');

                done();
            });
        });

        describe('- Set nested properties', function () {
            it('Should return an object with the written nested properties', function (done) {

                // These properties have different values
                expect(roman.address.city).to.be.eql('Rome');
                expect(roman.address.street).to.be.eql('Circus maximus');
                expect(roman.address.country).to.be.eql('IT');
                expect(roman.rank).to.be.eql(null);
                expect(roman.lego('skills.tools.mastered')).to.be.eql(undefined);

                roman.noto(['address{city:Milano, street:Strada del Sole, country:Italia}', 'rank:emperor', 'skills.tools.mastered{sword:true, axe:true, spear:false, shield:true}']);
                expect(roman.address.city).to.be.eql('Milano');
                expect(roman.address.street).to.be.eql('Strada del Sole');
                expect(roman.address.country).to.be.eql('Italia');
                expect(roman.rank).to.be.eql('emperor');
                expect(roman.skills).to.be.instanceOf(Object);
                expect(roman.skills.tools).to.be.instanceOf(Object);
                expect(roman.skills.tools.mastered).to.be.instanceOf(Object);
                expect(roman.skills.tools.mastered.sword).to.be.eql(true);
                expect(roman.skills.tools.mastered.axe).to.be.eql(true);
                expect(roman.skills.tools.mastered.spear).to.be.eql(false);
                expect(roman.skills.tools.mastered.shield).to.be.eql(true);

                done();
            });
        });

    });


    // Read
    describe('{}.lego()', function () {

        describe('- Read from a single property', function () {
            it('Should return a value', function (done) {

                var value;

                // Top level
                value = roman.lego('name');
                expect(value).to.be.eql('Salvus');

                done();
            });
        });

        describe('- Read from a nested property', function () {
            it('Should return a value', function (done) {

                var value;

                // Nested
                value = roman.lego('address.city');
                expect(value).to.be.eql('Rome');

                done();
            });
        });

        describe('- Read undefined properties', function () {
            it('Non existing properties are `undefined`', function (done) {

                var value;

                // Undefined
                value = roman.lego('politics');
                expect(value).to.be.eql(undefined);

                value = roman.lego('address.nation');
                expect(value).to.be.eql(undefined);

                done();
            });
        });

        describe('- Read null properties', function () {
            it('Properties with values of `null` are returned as `null`', function (done) {

                var value;

                // Null
                value = roman.lego('rank');
                expect(value).to.be.eql(null);

                value = roman.lego('address.phone');
                expect(value).to.be.eql(null);

                done();
            });
        });

        describe('- Identify non-existing properties', function () {
            it('Identify which property is `undefined`', function (done) {

                var value;

                // Identify the non-existing property
                value = roman.lego('address.nation', true);
                expect(value).to.be.eql('!!nation');

                done();
            });
        });

        describe('- Identify non-existing properties with custom label', function () {
            it('Identify which property is `undefined`', function (done) {

                var value;

                // Custom non-existing property identifier
                value = roman.lego('address.nation', true, false, 'NA-');
                expect(value).to.be.eql('NA-nation');

                done();
            });
        });

        describe('- Read `null` as `undefined`', function () {
            it('Treat `null` as `undefined`', function (done) {

                var value;

                // Treat 'null' as 'undefined`
                value = roman.lego('rank', false, true);
                expect(value).to.be.eql(undefined);

                value = roman.lego('address.nation', false, true);
                expect(value).to.be.eql(undefined);

                done();
            });
        });

    });


    // Delete
    describe('{}.erado()', function () {

        describe('- Delete a single property', function () {
            it('Should return an object', function (done) {

                expect(roman.age).to.be.eql(21);
                roman.erado('age');

                expect(roman.age).to.be.eql(undefined);

                done();
            });
        });

        describe('- Delete multiple properties', function () {
            it('Should return an object', function (done) {

                expect(roman.name).to.be.eql('Salvus');
                expect(roman.age).to.be.eql(21);
                expect(roman.address.country).to.be.eql('IT');

                roman.erado(['name', 'age', 'address.country']);

                expect(roman.name).to.be.eql(undefined);
                expect(roman.age).to.be.eql(undefined);
                expect(roman.address.country).to.be.eql(undefined);

                done();
            });
        });

        describe('- Delete multiple -and sub- properties', function () {
            it('Should return an object', function (done) {

                expect(roman.name).to.be.eql('Salvus');
                expect(roman.age).to.be.eql(21);
                expect(roman.address.city).to.be.eql('Rome');
                expect(roman.address.country).to.be.eql('IT');
                expect(roman.address.street).to.be.eql('Circus maximus');

                roman.erado(['name', 'age', 'address{city, country, street}']);

                expect(roman.name).to.be.eql(undefined);
                expect(roman.age).to.be.eql(undefined);
                expect(roman.address.city).to.be.eql(undefined);
                expect(roman.address.country).to.be.eql(undefined);
                expect(roman.address.street).to.be.eql(undefined);
                expect(roman.address.phone).to.be.eql(null);

                done();
            });
        });

    });


    // Purgo
    describe('{}.purgo()', function () {

        describe('- Purge the object', function () {
            it('Purges `undefined`, `null` `empty objects` and `empty arrays`.', function (done) {

                expect(roman.name).to.be.eql('Salvus');
                expect(roman.age).to.be.eql(21);
                expect(roman.rank).to.be.eql(null);
                expect(roman.address.city).to.be.eql('Rome');
                expect(roman.address.country).to.be.eql('IT');
                expect(roman.address.street).to.be.eql('Circus maximus');
                expect(roman.address.phone).to.be.eql(null);

                roman.purgo();

                expect(roman.name).to.be.eql('Salvus');
                expect(roman.age).to.be.eql(21);
                expect(roman.rank).to.be.eql(undefined);
                expect(roman.address.city).to.be.eql('Rome');
                expect(roman.address.country).to.be.eql('IT');
                expect(roman.address.street).to.be.eql('Circus maximus');
                expect(roman.ancestors).to.be.eql(undefined);
                expect(roman.address.phone).to.be.eql(undefined);

                done();
            });
        });

    });

});
