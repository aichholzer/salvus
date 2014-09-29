<div align="center" style="margin:30px 0 40px">
	<img src="http://www.analogbird.com/static/img/playground/salvusjs.png"/>
</div>


Salvus
=========
```
Tu ne cede malis sed contra audentior ito.
```

Safely `set`, `get` and `remove` any property, in any object. *Anywhere.*


### API

 * **.noto(string)** - Property (and value) to be written, in the form: `property:value`. Nested properties are also allowed (take a look at the examples)
 
 * **.lego(string [, refer, strict, identifier])** - Property's value to read. Use `refer` (boolean) to identify undefined properties (Defaults to `false`). Use `strict` (boolean) to only return set values (Defaults to `false`). Use `identifier` (string) to prepend a custom identifier to identified undefined propertoes (`refer` must be set to `true`. Defaults to `!!`).
 
 * **.erado(string | array [, root])** - Properties to delete. Use `root` to also remove the root element if it is empty. (Defaults to `false`)
 
 * **.purgo()** - Purge the object; `''`, `undefined`, `null`, `{}` and `[]` will be deleted.


### Examples

####.noto() 

```
One property and its value

var obj = {
	'name': 'Salvus'
};

obj.noto('age:21');
// => {
	'name': 'Salvus',
	'age': 21
}
```

```
Nested properties and a value

var obj = {
	'name': 'Salvus'
};

obj.noto('adress.city:Rome');
// => {
	'name': 'Salvus',
	'address': {
		'city': 'Rome'
	}
}
```

```
Multiple nested properties and values

var obj = {
	'name': 'Salvus'
};

obj.noto('adress{city:Rome,street:Circus avenue,zipCode:78BC}');
// => {
	'name': 'Salvus',
	'address': {
		'city': 'Rome',
		'street': 'Circus avenue',
		'zipCode': '78BC'
	}
}
```

####.lego() 

```
var obj = {
	'name': 'Salvus',
	'age: '21',
	'address: {
		'city': 'Rome',
		'street: 'Circus avenue',
		'zipCode': '78BC',
		'location': null
	}
};

obj.lego('name');
// => Salvus

obj.lego('address.city');
// => Rome

obj.lego('address.country.code');
// => undefined

obj.lego('address.country.code', true);
// => !!country

obj.lego('address.country.code', true, false, 'NA_');
// => NA_country

obj.lego('address.location');
// => null

obj.lego('address.location', false, true);
// => undefined
```

####.erado() 

```
var obj = {
	'name': 'Salvus',
	'age: '21',
	'address: {
		'city': 'Rome',
		'street: 'Circus avenue',
		'zipCode': '78BC'
	}
};

obj.erado(['age', 'address.street', 'address.zipCode']);
// => {
	'name': 'Salvus',
	'address': {
		'city': 'Rome'
	}
}
```

####.purgo() 

```
var obj = {
	'name': 'Salvus',
	'age: '',
	'address: {
		'city': 'Rome',
		'street: '',
		'zipCode': ''
	}
};

obj.purgo();
// => {
	'name': 'Salvus',
	'address': {
		'city': 'Rome'
	}
}
```



### License (MIT)

Copyright (c) 2014 Stefan Aichholzer <theaichholzer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
