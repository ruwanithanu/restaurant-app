
export const roundTo2DecimalPoint = value => Math.round((value + Number.EPSILON) * 100) /100;