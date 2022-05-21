- The code itself says a lot on which library to trust and use at the moment, how to get intelli sense, how to place set up for produce multiple output,... It might be worth to check the current status of webpack on these similar features too.

- rollup-plugin-peer-deps-external -> help automate making peer dependencies external
- rollup-plugin-typescript2 -> hardfork of the original, slower performance but print out ts syntactic and type error (for better debugging i guess)
- @zerollup/ts-transform-paths -> self-claimed to be most complete path rewriting transformer to use with tsc, a good alternative to tspath
- ttypescript -> allow for custom transformer right in the tsconfig.json . Without using it and have some alias path or reduced path in your code, it might lead to `Accessing non-existent property 'tracing' of module exports inside circular dependency` -> which is painful to debug. Use it in combination with two above to overcome the problem
