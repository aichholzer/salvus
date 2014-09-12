require('../lib/salvus.js');
var obj = {
    name: 'Salvus',
    age: '21',
    place: '',
    rank: null,
    ancestors: undefined,
    address: {
        city: 'Rome',
        country: 'IT',
        street: 'Circus maximus',
        alleys: {
            main: 'Street',
            second: '',
            third: { },
            forth: {
                fifth: {
                    sixth: {
                        seventh: {
                            eighth: {
                                ninth: { }
                            }
                        }
                    }
                }
            }
        }
    }
};


// Purge all empty properties and objects
obj.purgo();
