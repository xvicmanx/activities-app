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
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.ids = action.payload.ids;
        state.entities = action.payload.participants;
        state.isLoading = false;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        console.log('fetchParticipants.rejected', action);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = true;
        state.ids = [];
        state.entities = {};
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default participantsSlice;
