// @flow

export const coordinatesTableValueResolver = (item: Object): string =>
  item.coordinates ? 'Si' : 'No';
