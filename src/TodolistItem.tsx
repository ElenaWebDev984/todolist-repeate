import {type KeyboardEvent, ChangeEvent, useState} from "react";
import type {FilterValues} from "./App";
import {Button} from "./Button";

export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistItemType) => {
    const [taskTitle, setTaskTitle] = useState('')

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

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    createTaskHandler()
                }
    }




    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'}
                        onClick={createTaskHandler}
                />
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

