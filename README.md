<div align="center" style="margin:30px 0 40px">
	<img src="http://www.analogbird.com/static/img/playground/salvusjs.png"/>
</div>


Salvus
=========
```
Tu ne cede malis sed contra audentior ito.
```

[![Build Status](https://travis-ci.org/SalvusJS/Salvus.svg)](https://travis-ci.org/SalvusJS/Salvus)

Safely `set`, `get` and `remove` any property, in any object. *Anywhere.*
Say goodbye to those (ugly and unfriendly) `undefined` exceptions and having to probe multiple properties to get what you actually want. Let `Salvus` handle it for you.


### API

 * **.noto(string | array)** - Property (and value) to be written, in the form: `property:value`. Nested properties are also allowed (take a look at the examples)

 * **.lego(string [, refer, strict, identifier])** - Property's value to read. Use `refer` (boolean) to identify undefined properties (Defaults to `false`). Use `strict` (boolean) to only return set values (Defaults to `false`). Use `identifier` (string) to prepend a custom identifier to identified undefined propertoes (`refer` must be set to `true`. Defaults to `!!`).

 * **.erado(string | array)** - Properties to delete.

 * **.purgo()** - Purge the object; `''`, `undefined`, `null`, `{}` and `[]` will be removed.
 
 * **.applico()** - Attach Salvus' methods as object's prototypes.


### Examples

Take a look at the `examples` in the `test` folder.
You are also welcome to run `npm test`



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


`Silence is golden.`
