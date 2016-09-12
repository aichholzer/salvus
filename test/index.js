'use strict';


require('../lib/index');
let should = require('should'),
    roman = {};

beforeEach(() => {
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

describe('{}.noto()', () => {

    it('Write property values', done => {
        roman.noto('address.country:Italy');
        should(roman.address.country).eql('Italy');

        roman.noto(['address.country:Italia']);
        should(roman.address.country).eql('Italia');

        done();
    });

    it('Write new property and values', done => {

        should(roman.lego('address.villa.apartment')).eql(undefined);

        // From string
        roman.noto('address.villa.apartment:Top level');
        should(roman.address.villa.apartment).eql('Top level');

        // From array
        roman.noto(['address.villa.apartment:Bottom level']);
        should(roman.address.villa.apartment).eql('Bottom level');

        done();
    });

    it('Write nested property and values', done => {

        should(roman.address.city).eql('Rome');
        should(roman.address.street).eql('Circus maximus');
        should(roman.address.country).eql('IT');
        should(roman.rank).eql(null);
        should(roman.lego('skills.tools.mastered')).eql(undefined);

        roman.noto(['address{city:Milano, street:Strada del Sole, country:Italia}', 'rank:emperor', 'skills.tools.mastered{sword:true, axe:true, spear:false, shield:true}']);
        should(roman.address.city).eql('Milano');
        should(roman.address.street).eql('Strada del Sole');
        should(roman.address.country).eql('Italia');
        should(roman.rank).eql('emperor');
        should(roman.skills).be.instanceOf(Object);
        should(roman.skills.tools).be.instanceOf(Object);
        should(roman.skills.tools.mastered).be.instanceOf(Object);
        should(roman.skills.tools.mastered.sword).eql(true);
        should(roman.skills.tools.mastered.axe).eql(true);
        should(roman.skills.tools.mastered.spear).eql(false);
        should(roman.skills.tools.mastered.shield).eql(true);

        done();
    });
});

describe('{}.lego()', () => {

    it('Read values', done => {
        should(roman.lego('name')).eql('Salvus');
        should(roman.lego('address.city')).eql('Rome');
        done();
    });

    it('Read values from non-existing properties', done => {
        should(roman.lego('politics')).eql(undefined);
        should(roman.lego('address.nation')).eql(undefined);
        done();
    });

    it('Read null values from existing properties', done => {
        should(roman.lego('rank')).eql(null);
        should(roman.lego('address.phone')).eql(null);
        done();
    });

    it('Identify the undefined property', done => {
        should(roman.lego('address.nation', true)).eql('!!nation');
        done();
    });

    it('Identify the undefined property with custom identifier', done => {
        should(roman.lego('address.nation', true, false, 'NA-')).eql('NA-nation');
        done();
    });

    it('Treat null values as undefined', done => {
        should(roman.lego('rank', false, true)).eql(undefined);
        should(roman.lego('address.nation', false, true)).eql(undefined);
        done();
    });
});

describe('{}.erado()', () => {

    it('Should return an object', done => {
        should(roman.age).eql(21);

        roman.erado('age');
        should(roman.age).eql(undefined);

        done();
    });

    it('Should return an object', done => {

        should(roman.name).eql('Salvus');
        should(roman.age).eql(21);
        should(roman.address.country).eql('IT');

        roman.erado(['name', 'age', 'address.country']);
        should(roman.name).eql(undefined);
        should(roman.age).eql(undefined);
        should(roman.address.country).eql(undefined);

        done();
    });

    it('Should return an object', done => {

        should(roman.name).eql('Salvus');
        should(roman.age).eql(21);
        should(roman.address.city).eql('Rome');
        should(roman.address.country).eql('IT');
        should(roman.address.street).eql('Circus maximus');

        roman.erado(['name', 'age', 'address{city, country, street}']);
        should(roman.name).eql(undefined);
        should(roman.age).eql(undefined);
        should(roman.address.city).eql(undefined);
        should(roman.address.country).eql(undefined);
        should(roman.address.street).eql(undefined);
        should(roman.address.phone).eql(null);

        done();
    });
});

describe('{}.purgo()', () => {

    it('Purge undefined, null, empty objects, empty arrays', done => {

        should(roman.name).eql('Salvus');
        should(roman.age).eql(21);
        should(roman.rank).eql(null);
        should(roman.address.city).eql('Rome');
        should(roman.address.country).eql('IT');
        should(roman.address.street).eql('Circus maximus');
        should(roman.address.phone).eql(null);

        roman.purgo();
        should(roman.name).eql('Salvus');
        should(roman.age).eql(21);
        should(roman.rank).eql(undefined);
        should(roman.address.city).eql('Rome');
        should(roman.address.country).eql('IT');
        should(roman.address.street).eql('Circus maximus');
        should(roman.ancestors).eql(undefined);
        should(roman.address.phone).eql(undefined);

        done();
    });
});
