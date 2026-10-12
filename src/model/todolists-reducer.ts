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

// Actions
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const deleteTodolistAC = (id: string) => ({type: 'delete_todolist', payload: {id}} as const)

export const createTodolistAC = (title: string) => ({type: 'create_todolist', payload: {title}} as const)



// TODO typification
function sum(a: number, b: number): number {
    return a + b
}
type SumType = typeof sum // (a: number, b: number): number
type SumReturnType = ReturnType<SumType> //  number
type SumParametersType = Parameters<SumType> // [a: number, b: number]


