// @flow

export const throwErrorWhenNotSuccess = (fn: Function): ((item: any) => Promise<any>) => async (item) => {
  const result = await fn(item);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};
