import {createSlice} from "@reduxjs/toolkit";

const issues = createSlice({
    name: 'issues',
    initialState: {
        issues: []
    },
    reducers: {
        setIssues: (state, action) => {
            state.issues = action.payload;
        },
        updateIssue: (state, action) => {
            const { taskId, updatedFields } = action.payload;
            state.issues = state.issues.map(issue =>
                issue.id === taskId ? { ...issue, ...updatedFields } : issue
            );
        },
        addIssue: (state, action) => {
            state.issues.push(action.payload);
        }
    }
})

export const {addIssue, updateIssue, setIssues} = issues.actions
export default issues.reducer