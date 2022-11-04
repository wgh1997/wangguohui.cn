import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from "./blog1";
import { reducer as blogReducer } from "./bilog/index";

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
