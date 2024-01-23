const STATE = ['CA', 'IL', 'AK', 'OR', 'IN',];

export const LOCATION_STATE = STATE.map((value, index) => ({
  value: value.toString(),
  viewValue: value,
}));
