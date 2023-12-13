export const Decrement = (Total: number, InputValue: number): number => {
  let NewTotal;
  NewTotal = Total - InputValue;
  return NewTotal;
};

export const Increment = (Total: number, InputValue: number): number => {
  let NewTotal;
  NewTotal = Total + InputValue;
  return NewTotal;
};
