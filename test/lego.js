require('../lib/salvus.js');
var obj = {
    name: 'Salvus',
    age: '21',
    rank: null,
    ancestors: '',
    address: {
        city: 'Rome',
        country: 'IT',
        street: 'Circus maximus',
        alleys: null
    }
};


// One
obj.lego('name');

// Nested
obj.lego('address.city');

// Undefined
obj.lego('ancestors');
obj.lego('politics');
obj.lego('address.nation');

// Null
obj.lego('rank');
obj.lego('address.alleys');

// Identify the non-existing property
obj.lego('address.alleys', true); // => !!alleys

// Custom non-existing property identifier
obj.lego('address.alleys', true, false, 'NA-'); // => NA-alleys

// Treat 'null' as 'undefined`
obj.lego('address.alleys', false, true);
obj.lego('ancestors', false, true);
