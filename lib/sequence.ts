export const sequence = (
  steps: Array<() => void>,
  errorFn: ((e: unknown) => void) | undefined = console.error,
  finallyFn?: (() => void) | undefined
): Promise<void> => {
  return steps.reduce((promise, method) => {
    return promise
      .then(() => method())
      .catch(errorFn)
      .finally(finallyFn);
  }, Promise.resolve());
};
