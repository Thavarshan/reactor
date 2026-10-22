# Level 00: Modern JavaScript for React

Before any React, this level warms up the JavaScript that React code uses on
every line. There are no components here, just plain TypeScript functions
and their tests. If these ideas feel easy, great: move on quickly. If they
feel new, take your time, because every later level builds on them.

## Arrays without loops

React code turns arrays of data into things on screen. Instead of `for`
loops, it uses array methods that take a small function (a *callback*):

```ts
const prices = [500, 1200, 300];

prices.map((p) => p * 2);              // [1000, 2400, 600]
prices.filter((p) => p > 400);         // [500, 1200]
prices.reduce((sum, p) => sum + p, 0); // 2000
```

These methods never change the original array. They return something new.

## Don't change it, copy it

To *mutate* means to change something in place, like `user.name = "Bo"` or
`list.push(x)`. React expects you to leave old data alone and make a new
copy with the change in it. The spread operator `...` makes that easy:

```ts
const user = { name: "Ada", age: 36 };
const older = { ...user, age: 37 }; // a new object. `user` is unchanged.

const tags = ["a", "b"];
const more = [...tags, "c"];        // a new array. `tags` is unchanged.
```

Why does React care? It compares objects by *identity*: "is this the very
same object as last time?" A new object tells React that something changed.
The same object tells it nothing did:

```ts
const a = { x: 1 };
a === a;          // true: the same object
a === { x: 1 };   // false: looks the same, but it's a different object
```

So when you update nested data, you copy everything on the path down to the
change and reuse everything else. Exercise 3 practises exactly this.

## Functions that remember

A *closure* is a function that remembers the variables around it, even
after the outer function has finished:

```ts
function makeId() {
  let next = 1;
  return () => next++;
}

const id = makeId();
id(); // 1
id(); // 2   `next` was remembered
```

Every event handler you'll write inside a React component is a closure.

## Things that take time

A *promise* stands for a value that arrives later, like the answer to a
network request. `async` and `await` let you wait for it as if it were
normal step-by-step code:

```ts
async function load() {
  try {
    const user = await getUser(1); // pauses until the promise settles
    console.log(user.name);
  } catch (error) {
    console.log("It failed:", error);
  }
}
```

Timers (`setTimeout`) are another source of "later". In tests you don't want
to really wait, so you use *fake timers*. Time then only moves when the test
says so:

```ts
vi.useFakeTimers();
const spy = vi.fn();
setTimeout(spy, 1000);
vi.advanceTimersByTime(1000); // a whole second passes, instantly
expect(spy).toHaveBeenCalled();
```

## Exercises

1. **ex01_array_methods**: answer questions about a product list with map,
   filter, reduce, find, some and every.
2. **ex02_destructuring_and_spread**: update a user and a list without
   mutating them, and pull fields out with destructuring.
3. **ex03_nested_immutable_updates**: change a todo inside a list and cards
   inside a board, keeping unchanged parts as the very same objects.
4. **ex04_closures**: build `makeCounter`, `once` and `memoizeOne`.
5. **ex05_promises_and_async**: build `delay`, `withTimeout` and `retry`,
   and test them with fake timers.
6. **ex06_debounce_and_throttle**: limit how often a function runs, with a
   `cancel()` for debounce.
