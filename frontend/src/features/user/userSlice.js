import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchallUsers, fetchLoggedInUser, fetchLoggedInUserOrders, sendMailSuperAdminTOUser, updateUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo:null,
  userList:[],
  userListStatus: 'idle',
  totalUsers: 0,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchallUsersAsync = createAsyncThunk(
  'user/fetchallUsers',
  async (sort, pagination,userName) => {
    const response = await fetchallUsers(sort, pagination,userName);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const sendMailSuperAdminTOUserAsync = createAsyncThunk(
  'user/sendMailSuperAdminTOUser',
  async (userEmail,subject,message) => {
    const response = await sendMailSuperAdminTOUser(userEmail,subject,message);
    // const response = await fetchallUsers(sort, pagination,userName);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchallUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userList = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
      })
  },
});

// export const { increment } = counterSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders ;
export const selectTotalUserCount = (state) => state.user.totalUsers ;
export const selectUserInfo = (state) => state.user.userInfo ;
export const selectUsers = (state) => state.user.userList ;
export const selectUserInfoStatus = (state) => state.user.status ;

export default userSlice.reducer;