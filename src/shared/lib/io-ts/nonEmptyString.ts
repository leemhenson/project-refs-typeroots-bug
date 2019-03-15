import * as t from "io-ts";
import { unsafeAssertIsType } from "../assertions";

export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol;
}

export const NonEmptyStringRegExp = /\S/;

export const NonEmptyString = t.brand(
  t.string,
  (s): s is t.Branded<string, NonEmptyStringBrand> => NonEmptyStringRegExp.test(s),
  "NonEmptyString",
);

export type NonEmptyString = t.TypeOf<typeof NonEmptyString>;

export const unsafeAssertIsNonEmptyString = unsafeAssertIsType(NonEmptyString);
