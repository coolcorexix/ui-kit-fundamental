- main prop in package.json is used for CJS entry point
- module prop in package.json is used for ESM entry point
- isolateModule ensure that every file is a module with import/export mentioned. 
```
// ref: https://www.typescriptlang.org/docs/handbook/modules.html
In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).
```
- jsx define how the output of those file .tsx will look like
- noPropertyAccessFromIndexSignature force dev to use obj["key"] instead of obj.key for arbitrary props without known up-front value
- forceConsistentCasingInFileName apply case-sensitive import accross dev's devices
- module, ref: https://www.typescriptlang.org/tsconfig#module
- target, ref: https://www.typescriptlang.org/tsconfig#target
- Difference between module and target: while module is to specified which runtime environment to run the code on, target is which JS version for the tsc to compile into. I gonna need to double-check this with a pro or do a further lab test myself.
- moduleResolution have 2 typical options: node or classic. while classic find path like in a file system, node options file module with props registered in package.json


