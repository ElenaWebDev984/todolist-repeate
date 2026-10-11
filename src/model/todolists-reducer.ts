import type {Todolist} from "../App/App";

const initialState: Todolist[] = []

export const todolistsReducer = (state = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todolist => todolist.id !== action.payload.id)

        case 'create_todolist': // create todolist logic
            return state

        default:
            return state
    }
}

// Actions
type Actions = {
    type: string
    payload: any
}

const action1 = {
    type: 'delete_todolist',
    payload: {
        id: 1,
    }
}

const action2 = {
    type: 'create_todolist',
    payload: {id: '123',
        title: 'hello world',
    }
}