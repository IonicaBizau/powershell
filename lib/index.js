"use strict";

const isUndefined = require("is-undefined")
    , EventEmitter = require("events").EventEmitter
    , spawn = require("spawno")
    , isWin = require("is-win")
    ;

module.exports = class PowerShell extends EventEmitter {
    /**
     * PowerShell
     *
     * @name PowerShell
     * @function
     * @param {String} input The command or PowerShell script ro execute.
     * @param {Object} opt An object containing the following fields:
     *
     *  - `debug` (Boolean): Turn on/off the debug messages (default: `false`).
     *  - `noprofile` (Boolean): Turn on/off noprofile parameter (default: `true`).
     *  - `executionpolicy` (Enum): Run powershell with specified executionpolicy (default: System default). Valid enum values are `Restricted`, `AllSigned`, `RemoteSigned`, `Unrestricted`, `Bypass`, `Undefined`.
     *  - `PSCore` (Boolean) : Turn on/off 'pwsh' the executable for PowerShell Core as opposed to Windowes PowerShell (default: 'false').
     * 
     * @param {Function} cb The callback function (optional).
     */
    constructor (input, opt, cb){
        super();

        opt = opt || {};
        opt.debug = isUndefined(opt.debug) ? false : opt.debug;
        opt.noprofile = isUndefined(opt.noprofile) ? true : opt.noprofile;
        opt.PSCore = isUndefined(opt.PSCore) ? false : opt.PSCore;
        const EXE_NAME = `${opt.PSCore?'pwsh':'powershell'}${isWin() ? ".exe" : ""}`;
        let args = [];

        if (opt.noprofile) {
            args.push("-NoProfile");
        }

        if (!isUndefined(opt.executionpolicy)) {
            args.push("-ExecutionPolicy", opt.executionpolicy);
        }

        args.push("-Command", "& {" + input + "}");

        let _proc = this.proc = spawn(
            EXE_NAME
          , args
          , { stdio: ["ignore", "pipe", "pipe" ] }
          , cb
        );

        _proc.stdout.setEncoding("utf8");
        _proc.stderr.setEncoding("utf8");
        _proc.on("error", err => this.emit("error", err));

        if (opt.debug){
            console.log(`<${EXE_NAME}> Starting ${_proc.pid} on ${process.platform}`);
        }

        let chunks = [];

        _proc.stdout.on("data", chunk => {
            if (typeof chunk === "string") {
                chunks.push(chunk);
            } else {
                chunks.push.apply(chunks, chunk);
            }
        });

        _proc.stderr.on("data", err => this.emit("error-output", err));
        _proc.on("close", code => {
            if (opt.debug) {
                console.log(`<${EXE_NAME}> Process ${_proc.pid} exited with code ${code}`);
            }
            this.emit("output", chunks.join(""))
            this.emit("end", code);
        });
    }
};
