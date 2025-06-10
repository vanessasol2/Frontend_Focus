import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


const loadInitialState = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    return {
      isAuthenticated: true,
      user: {
        email: decoded.sub, 
        name: decoded.name || decoded.sub.split('@')[0] 
      },
      role: decoded.roles?.[0] || decoded.role,
      token: token
    };
  }
  return {
    isAuthenticated: false,
    user: null,
    role: null,
    token: null
  };
};

const initialState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      const decoded = jwtDecode(token);
      
      state.isAuthenticated = true;
      state.token = token;
      state.role = decoded.roles?.[0] || decoded.role;
      state.user = {
        email: decoded.sub,
        name: decoded.name || decoded.sub.split('@')[0]
      };
    },
    logout: (state) => {
  state.isAuthenticated = false;
  state.user = null;
  state.token = null;
  localStorage.clear();   
  sessionStorage.clear(); 
  
},
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;