var s = require('/Users/stefan.aichholzer/Development/Contributions/Salvus/lib/salvus'),
	obj = {
		name: 'Ice'
	};
	

//console.log(obj.noto('age:35'));
//console.log(obj.noto('a.b[a:2,c:3,name:pepe]'));
//console.log(obj.noto('a.b(a:2,c:3,name:pepe)'));
//console.log(obj.noto('a.b{a:2,c:3,name:pepe}'));


var s = 'a.b{a:2,c:3,name:pepe}'.match(/\[([^\]]+)]|\(([^)]+)\)|{([^}]+)}/);

console.log(s);