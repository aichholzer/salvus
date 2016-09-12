# salvus
```
Tu ne cede malis sed contra audentior ito.
```

[![Build Status](https://travis-ci.org/aichholzer/salvus.svg?branch=master)](https://travis-ci.org/aichholzer/salvus)
[![Dependency status](https://gemnasium.com/badges/github.com/aichholzer/roli.svg)](https://gemnasium.com/github.com/aichholzer/roli)
[![Downloads](https://img.shields.io/npm/dt/salvus.svg)](https://www.npmjs.com/package/salvus)
[![Always useful](https://img.shields.io/badge/always-useful-green.svg)](https://github.com/aichholzer/salvus)

Safely `set`, `get` and `remove` any property, in any object.


### Install
```
npm install -s salvus
```


### Use


Say goodbye to those (ugly and unfriendly) `undefined` exceptions and having to probe multiple properties to get what you actually want. Let `salvus` handle it for you.
The default usage; `require('salvus')` will bind `salvus` to your application's objects as a prototype.


### API (As prototype)

```
require('salvus');

const object = {
  name: 'soldier'
};

object.lego('name');

// 'soldier'
```

 * **{}.noto(string | array)** - Property (and value) to be written, in the form: `property:value`. Nested properties are also allowed (take a look at the examples)

 * **{}.lego(string [, refer, strict, identifier])** - Property's value to read. Use `refer` (boolean) to identify undefined properties (Defaults to `false`). Use `strict` (boolean) to only return set values (Defaults to `false`). Use `identifier` (string) to prepend a custom identifier to identified undefined properties (`refer` must be set to `true`. Defaults to `!!`).

 * **{}.erado(string | array)** - Properties to delete.

 * **{}.purgo()** - Purge the object; `''`, `undefined`, `null`, `{}` and `[]` will be removed.


### API (As exported function)

```
cons salvus = require('salvus/lib/io');
const object = {
  name: 'soldier'
};

salvus.lego(object, 'name');

// 'soldier'
```

 * salvus.noto(object, string || array)** - Property (and value) to be written, in the form: `property:value`. Nested properties are also allowed (take a look at the examples)

 * salvus.lego(object, string [, refer, strict, identifier])** - Property's value to read. Use `refer` (boolean) to identify undefined properties (Defaults to `false`). Use `strict` (boolean) to only return set values (Defaults to `false`). Use `identifier` (string) to prepend a custom identifier to identified undefined properties (`refer` must be set to `true`. Defaults to `!!`).

 * salvus.erado(object, string || array)** - Properties to delete.

 * salvus.purgo(object)** - Purge the object; `''`, `undefined`, `null`, `{}` and `[]` will be removed.


### Examples

Take a look at the `test`, there are quite a few example cases.


### Contribute
```
fork https://github.com/aichholzer/salvus/
```


### License

[MIT](https://github.com/aichholzer/salvus/blob/master/LICENSE)

```
Silentium est aureum.
```