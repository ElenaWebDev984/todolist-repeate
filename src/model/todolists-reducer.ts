import {v1} from "uuid";
import type {FilterValues, Todolist} from "../App/App";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export const todolistsReducer = (state = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todolist => todolist.id !== action.payload.id)

        case 'create_todolist': {
            const newTodolist: Todolist = {id: v1(), title: action.payload.title, filter:'all'}
            return [newTodolist, ...state]
        }

        case 'change_todolist_title': {
            return state.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
        }

        case 'change_todolist_filter': {
            return state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
        }

        default:
            return state
    }
}

// Actions
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

export const deleteTodolistAC = (id: string) => ({type: 'delete_todolist', payload: {id}} as const)
export const createTodolistAC = (title: string) => ({type: 'create_todolist', payload: {title, id: v1()}} as const)
export const changeTodolistTitleAC = (payload: {id: string, title: string}) => ({type: 'change_todolist_title', payload} as const)
export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => ({type: 'change_todolist_filter', payload} as const)



// TODO typification
// function sum(a: number, b: number): number {
//     return a + b
// }


// typeof типизирует всю функцию (параметры и возвращаемое значение)
// type SumType = typeof sum // (a: number, b: number): number

// ReturnType берет из полученного типа только возвращаемое значение
// type SumReturnType = ReturnType<SumType> //  number

// Parameters берет из полученного типа только параметры
// type SumParametersType = Parameters<SumType> // [a: number, b: number]


