var s = require('/Users/stefan.aichholzer/Development/Contributions/Salvus/lib/salvus'),
	obj = {
		name: 'Ice',
		age: '12',
		place: '',
		placea: null,
		placeb: undefined,
		address: {
			city: 'Rome',
			country: 'IT',
			places: [1, 2, 4, {}],
			roads: {
				main: 'Street',
				second: '',
				third: {
					
				},
				forth: {
					fifth: {
						sixth: {
							seventh: {
								eighth: {
									ninth: {
									
									}
								}
							}	
						}
					}
				}
			}
		}
	};
	
	
	
console.log(obj.purgo());
