import { Decrement, Increment } from "./CalculateSum";

test("Decrement 測試", () => {
  expect(Decrement(100, 20)).toBe(80);
  expect(Decrement(100, 0)).toBe(100);
});

test("Increment 測試", () => {
  expect(Increment(100, 20)).toBe(120);
  expect(Increment(100, 0)).toBe(100);
});
