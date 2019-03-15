import * as t from "io-ts";
import { BooleanFromString } from "./booleanFromString";

export const BooleanFromBooleanOrString = t.union([t.boolean, BooleanFromString]);
export type BooleanFromBooleanOrString = t.TypeOf<typeof BooleanFromBooleanOrString>;
