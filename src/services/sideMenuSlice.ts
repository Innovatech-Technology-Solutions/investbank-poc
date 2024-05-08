import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  objectForContentList: {
    key: 'attr_isMostUsed',
    value: 'true',
    operator: 'Equal',
    OR_AND_Operator: 'AND',
    languageId: 'EN',
    contentTypeId: 9,
    pageSize: 6,
    pageIndex: 1,
  },
  objectForFilterSearch: {
    key: 'title',
    filterValue: '',
    languageId: 'EN',
    pageSize: 6,
    pageIndex: 1,
  },
  currentPage: 1,
  newRequest: false,
  searchInitiated: false,
};

// Create a reducer slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setContentList: (state, action) => {
      state.objectForContentList = action.payload;
      state.newRequest = !state.newRequest;
      state.currentPage = 1;
    },
    setFilterSearch: (state, action) => {
      state.objectForFilterSearch = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchInitiated: (state, action) => {
      state.searchInitiated = action.payload;
    },
  },
});

// Export the reducer and actions
export const { setContentList, setFilterSearch, setCurrentPage, setSearchInitiated } =
  dataSlice.actions;
export default dataSlice.reducer;
