import { Decrement, Increment } from "./CalculateSum";

test("Decrement 測試", () => {
  expect(Decrement(1, 1)).toBe(0);
  expect(Decrement(1, 0)).toBe(1);
  expect(Decrement(1, -1)).toBe(2);
  expect(Decrement(0, 1)).toBe(-1);
  expect(Decrement(0, 0)).toBe(0);
  expect(Decrement(0, -1)).toBe(1);
  expect(Decrement(-1, 1)).toBe(-2);
  expect(Decrement(-1, 0)).toBe(-1);
  expect(Decrement(-1, -1)).toBe(0);
});

test("Increment 測試", () => {
  expect(Increment(1, 1)).toBe(2);
  expect(Increment(1, 0)).toBe(1);
  expect(Increment(1, -1)).toBe(0);
  expect(Increment(0, 1)).toBe(1);
  expect(Increment(0, 0)).toBe(0);
  expect(Increment(0, -1)).toBe(-1);
  expect(Increment(-1, 1)).toBe(0);
  expect(Increment(-1, 0)).toBe(-1);
  expect(Increment(-1, -1)).toBe(-2);
});
