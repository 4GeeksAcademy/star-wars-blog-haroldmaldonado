const initialState = {
  people: [],
  planets: [],
  starships: [],
  favorites: [],
  query: ""
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "set_data":
      return { ...state, ...action.payload };
    case "toggle_favorite":
      const exists = state.favorites.some(
        f => f.type === action.payload.type && f.uid === action.payload.uid
      );
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(
              f => !(f.type === action.payload.type && f.uid === action.payload.uid)
            )
          : [...state.favorites, action.payload]
      };
    case "set_query":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export const initialStore = () => initialState;
