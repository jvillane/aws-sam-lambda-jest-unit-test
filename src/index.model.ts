import {Callback} from "aws-lambda";

export interface BinaryEvent {
  number1: number
  number2: number
}

export interface Result {
  result: number
}

export type BinaryOperation = (number1: number, number2: number) => number;

export type BinaryOperationHandler = ({number1, number2}: BinaryEvent, context: any, callback: Callback<Result>) => void;
