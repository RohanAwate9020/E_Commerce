import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  createUser,
  loginUser,
  resetPassword,
  resetPasswordRequest,
  signOut,
} from "./authAPI";
import { updateUser } from "../user/userAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
  userExists: null,
  passwordReset: false
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const  loginUserAsync = createAsyncThunk(
//   'user/loginUser',
//   async (loginInfo) => {
//     const response = await loginUser(loginInfo);

//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async ({token,email,password}) => {
    try {
      const response = await resetPassword({token,email,password});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut", async () => {
  const response = await signOut();

  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        f;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Login successful:", action.payload);
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Logout successful:", action.payload);
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })

      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.userExists = null;
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.userExists = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.userExists = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.userExists = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.passwordReset = false;
        state.error = action.payload;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectUserExists = (state) => state.auth.userExists;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default userSlice.reducer;
