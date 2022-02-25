import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface dataType {
  uri: string[],
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        uri: [],
    } as dataType,
    reducers: {
        setUri: (state: dataType, action: PayloadAction<string>) => {
            state.uri.push(action.payload);
        },
    }
});


export const { setUri } = dataSlice.actions;

export default dataSlice.reducer;