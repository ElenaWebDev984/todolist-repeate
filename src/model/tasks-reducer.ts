import {v1} from "uuid";
import type {TasksState, Todolist} from "../App/App";
import type {TaskType} from "../TodolistItem/TodolistItem";
import type {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist':
            return {...state, [action.payload.id]: []}

        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }

        case 'delete_task': {
            const {taskId, todolistId} = action.payload
            return {...state, [todolistId]: state[todolistId].filter(task => task.id !== taskId)}
        }

        case 'create_task': {
            const {todolistId, title} = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [todolistId]: [newTask, ...state[todolistId]]}
        }

        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>

export const deleteTaskAC = (payload: {todolistId: Todolist['id'], taskId: TaskType['id']}) => ({type: 'delete_task', payload} as const)

export const createTaskAC = (payload: {todolistId: Todolist['id'],  title: TaskType['title']}) => ({type: 'create_task', payload} as const)


