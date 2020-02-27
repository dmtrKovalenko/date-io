# Benchmark comparison of all date libs

We have our [internal benchmark](https://github.com/dmtrKovalenko/date-io/tree/master/packages/benchmark/operations) comparing performance of date-libraries. **In node.js environment**.

Here is the latest (I hope) results:

### Only formatting dates

```
day-js x 8,215 ops/sec ±2.33% (86 runs sampled)
luxon x 8,503 ops/sec ±2.53% (85 runs sampled)
moment x 28,854 ops/sec ±2.96% (85 runs sampled)
date-fns x 11,998 ops/sec ±2.13% (88 runs sampled)

Fastest is moment
```

### Only calculations (add, subtract, etc.)

```
day-js x 13,968 ops/sec ±3.00% (84 runs sampled)
luxon x 7,384 ops/sec ±15.72% (78 runs sampled)
moment x 48,576 ops/sec ±1.14% (88 runs sampled)
date-fns x 68,049 ops/sec ±1.55% (88 runs sampled)

Fastest is date-fns
```

### Parsing

```
day-js x 11,725 ops/sec ±2.04% (62 runs sampled)
luxon x 8,145 ops/sec ±2.60% (83 runs sampled)
moment x 15,614 ops/sec ±1.44% (84 runs sampled)
date-fns x 31,447 ops/sec ±7.18% (81 runs sampled)

Fastest is date-fns
```
