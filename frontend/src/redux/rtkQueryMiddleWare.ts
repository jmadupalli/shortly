import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { logout } from "../redux/features/userSlice";

const rtkQueryErrorMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (api: MiddlewareAPI) => (next) => (action: any) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload["status"] == 403) api.dispatch(logout());
    }

    return next(action);
  };

export default rtkQueryErrorMiddleware;
