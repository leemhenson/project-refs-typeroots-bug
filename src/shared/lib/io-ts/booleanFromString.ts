import * as t from "io-ts";

export const FalseStringRegExp = /^false$/i;
export const TrueStringRegExp = /^true$/i;

export class BooleanFromStringType extends t.Type<boolean, string> {
  public readonly _tag: "BooleanFromString" = "BooleanFromString";

  constructor() {
    super(
      "BooleanFromString",
      t.boolean.is,
      (u, c) =>
        t.string.validate(u, c).chain(s => {
          if (FalseStringRegExp.test(s)) {
            return t.success(false);
          }

          if (TrueStringRegExp.test(s)) {
            return t.success(true);
          }

          return t.failure(s, c);
        }),
      b => `${b}`,
    );
  }
}

export const BooleanFromString = new BooleanFromStringType();
export type BooleanFromString = t.TypeOf<typeof BooleanFromString>;
