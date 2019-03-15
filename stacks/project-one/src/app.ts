import * as t from "io-ts";
import { BooleanFromBooleanOrString } from "@shared/lib/io-ts/booleanFromBooleanOrString";
import { IntegerFromIntegerOrString } from "@shared/lib/io-ts/integerFromIntegerOrString";
import { ProductId } from "@shared/lib/io-ts/productId";
import { formatValidationErrors } from "@shared/lib/io-ts/reporter";

export const Environment = t.type({
  verbose: BooleanFromBooleanOrString,
  rows: IntegerFromIntegerOrString,
  productId: ProductId
});

export type Environment = t.TypeOf<typeof Environment>;

Environment.decode(process.env)
  .mapLeft(formatValidationErrors)
  .fold(console.error, console.log)
