import type {FilterValues} from "./App";
import {Button} from "./Button";

export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
    changeFilter: (filter: FilterValues) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: TodolistItemType) => {
    const mappedTasks = tasks.length === 0
            ? <p>Your list is empty</p>
            : tasks.map(t => {
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button title={'x'} onClick={() => deleteTask(t.id)}/>
                </li>
            )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    );
};

