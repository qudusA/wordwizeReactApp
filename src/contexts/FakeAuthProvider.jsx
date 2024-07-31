import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const FakeAuthContext = createContext();

const initialState = {
  isAuth: false,
  user: null,
};

const userData = {
  name: "Test",
  email: "fakeuser@test.com",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuth: userData.email === action.payload.email,
        user: action.payload,
      };
    case "logout":
      return { user: null, isAuth: false };
    default:
      throw new Error("Unknown action type.....");
  }
}

function FakeAuthProvider({ children }) {
  const [{ isAuth, user }, dispatch] = useReducer(reducer, initialState);

  async function login(email) {
    try {
      // const res = await fetch(``, {
      //   method: "POST",
      //   body: JSON.stringify(email),
      //   headers: {
      //     "Content-Type": "appliction/json",
      //   },
      // });
      const validatedDataForLogin = email;
      // await res.json();

      // if (!validatedDataForLogin) throw new Error("invalid email or password");
      dispatch({
        type: "login",
        payload: { ...userData, email: validatedDataForLogin },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ isAuth, login, user, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

FakeAuthProvider.propTypes = {
  children: PropTypes.any,
};

function useFakeAuth() {
  const fakeAuth = useContext(FakeAuthContext);
  if (useFakeAuth === undefined)
    throw new Error("useFakeAuth is used outside of its parent scope...");

  return fakeAuth;
}

export { FakeAuthContext, FakeAuthProvider, useFakeAuth };
