import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchParticipants } from './actions';

const participantsAdapter = createEntityAdapter();
const initialState = participantsAdapter.getInitialState({ isLoading: true });

export default createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      participantsAdapter.upsertMany(state, payload);
      state.isLoading = false;
    });
  },
});
