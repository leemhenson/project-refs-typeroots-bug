import * as t from "io-ts";
import { NonEmptyString } from "./nonEmptyString";
import { unsafeAssertIsType } from "../assertions";

export interface ProductIdBrand {
  readonly ProductId: unique symbol;
}

export const ProductId = t.brand(
  NonEmptyString,
  (_s): _s is t.Branded<NonEmptyString, ProductIdBrand> => true,
  "ProductId",
);

export type ProductId = t.TypeOf<typeof ProductId>;

export const unsafeAssertIsProductId = unsafeAssertIsType(ProductId);
