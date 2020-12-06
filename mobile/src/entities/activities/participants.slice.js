import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchParticipants } from './actions';

const participantsAdapter = createEntityAdapter();

export default createSlice({
  name: 'participants',
  initialState: participantsAdapter.getInitialState({ isLoading: true }),
  reducers: {
    setLoarder(state, { payload }) {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      participantsAdapter.setAll(state, payload);
      state.isLoading = false;
    });
  },
});
