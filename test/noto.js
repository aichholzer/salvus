require('../lib/salvus.js');
var obj = {
    name: 'Salvus'
};


// One
obj.noto('age:21');
obj.noto(['age:21']);

// Multiple
obj.noto(['city:Rome', 'street:Circus maximus']);

// Sub-properties
obj.noto(['address{city:Rome, street:Circus maximus, country:IT}', 'rank:emperor']);
