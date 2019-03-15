import * as t from "io-ts";

export class NumberFromStringType extends t.Type<number, string> {
  public readonly _tag: "NumberFromString" = "NumberFromString";

  constructor(outputRadix?: number) {
    super(
      "NumberFromString",
      t.number.is,
      (u, c) =>
        t.string.validate(u, c).chain(s => {
          const n = Number(s);

          return isNaN(n) ? t.failure(s, c) : t.success(n);
        }),
      n => n.toString(outputRadix),
    );
  }
}

export const NumberFromString = new NumberFromStringType();
export type NumberFromString = t.TypeOf<typeof NumberFromString>;
