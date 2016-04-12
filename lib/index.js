"use strict";

const isUndefined = require("is-undefined")
    , EventEmitter = require("events").EventEmitter
    , spawn = require("spawno")
    ;

const MODULE_NAME = "powershell";

module.exports = class PowerShell extends EventEmitter {
    /**
     * PowerShell
     *
     * @name PowerShell
     * @function
     * @param {String} cmdlets The command or PowerShell script ro execute.
     * @param {Object} opt An object containing the following fields:
     *
     *  - `debug` (Boolean): Turn on/off the debug messages (default: `false`).
     * @param {Function} cb The callback function (optional).
     */
    constructor (cmdlets, opt, cb){

        let _run = cmdlets;

        opt = opt || {};
        opt.debug = isUndefined(opt.debug) ? false : opt.debug;

        let _proc = spawno(
            "powershell.exe"
          , ["-command", "& {" + run + "}"]
          , { stdio: ["ignore", "pipe", "pipe" ] }
          , cb
        );

        _proc.stdout.setEncoding("utf8");
        _proc.stderr.setEncoding("utf8");

        if(opt.debug){
            console.log(`<${MODULE_NAME}> Starting ${_proc.pid} on ${process.platform}`);
        }

        _proc.stdout.on("data", data => this.emit("output", data));
        _proc.stderr.on("data", err => this.emit("error-output", err));
        _proc.on("close", code => {
            if(opt.debug) {
                console.log(`<${MODULE_NAME}> Process ${_proc.pid} exited with code ${code}`);
            }

            this.emit("end", code);
        });
    }
};

module.exports = Shell;
