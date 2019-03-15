import { identity } from "fp-ts/lib/function";
import { Either, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

export const assertIsNotNull = <A>(value: A | null): Either<Error, A> => {
  if (value === null) {
    return left(new Error("Not-null assertion failed."));
  }

  return right(value);
};

export const unsafeAssertIsNotNull = <A>(value: A | null): A =>
  assertIsNotNull(value).fold(err => {
    throw err;
  }, identity);

export const unsafeAssertIsRight = <L, A>(value: Either<L, A>, context: {} = {}) =>
  value.fold(() => {
    const contextStr = JSON.stringify(context);
    const inline = contextStr === "{}" ? "" : ` Context: ${contextStr}`;
    throw new Error(`Right assertion failed.${inline}`);
  }, identity);

export const unsafeAssertNever = (_: never): never => {
  throw new Error("Never assertion failed.");
};

export const unsafeAssertIsType = <A, O, I>(type: t.Type<A, O, I>) => (value: unknown): A => {
  if (type.is(value)) {
    return value;
  }

  throw new Error("Type assertion failed.");
};
