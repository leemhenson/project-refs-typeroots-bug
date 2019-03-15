import * as t from "io-ts";
import { NumberFromString } from "./numberFromString";

export class IntegerFromStringType extends t.Type<t.Int, string> {
  public readonly _tag: "IntegerFromString" = "IntegerFromString";

  constructor(outputRadix?: number) {
    super(
      "IntegerFromString",
      t.Int.is,
      (u, c) => NumberFromString.validate(u, c).chain(n => t.Int.validate(n, c)),
      i => i.toString(outputRadix),
    );
  }
}

export const IntegerFromString = new IntegerFromStringType();
export type IntegerFromString = t.TypeOf<typeof IntegerFromString>;
