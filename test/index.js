'use strict';

require('../lib/salvus.js');
var chai = require('chai'),
    expect = chai.expect,
    object = { };

describe('Salvus: Tu ne cede malis sed contra audentior ito.', function () {

    beforeEach(function () {

        object = {
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
                expect(object.address.country).to.be.eql('IT');

                // Set from string
                object.noto('address.country:Italy');
                expect(object.address.country).to.be.eql('Italy');

                // Set from array
                object.noto(['address.country:Italia']);
                expect(object.address.country).to.be.eql('Italia');

                done();
            });
        });

        describe('- Set a single, nested, property', function () {
            it('Should return an object with the written, nested, property', function (done) {

                // This property does not exist
                expect(object.lego('address.villa.apartment')).to.be.eql(undefined);

                // Set from string
                object.noto('address.villa.apartment:1AC');
                expect(object.address.villa.apartment).to.be.eql('1AC');

                // Set from array
                object.noto(['address.villa.apartment:1BC']);
                expect(object.address.villa.apartment).to.be.eql('1BC');

                done();
            });
        });

        describe('- Set nested properties', function () {
            it('Should return an object with the written nested properties', function (done) {

                // These properties have different values
                expect(object.address.city).to.be.eql('Rome');
                expect(object.address.street).to.be.eql('Circus maximus');
                expect(object.address.country).to.be.eql('IT');
                expect(object.rank).to.be.eql(null);
                expect(object.lego('skills.tools.mastered')).to.be.eql(undefined);

                object.noto(['address{city:Milano, street:Strada del Sole, country:Italia}', 'rank:emperor', 'skills.tools.mastered{sword:true, axe:true, spear:false, shield:true}']);
                expect(object.address.city).to.be.eql('Milano');
                expect(object.address.street).to.be.eql('Strada del Sole');
                expect(object.address.country).to.be.eql('Italia');
                expect(object.rank).to.be.eql('emperor');
                expect(object.skills).to.be.instanceOf(Object);
                expect(object.skills.tools).to.be.instanceOf(Object);
                expect(object.skills.tools.mastered).to.be.instanceOf(Object);
                expect(object.skills.tools.mastered.sword).to.be.eql(true);
                expect(object.skills.tools.mastered.axe).to.be.eql(true);
                expect(object.skills.tools.mastered.spear).to.be.eql(false);
                expect(object.skills.tools.mastered.shield).to.be.eql(true);

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
                value = object.lego('name');
                expect(value).to.be.eql('Salvus');

                done();
            });
        });

        describe('- Read from a nested property', function () {
            it('Should return a value', function (done) {

                var value;

                // Nested
                value = object.lego('address.city');
                expect(value).to.be.eql('Rome');

                done();
            });
        });

        describe('- Read undefined properties', function () {
            it('Non existing properties are `undefined`', function (done) {

                var value;

                // Undefined
                value = object.lego('politics');
                expect(value).to.be.eql(undefined);

                value = object.lego('address.nation');
                expect(value).to.be.eql(undefined);

                done();
            });
        });

        describe('- Read null properties', function () {
            it('Properties with values of `null` are returned as `null`', function (done) {

                var value;

                // Null
                value = object.lego('rank');
                expect(value).to.be.eql(null);

                value = object.lego('address.phone');
                expect(value).to.be.eql(null);

                done();
            });
        });

        describe('- Identify non-existing properties', function () {
            it('Identify which property is `undefined`', function (done) {

                var value;

                // Identify the non-existing property
                value = object.lego('address.nation', true);
                expect(value).to.be.eql('!!nation');

                done();
            });
        });

        describe('- Identify non-existing properties with custom label', function () {
            it('Identify which property is `undefined`', function (done) {

                var value;

                // Custom non-existing property identifier
                value = object.lego('address.nation', true, false, 'NA-');
                expect(value).to.be.eql('NA-nation');

                done();
            });
        });

        describe('- Read `null` as `undefined`', function () {
            it('Treat `null` as `undefined`', function (done) {

                var value;

                // Treat 'null' as 'undefined`
                value = object.lego('rank', false, true);
                expect(value).to.be.eql(undefined);

                value = object.lego('address.nation', false, true);
                expect(value).to.be.eql(undefined);

                done();
            });
        });

    });


    // Delete
    describe('{}.erado()', function () {

        describe('- Delete a single property', function () {
            it('Should return an object', function (done) {

                expect(object.age).to.be.eql(21);
                object.erado('age');

                expect(object.age).to.be.eql(undefined);

                done();
            });
        });

        describe('- Delete multiple properties', function () {
            it('Should return an object', function (done) {

                expect(object.name).to.be.eql('Salvus');
                expect(object.age).to.be.eql(21);
                expect(object.address.country).to.be.eql('IT');

                object.erado(['name', 'age', 'address.country']);

                expect(object.name).to.be.eql(undefined);
                expect(object.age).to.be.eql(undefined);
                expect(object.address.country).to.be.eql(undefined);

                done();
            });
        });

        describe('- Delete multiple -and sub- properties', function () {
            it('Should return an object', function (done) {

                expect(object.name).to.be.eql('Salvus');
                expect(object.age).to.be.eql(21);
                expect(object.address.city).to.be.eql('Rome');
                expect(object.address.country).to.be.eql('IT');
                expect(object.address.street).to.be.eql('Circus maximus');

                object.erado(['name', 'age', 'address{city, country, street}']);

                expect(object.name).to.be.eql(undefined);
                expect(object.age).to.be.eql(undefined);
                expect(object.address.city).to.be.eql(undefined);
                expect(object.address.country).to.be.eql(undefined);
                expect(object.address.street).to.be.eql(undefined);
                expect(object.address.phone).to.be.eql(null);

                done();
            });
        });

    });


    // Purgo
    describe('{}.purgo()', function () {

        describe('- Purge the object', function () {
            it('Purges `undefined`, `null` `empty objects` and `empty arrays`.', function (done) {

                expect(object.name).to.be.eql('Salvus');
                expect(object.age).to.be.eql(21);
                expect(object.rank).to.be.eql(null);
                expect(object.address.city).to.be.eql('Rome');
                expect(object.address.country).to.be.eql('IT');
                expect(object.address.street).to.be.eql('Circus maximus');
                expect(object.address.phone).to.be.eql(null);

                object.purgo();

                expect(object.name).to.be.eql('Salvus');
                expect(object.age).to.be.eql(21);
                expect(object.rank).to.be.eql(undefined);
                expect(object.address.city).to.be.eql('Rome');
                expect(object.address.country).to.be.eql('IT');
                expect(object.address.street).to.be.eql('Circus maximus');
                expect(object.ancestors).to.be.eql(undefined);
                expect(object.address.phone).to.be.eql(undefined);

                done();
            });
        });

    });

});
