import { createSlice } from "@reduxjs/toolkit";
import { getMyDocuments } from "../../api/api";

const initialState = {
  documents: [],
  sortedDocuments: [],
  loading: false,
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    filterDocuments(state, action) {
      const { startDate, endDate, title, group } = action.payload;

      state.sortedDocuments = state.documents.filter((doc) => {
        const docDate = new Date(doc.createdAt);
        let isDateInRange = true;

        if (startDate && !endDate) {
          isDateInRange = docDate >= new Date(startDate);
        } else if (!startDate && endDate) {
          isDateInRange = docDate <= new Date(endDate);
        } else if (startDate && endDate) {
          isDateInRange =
            docDate >= new Date(startDate) && docDate <= new Date(endDate);
        }

        const isTitleMatch =
          !title || doc.title.toLowerCase().includes(title.toLowerCase());
        const isGroupMatch =
          !group || doc.group.toLowerCase().includes(group.toLowerCase());

        return isDateInRange && isTitleMatch && isGroupMatch;
      });
    },

    resetFilter(state) {
      state.sortedDocuments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
        state.sortedDocuments = action.payload;

        console.log(state.sortedDocuments);
      })
      .addCase(getMyDocuments.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { filterDocuments, resetFilter } = documentSlice.actions;

export default documentSlice.reducer;
