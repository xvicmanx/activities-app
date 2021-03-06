// @flow

type Direction = 'ascending' | 'descending';

type Rule = {};

export type Options = {
  activePage: number,
  itemsPerPage: number,
  sort: {
    field: string,
    direction: Direction,
  },
  queryRules: Array<Rule>,
};

export type Result = {
  items: Array<Object>,
  total: number,
};

export const encode = (target: Object): string =>
  Buffer.from(JSON.stringify(target)).toString('base64');

export const DEFAULT_OPTIONS: Options = {
  activePage: 1,
  itemsPerPage: 20,
  sort: {
    field: 'id',
    direction: 'descending',
  },
  queryRules: [],
};

export const DEFAULT_RESULT: Result = {
  total: 0,
  items: [],
};

export const throwErrorWhenNotSuccess = (
  fn: Function
): ((item: any) => Promise<any>) => async (item) => {
  const result = await fn(item);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};

export const showMobileMenu = (): boolean =>
  window.location.pathname.includes('display-menu');
