## Documentation

You can see below the API reference of this module.

### `PowerShell(input, opt, cb)`

#### Params
- **String** `input`: The command or PowerShell script ro execute.
- **Object** `opt`: An object containing the following fields:
 - `debug` (Boolean): Turn on/off the debug messages (default: `false`).
 - `noprofile` (Boolean): Turn on/off noprofile parameter (default: `true`).
 - `executionpolicy` (Enum): Run powershell with specified executionpolicy (default: System default). Valid enum values are `Restricted`, `AllSigned`, `RemoteSigned`, `Unrestricted`, `Bypass`, `Undefined`.
- **Function** `cb`: The callback function (optional).

