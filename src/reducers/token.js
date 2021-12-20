const initialState = {
  token: "",
  user_admin:"",
};

export const setToken = (token, user_admin) => {
  return {
    type: "SET_TOKEN",
    payload: { token, user_admin },
  };
};

const token = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return {
        token: payload.token,
        user_admin: payload.user_admin,
      };

    default:
      return state;
  }
};

export default token;
