# The turtle calculator (aka aws-sam-lambda-jest-unit-test)
A simple example (inspired on the most basic calculator API) using:

- TypeScript + Node for lambda implementation
- TypeScript + Jest for unit testing 
- API Gateway + OpenAPI/Swagger integration for API validation
- AWS SAM for infrastructure templating

## Requirements

- Node + NPM
- aws-cli (installed and configured)
- aws-sam-cli

## Deployment

There's a sh file called `deploy.sh` meant to be used for infrastructure creating/updating:

`sh deploy.sh <STACK_NAME> <S3_BUCKET>`

Where:

- `STACK_NAME` is the name of the stack
- `S3_BUCKET` refers to an existing S3 bucket where the OpenAPI definition is going to be upload

## The Result

An API whose Url can be obtained on the CloudFormation stack outputs (`ApiUrl`) with 4 endpoints:

- `/addition/{number1}/{number2}`: for **addition** of `number1` and `number2`.
- `/subtraction/{number1}/{number2}`: for **subtraction** of `number1` and `number2`.
- `/multiplication/{number1}/{number2}`: for **multiplication** of `number1` and `number2`.
- `/division/{number1}/{number2}`: for **division** of `number1` and `number2`. It handles the error generated when `number2` is zero.

The execution of the math operation takes more than 1 second for pure only academic purposes, by using a ´setTimeout´ call:

```typescript
function apply(operation: BinaryOperation, number1: number, number2: number): Promise<number> {
  return new Promise<number>(
    resolve => setTimeout(() => resolve(operation(number1, number2)), 1000)
  );
}
```
