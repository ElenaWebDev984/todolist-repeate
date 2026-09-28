import {ChangeEvent, type KeyboardEvent, useState} from "react";
import type {FilterValues, Todolist} from "./App";
import {Button} from "./Button";

export type TodolistItemType = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: Todolist['id'], taskId: TaskType['id']) => void
    changeFilter: (todolistId: Todolist['id'], filter: FilterValues) => void
    createTask: (todolistId: Todolist['id'], title: string) => void
    changeTaskStatus: (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => void
    deleteTodolist: (todolistId: Todolist['id']) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 todolist: {id, title, filter},
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                             }: TodolistItemType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const mappedTasks = tasks.length === 0
        ? <p>Your list is empty</p>
        : tasks.map(t => {

            const deleteTaskHandler = () => deleteTask(id, t.id)

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(id, t.id, newStatusValue)
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
            createTask(id, trimmedTitle)
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

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>{title}</h3>
                <Button title={'X'} onClick={deleteTodolistHandler}/>
            </div>
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
                        onClick={() => changeFilterHandler('all')}
                        className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button title={'Active'}
                        onClick={() => changeFilterHandler('active')}
                        className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}
                />
            </div>
        </div>
    );
};

