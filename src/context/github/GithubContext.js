import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`);

    const data = await response.json();
    dispatch({ type: 'GET_USERS', payload: data });
  };

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
