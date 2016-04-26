
# powershell [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/powershell.svg)](https://www.npmjs.com/package/powershell) [![Downloads](https://img.shields.io/npm/dt/powershell.svg)](https://www.npmjs.com/package/powershell) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Run PowerShell scripts and commands from Node.js.

## Why?

 - Actively maintained
 - Improved codebase.
 - Written in ES2015


## :cloud: Installation

```sh
$ npm i --save powershell
```


## :clipboard: Example



```js
const PowerShell = require("powershell");

// Start the process
let ps = new PowerShell("echo 'powershell is awesome'");

// Handle process errors (e.g. powershell not found)
ps.on("error", err => {
    console.error(err);
});

// Stdout
ps.on("output", data => {
    console.log(data);
});

// Stderr
ps.on("error-output", data => {
    console.error(data);
});

// End
ps.on("end", code => {
    // Do Something on end
});
```

## :memo: Documentation


### `PowerShell(input, opt, cb)`

#### Params
- **String** `input`: The command or PowerShell script ro execute.
- **Object** `opt`: An object containing the following fields:
 - `debug` (Boolean): Turn on/off the debug messages (default: `false`).
- **Function** `cb`: The callback function (optional).



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :cake: Thanks
This module is heavily based on [`node-powershell`](https://github.com/rannn505/node-powershell) by [@rann505](https://github.com/rannn505/).


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
