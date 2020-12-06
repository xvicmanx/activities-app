// @flow

import Sequelize from 'sequelize';

const { Op } = Sequelize;

type Direction = 'ascending' | 'descending';
type Rule = {
  field: string,
};

export type Options = {
  activePage?: number,
  itemsPerPage?: number,
  sort?: {
    field: string,
    direction: Direction,
  },
  queryRules?: Array<Rule>,
  paginate?: boolean,
};

const CONDITIONS = {
  CONTAINS: {
    operator: Op.like,
    transformer: (x) => `%${x}%`,
  },
  EQUALS_TO: {
    operator: Op.eq,
    transformer: (x) => x,
  },
  IN: {
    operator: Op.in,
    transformer: (x) => {
      if (typeof x === 'string') {
        return x.includes(',') ? JSON.parse(`[${x}]`) : [x];
      }

      return x;
    },
  },
  BEGINS_WITH: {
    operator: Op.like,
    transformer: (x) => `${x}%`,
  },
  ENDS_WITH: {
    operator: Op.like,
    transformer: (x) => `%${x}`,
  },
  DOES_NOT_CONTAIN: {
    operator: Op.notLike,
    transformer: (x) => `%${x}%`,
  },
  IS_NOT_EQUAL_TO: {
    operator: Op.ne,
    transformer: (x) => x,
  },
  DOES_NOT_BEGIN_WITH: {
    operator: Op.notLike,
    transformer: (x) => `${x}%`,
  },
  DOES_NOT_END_WITH: {
    operator: Op.notLike,
    transformer: (x) => `%${x}`,
  },
  LESS_THAN: {
    operator: Op.lt,
    transformer: (x) => x,
  },
  GREATER_THAN: {
    operator: Op.gt,
    transformer: (x) => x,
  },
  IS_NOT_LESS_THAN: {
    operator: Op.gte,
    transformer: (x) => x,
  },
  IS_NOT_GREATER_THAN: {
    operator: Op.lte,
    transformer: (x) => x,
  },
  LESS_OR_EQUALS_THAN: {
    operator: Op.lte,
    transformer: (x) => x,
  },
  GREATER_OR_EQUALS_THAN: {
    operator: Op.gte,
    transformer: (x) => x,
  },
  IS_NOT_GREATER_OR_EQUALS_THAN: {
    operator: Op.lt,
    transformer: (x) => x,
  },
  IS_NOT_LESS_OR_EQUALS_THAN: {
    operator: Op.gt,
    transformer: (x) => x,
  },
};

const wrapValue = (value, wrap) => (wrap ? `$${value}$` : value);
const isNestedProp = (prop) => (prop || '').indexOf('.') >= 0;
const conditionsForFields = (queryFields) => queryFields.reduce((res, x) => {
  const result = res;
  const {
    operator,
    transformer,
  } = CONDITIONS[x.condition];
  const field = wrapValue(x.field, isNestedProp(x.field));
  result[field] = {
    [operator]: transformer(x.value),
  };
  return result;
}, {});

const generateFilterCondition = (query: Object) => {
  const queryFields = (query.fields || []);
  return conditionsForFields(queryFields);
};

const MODEL_PROP_REGEX = /(\w+)(\.)(\w+)/;
const extractModelAndPropNames = (prop: string) => ({
  modelName: prop.replace(MODEL_PROP_REGEX, '$1'),
  propName: prop.replace(MODEL_PROP_REGEX, '$3'),
});

const wrapSortValue = (value, wrap) => (wrap ? Sequelize.literal(value) : value);
const remapDirection = (dir) => (dir === 'descending' ? 'DESC' : 'ASC');
const generateOrderCondition = (
  sortProp: string,
  sortDirection: string,
  include: Array<Object>,
) => {
  const direction = remapDirection(sortDirection);
  const prop = wrapSortValue(
    sortProp,
    isNestedProp(sortProp),
  );

  if (!isNestedProp(sortProp)) {
    return [[prop, direction]];
  }

  const {
    modelName,
    propName,
  } = extractModelAndPropNames(sortProp);
  const model = include.find((x) => x.as === modelName);

  return [[model, propName, direction]];
};

const anyNestedField = (rules: Array<Rule>) => rules.some((x) => isNestedProp(x.field));

export const generateQueryPayload = (options: Options, include: Array<Object> = []) => {
  const payload: Object = {};

  if (include) {
    payload.include = include;
    payload.distinct = true;
  }

  if (options.sort) {
    payload.order = generateOrderCondition(
      options.sort.field,
      options.sort.direction,
      include,
    );
  }

  if (options.queryRules && options.queryRules.length) {
    payload.where = generateFilterCondition(options.queryRules);
    payload.subQuery = !anyNestedField(options.queryRules || []);
  }

  if (options.itemsPerPage && options.activePage) {
    payload.limit = options.itemsPerPage;
    payload.offset = options.itemsPerPage * (options.activePage - 1);
  }

  return payload;
};

export default {
  generateQueryPayload,
};
