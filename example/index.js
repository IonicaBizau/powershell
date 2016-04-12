"use strict";

const PowerShell = require("../lib");

// Start the process
let ps = new PowerShell("echo 'powershell is awesome'");

// Stdout
ps.on("output", function(data){
    console.log(data);
});

// Stderr
ps.on("error-output", function(data){
    console.error(data);
});

// End
ps.on("end", function(code) {
    // Do Something on end
});
