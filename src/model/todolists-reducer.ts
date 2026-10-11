import type {Todolist} from "../App/App";

// [
//     {id: todolistId1, title: 'What to learn', filter: 'all'},
//     {id: todolistId2, title: 'What to buy', filter: 'all'},
// ]

const initialState: Todolist[] = []

export const todolistsReducer = (state = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_ todolist': // delete todolist logic. Change state
            return state

        case 'create_ todolist': // create todolist logic
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