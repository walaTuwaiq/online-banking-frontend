const initialState = {
  token: "",
  user_admin: "",
  user_id: "",
  user_name: "",
};

export const setToken = (token, user_admin, user_id,user_name) => {
  return {
    type: "SET_TOKEN",
    payload: { token, user_admin, user_id,user_name },
  };
};

const token = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return {
        token: payload.token,
        user_admin: payload.user_admin,
        user_id: payload.user_id,
        user_name:payload.user_name,
      };

    default:
      return state;
  }
};

export default token;
