import type {Todolist} from "../App/App";

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction

export const todolistsReducer = (state = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todolist => todolist.id !== action.payload.id)

        case 'create_todolist':
            return state

        default:
            return state
    }
}

// Typization
function sum(a: number, b: number) {
    return a + b
}

type SumType = typeof sum // (a: number, b: number) => number

// Actions
export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

export type CreateTodolistAction = {
    type:'create_todolist'
    payload: {
        title: string
    }
}

export const deleteTodolistAC = (id: string): DeleteTodolistAction => ({type: 'delete_todolist', payload: {id}})
export const createTodolistAC = (title: string): CreateTodolistAction => ({type: 'create_todolist', payload: {title}})

