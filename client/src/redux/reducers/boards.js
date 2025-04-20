import {createSlice} from "@reduxjs/toolkit";

const boards = createSlice({
    name: 'boards',
    initialState: {
        boards: [],
        board: {}
    },
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        setBoard: (state, action) => {
            state.board = action.payload;
        },
        changeTaskStatus: (state, action) => {
            const { taskId, newStatus } = action.payload;
            state.board = state.board.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
        },
        updateBoardTask: (state, action) => {
            const { taskId, updatedFields } = action.payload;
            state.board = state.board.map(task =>
                task.id === taskId ? { ...task, ...updatedFields } : task
            );
        },
        addTaskToBoard: (state, action) => {
            state.board.push(action.payload);
        }
    }
})

export const {addTaskToBoard, updateBoardTask, setBoards, setBoard, changeTaskStatus} = boards.actions
export default boards.reducer