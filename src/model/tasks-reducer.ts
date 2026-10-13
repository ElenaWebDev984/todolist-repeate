import type {TasksState} from "../App/App";
import type {CreateTodolistAction} from "./todolists-reducer";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist':
            return {...state, [action.payload.id]: []}


        default:
            return state
    }
}

type Actions = CreateTodolistAction