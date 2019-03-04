# Benchmark comparison of all date libs

Here is latest (I suppose) results:

### Only formatting dates

```
day-js x 36,434 ops/sec ±1.75% (87 runs sampled)
luxon x 820 ops/sec ±1.44% (82 runs sampled)
moment x 144,180 ops/sec ±2.32% (83 runs sampled)
date-fns x 40,005 ops/sec ±1.84% (84 runs sampled)

Fastest is moment
```

### Only calculations (add, subtract, etc.)

```
day-js x 24,850 ops/sec ±0.72% (92 runs sampled)
luxon x 6,208 ops/sec ±2.81% (79 runs sampled)
moment x 38,042 ops/sec ±1.69% (84 runs sampled)
date-fns x 82,449 ops/sec ±1.19% (89 runs sampled)

Fastest is date-fns
```
