import * as t from "io-ts";
import { IntegerFromString } from "./integerFromString";

export const IntegerFromIntegerOrString = t.union([t.Int, IntegerFromString]);
export type IntegerFromIntegerOrString = t.TypeOf<typeof IntegerFromIntegerOrString>;
