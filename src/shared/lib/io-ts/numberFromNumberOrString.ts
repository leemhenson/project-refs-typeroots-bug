import * as t from "io-ts";
import { NumberFromString } from "./numberFromString";

export const NumberFromNumberOrString = t.union([t.number, NumberFromString]);
export type NumberFromNumberOrString = t.TypeOf<typeof NumberFromNumberOrString>;
