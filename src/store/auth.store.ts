import { create } from "zustand";
import { createAuthSlice, IAuthSlice } from "./slices/auth.slice";

export const authStore = create< IAuthSlice >((...a) => ({
    ...createAuthSlice(...a),
  }))
  