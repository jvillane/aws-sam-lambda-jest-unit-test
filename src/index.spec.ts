import {addition, division, multiplication, subtraction} from "./index";

it('Sums 2 numbers', async() => {
  const number1 = 3, number2 = 2, callback = jest.fn();
  await addition({number1, number2}, {}, callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][1].result).toBe(number1 + number2);
})

it('Substracts 2 numbers', async() => {
  const number1 = 3, number2 = 2, callback = jest.fn();
  await subtraction({number1, number2}, {}, callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][1].result).toBe(number1 - number2);
})

it('Multiply 2 numbers', async() => {
  const number1 = 3, number2 = 2, callback = jest.fn();
  await multiplication({number1, number2}, {}, callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][1].result).toBe(number1 * number2);
})

it('Divide 2 numbers', async() => {
  const number1 = 3, number2 = 2, callback = jest.fn();
  await division({number1, number2}, {}, callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][1].result).toBe(number1 / number2);
})

it('Handles division by zero', async() => {
  const number1 = 3, number2 = 0, callback = jest.fn();
  await division({number1, number2}, {}, callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][0]).toBe("DIVISION_BY_0");
})
