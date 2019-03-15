import * as array from "fp-ts/lib/Array";
import * as t from "io-ts";

// Copy-pasta from here, as OliverJAsh's is a few versions behind:
// https://github.com/OliverJAsh/io-ts-reporters/blob/master/src/index.ts

const jsToString = (value: t.mixed) => (value === undefined ? "undefined" : JSON.stringify(value));

export const formatValidationError = (error: t.ValidationError) => {
  const path = error.context
    .map(c => c.key)
    // The context entry with an empty key is the original type ("default
    // context"), not an type error.
    .filter(key => key.length > 0)
    .join(".");

  // The actual error is last in context
  const maybeErrorContext = array.last(
    // https://github.com/gcanti/fp-ts/pull/544/files
    error.context as t.ContextEntry[],
  );

  return maybeErrorContext.map(errorContext => {
    const expectedType = errorContext.type.name;
    return (
      // https://github.com/elm-lang/core/blob/18c9e84e975ed22649888bfad15d1efdb0128ab2/src/Native/Json.js#L199
      // tslint:disable-next-line:prefer-template
      `Expecting ${expectedType}` +
      (path === "" ? "" : ` at ${path}`) +
      ` but instead got: ${jsToString(error.value)}.`
    );
  });
};

export const formatValidationErrors = (errors: t.Errors) =>
  array.catOptions(errors.map(formatValidationError)).join("\n");
