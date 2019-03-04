// ------------------------------------
// Constants
// ------------------------------------
export const INCREMENT = "INCREMENT";

// ------------------------------------
// Actions
// ------------------------------------
export function increment() {
  return {
    type: INCREMENT
  };
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const asyncIncrement = () => (dispatch) => {
  return new Promise(resolve => {
    setTimeout(() => {
      dispatch(increment());
      resolve();
    }, 500)
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 1;

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return (state += 1);
    default:
      return state;
  }
}
