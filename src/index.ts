import {BinaryOperation, BinaryOperationHandler} from "./index.model";

function apply(operation: BinaryOperation, number1: number, number2: number): Promise<number> {
  return new Promise<number>(
    resolve => setTimeout(() => resolve(operation(number1, number2)), 1000)
  );
}

const additionFn: BinaryOperation = (number1: number, number2: number) => (number1 + number2);
const subtractionFn: BinaryOperation = (number1: number, number2: number) => (number1 - number2);
const multiplicationFn: BinaryOperation = (number1: number, number2: number) => (number1 * number2);
const divisionFn: BinaryOperation = (number1: number, number2: number) => (number1 / number2);

export const addition: BinaryOperationHandler = async ({number1, number2}, context, callback) => {
  const result = await apply(additionFn, number1, number2);
  callback(null, {result});
}

export const subtraction: BinaryOperationHandler = async ({number1, number2}, context, callback) => {
  const result = await apply(subtractionFn, number1, number2);
  callback(null, {result});
}

export const multiplication: BinaryOperationHandler = async ({number1, number2}, context, callback) => {
  const result = await apply(multiplicationFn, number1, number2);
  callback(null, {result});
}

export const division: BinaryOperationHandler = async ({number1, number2}, context, callback) => {
  if (number2 === 0) {
    callback("DIVISION_BY_0");
    return;
  }
  const result = await apply(divisionFn, number1, number2);
  callback(null, {result});
}
