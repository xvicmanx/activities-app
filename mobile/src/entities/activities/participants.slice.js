import { createSlice, current } from '@reduxjs/toolkit';
import { fetchParticipants } from './actions';

export default createSlice({
  name: 'participants',
  initialState: {
    isLoading: true,
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchParticipants.fulfilled, (state, { payload }) => {
      state.ids = payload.ids;
      state.entities = payload.participants;
      state.isLoading = false;
    });
  },
});
