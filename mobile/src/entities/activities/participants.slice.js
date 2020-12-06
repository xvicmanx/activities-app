import { createSlice } from '@reduxjs/toolkit';
import { fetchParticipants } from './actions';
import { logOut } from '../user/actions';

const participantsSlice = createSlice({
  name: 'participants',
  initialState: {
    isLoading: true,
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.fulfilled, (state, { payload }) => {
        state.ids = payload.ids;
        state.entities = payload.participants;
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = true;
        state.ids = [];
        state.entities = {};
      });
  },
});

export default participantsSlice;
