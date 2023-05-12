export let state = {
  countries: [],
};
export const updateState = (newState = {}) => {
  state = { ...state, ...newState };
};
