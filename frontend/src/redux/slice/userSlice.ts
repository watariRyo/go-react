import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../../models/role";
import { User } from "../../models/user";

export type UpdateUserPayload = User;

type UserState = {
  user: User;
};

const initialState: UserState = {
  user: new User(0, "", "", "", new Role()),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // TODO: non-serializable value is not resolved
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
