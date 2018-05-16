# salvus

[![Greenkeeper badge](https://badges.greenkeeper.io/aichholzer/salvus.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/aichholzer/salvus.svg?branch=master)](https://travis-ci.org/aichholzer/salvus)
[![Dependency status](https://gemnasium.com/badges/github.com/aichholzer/roli.svg)](https://gemnasium.com/github.com/aichholzer/roli)
[![Downloads](https://img.shields.io/npm/dt/salvus.svg)](https://www.npmjs.com/package/salvus)
[![Always useful](https://img.shields.io/badge/always-useful-green.svg)](https://github.com/aichholzer/salvus)

```
Tu ne cede malis sed contra audentior ito.
```

Safely `set`, `get` and `remove` any property, in any object.

Say goodbye to those (ugly and unfriendly) `undefined` exceptions and having to probe multiple properties to get what you actually want. Let `salvus` handle it for you.

The default usage, `require('salvus')`, will bind `salvus` to your application's objects as a prototype, making it available everywhere.


### Install
```
npm install --save salvus
```


### Default use

```
require('salvus');

const soldier = {
  name: 'Persephone',
  age: 23
};

soldier.lego('name');
// Persephone

soldier.lego('contact.address.city');
// undefined

soldier.noto('contact.address.city:Rome');
// soldier is now
// {
     name: 'Persephone',
     age: 23,
     contact: {
       address: {
         city: 'Rome'
       }
     }
   }

soldier.noto(['wars.fought:100', 'wars.won:97']);
// soldier is now
// {
     name: 'Persephone',
     age: 23,
     contact: {
       address: {
         city: 'Rome'
       }
     },
     wars: {
       fought: 100,
       won: 97
     }
   }
```

* `{}.noto(string || array)` - The property to be written and it's value. Provide an array if setting multiple properties at once.

* `{}.lego(property [, refer, strict, identifier])` - The property to read.
    * `refer` (boolean) Identify undefined properties. Default: `false`.
    * `strict` (boolean) Only return set values. Default: `false`.
    * `identifier` (string) Prepend a custom identifier to undefined properties (`refer` must be set to `true`). Default: `!!`.

* `{}.erado(string || array)` - Properties to delete.

* `{}.purgo()` - Purge the object: `''`, `undefined`, `null`, `{}` and `[]` will be removed.


### Function use

```
cons salvus = require('salvus/lib/io');
const soldier = {
  name: 'Persephone',
  age: 23
};

salvus.lego(soldier, 'name');
// Persephone

salvus.lego(soldier, 'contact.address.city');
// undefined

salvus.noto(soldier, 'contact.address.city:Rome');
// soldier is now
// {
     name: 'Persephone',
     age: 23,
     contact: {
       address: {
         city: 'Rome'
       }
     }
   }

salvus.noto(soldier, ['wars.fought:100', 'wars.won:97']);
// soldier is now
// {
     name: 'Persephone',
     age: 23,
     contact: {
       address: {
         city: 'Rome'
       }
     },
     wars: {
       fought: 100,
       won: 97
     }
   }
```

* `salvus.noto(object, string || array)` - The property to be written and it's value. Provide an array if setting multiple properties at once.

* `salvus.lego(object, property [, refer, strict, identifier])` - The property to read.
    * `refer` (boolean) Identify undefined properties. Default: `false`.
    * `strict` (boolean) Only return set values. Default: `false`.
    * `identifier` (string) Prepend a custom identifier to undefined properties (`refer` must be set to `true`). Default: `!!`.

* `salvus.erado(object string || array)` - Properties to delete.

* `salvus.purgo(object)` - Purge the object: `''`, `undefined`, `null`, `{}` and `[]` will be removed.

The `object` parameter always represents the object being operated on.


### More examples

Take a look at the tests; `tests/index.js` and `tests/io.js`.


### Contribute
```
fork https://github.com/aichholzer/salvus/
```


### License

[MIT](https://github.com/aichholzer/salvus/blob/master/LICENSE)

```
Silentium est aureum.
```