require('../lib/salvus.js');
var obj = {
    name: 'Salvus',
    age: '21',
    address: {
        city: 'Rome',
        country: 'IT',
        street: 'Circus maximus'
    }
};


// One
obj.erado('name');
obj.erado(['name']);

// Multiple
obj.erado(['name', 'age', 'address.country']);

// Sub-properties
obj.erado(['name', 'age', 'address{country, street}']);
