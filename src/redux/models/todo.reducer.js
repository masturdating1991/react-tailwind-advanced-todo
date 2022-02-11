import {createSlice} from "@reduxjs/toolkit";
import {getTodoFromLocalStorage, containsIncludes} from "../../utils";

const TodoReducer = createSlice({
    name: "todo",
    initialState: {
        todo: getTodoFromLocalStorage(),
        search: [],
        filterPriority: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload)
            state.search = [...state.todo];
            state.filter = [...state.todo]
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(item => item.id !== action.payload)
            state.search = state.search.filter(item => item.id !== action.payload)
            state.filterPriority = state.filterPriority.filter(item => item.id !== action.payload)
            localStorage.setItem("todo", JSON.stringify(state.todo));
        },
        searchTodo: (state, action) => {
            const filterSearch = (term) => [term.name, term.priority, term.status].join('').toLowerCase().includes(action.payload.toLowerCase())
            state.search = state.todo.filter(item => {
                if (!action.payload) return state.todo
                return filterSearch(item)
            })
        },
        filterPriorityAction: (state, action) => {
            state.filterPriority = state.todo.filter(item => {
                if (action.payload === "All") return state.todo
                return item.priority.toLowerCase().includes(action.payload.toLowerCase())
            })
            state.search = state.filterPriority
        },
        filterStatusAction: (state, action) => {
            state.filterStatus = state.todo.filter(item => {
                if (action.payload === "All") return state.todo
                return item.status.toLowerCase().includes(action.payload.toLowerCase())
            })
            state.search = state.filterStatus
        }
    }
})


export const {
    addTodo,
    deleteTodo,
    searchTodo,
    filterPriorityAction,
    filterStatusAction
} = TodoReducer.actions

export default TodoReducer.reducer
