import {ChangeEvent, type KeyboardEvent, useState} from "react";
import type {FilterValues} from "./App";
import {Button} from "./Button";

export type TodolistItemType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType['id']) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: TaskType['id'], isDone: TaskType['isDone']) => void
    filter: FilterValues
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                             }: TodolistItemType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const mappedTasks = tasks.length === 0
        ? <p>Your list is empty</p>
        : tasks.map(t => {

            const deleteTaskHandler = () => deleteTask(t.id)

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(t.id, newStatusValue)
            }

            return (
                <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeTaskStatusHandler}
                    />
                    <span>{t.title}</span>
                    <Button title={'x'} onClick={deleteTaskHandler}/>
                </li>
            )
        })

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'}
                        onClick={createTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button title={'All'}
                        onClick={() => changeFilter('all')}
                        className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button title={'Active'}
                        onClick={() => changeFilter('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button title={'Completed'}
                        onClick={() => changeFilter('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    );
};

