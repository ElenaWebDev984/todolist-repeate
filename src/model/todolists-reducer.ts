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
const deleteAction: DeleteTodolistAction = {
    type:'delete_todolist'
    payload: {
        id: 'todolistId1'
    }
}

export type DeleteTodolistAction = {
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

const createAction: CreateTodolistAction = {
    type:'create_todolist',
    payload: {
        title: 'hello'
    }
}

export type CreateTodolistAction = {
    type: 'create_todolist'
    payload: {
        title: string
    }
}