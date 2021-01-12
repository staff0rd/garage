import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Notification = {
  message: string;
  key: string;
  dismissed: boolean;
  expiry?: number;
};

type NotificationState = {
  notifications: Notification[];
};

export const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addSnackbar(state, { payload }: PayloadAction<Notification>) {
      state.notifications.push(payload);
    },
    removeSnackbar(state, { payload }: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (s) => s.key !== payload
      );
    },
  },
});

export const { addSnackbar, removeSnackbar } = notificationSlice.actions;

export default notificationSlice.reducer;
