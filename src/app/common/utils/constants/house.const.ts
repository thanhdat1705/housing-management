const STATE = ['CA', 'IL', 'AK', 'OR', 'IN'];
const TYPE = ['apartment', 'villa', 'townhouse'];
const STATUS = ['available', 'booked'];
const MODEL = [
  'apartment-1',
  'apartment-2',
  'apartment-3',
  'apartment-4',
  'villa-1',
  'villa-2',
  'townhouse-1',
  'townhouse-2',
];

export const HOUSE_TYPE = TYPE.map((value, index) => ({
  value: value.toLowerCase(),
  viewValue: value,
}));

export const HOUSE_STATUS = STATUS.map((value, index) => ({
  value: value.toLowerCase(),
  viewValue: value,
}));

export const HOUSE_MODEL = MODEL.map((value, index) => ({
  value: value.toLowerCase(),
  viewValue: value,
}));
