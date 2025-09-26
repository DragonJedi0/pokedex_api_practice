import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "I learned something!",
    expected: ["i", "learned", "something!"],
  }
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    // The `expect` and `toHaveLength` functions are from vitest
    // they will fail the test if the condition is not met
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "noretestdata",
    interval: 1000,
  },
])("Testing Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});