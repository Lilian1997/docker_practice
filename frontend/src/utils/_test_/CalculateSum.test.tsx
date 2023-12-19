import { decrement, increment } from "../calculateSum";

test("decrement 測試", () => {
  expect(decrement(1, 1)).toBe(0);
  expect(decrement(1, 0)).toBe(1);
  expect(decrement(1, -1)).toBe(2);
  expect(decrement(0, 1)).toBe(-1);
  expect(decrement(0, 0)).toBe(0);
  expect(decrement(0, -1)).toBe(1);
  expect(decrement(-1, 1)).toBe(-2);
  expect(decrement(-1, 0)).toBe(-1);
  expect(decrement(-1, -1)).toBe(0);
});

test("increment 測試", () => {
  expect(increment(1, 1)).toBe(2);
  expect(increment(1, 0)).toBe(1);
  expect(increment(1, -1)).toBe(0);
  expect(increment(0, 1)).toBe(1);
  expect(increment(0, 0)).toBe(0);
  expect(increment(0, -1)).toBe(-1);
  expect(increment(-1, 1)).toBe(0);
  expect(increment(-1, 0)).toBe(-1);
  expect(increment(-1, -1)).toBe(-2);
});
