export default function parseError(e: any | unknown) {

  if (e instanceof EvalError) {

    const error: EvalError = e
    // Creates an instance representing an error that occurs regarding the global function eval().
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, EvalError }

  } else if (e instanceof RangeError) {

    const error: RangeError = e
    // Creates an instance representing an error that occurs when a numeric variable or parameter is outside its valid range.
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, RangeError }

  } else if (e instanceof ReferenceError) {

    const error: ReferenceError = e
    // Creates an instance representing an error that occurs when de-referencing an invalid reference.
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, ReferenceError }

  } else if (e instanceof SyntaxError) {

    const error: SyntaxError = e
    // Creates an instance representing a syntax error.
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, SyntaxError }

  } else if (e instanceof TypeError) {

    const error: TypeError = e
    // Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, TypeError }

  } else if (e instanceof URIError) {

    const error: URIError = e
    // Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters.
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, URIError }

  } else if (e instanceof AggregateError) {

    const error: AggregateError = e
    // Creates an instance representing several errors wrapped in a single error when multiple errors need to be reported by an operation, for example by Promise.any().
    console.error(` \u{2715} ${error.name}: ${error.message}`)
    return { error, ...error, AggregateError }
  }
  else {
    const error: Error = e
    // If none of our cases matched leave the Error unhandled
    return { error, ...error, Error }
  }

}

// InternalError Non-standard
// Creates an instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g. "too much recursion".
