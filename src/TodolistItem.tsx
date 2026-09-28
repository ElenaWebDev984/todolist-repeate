import {ChangeEvent} from "react";
import type {FilterValues, Todolist} from "./App";
import {Button} from "./Button";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";

export type TodolistItemType = {
    todolist: Todolist
    tasks: TaskType[]
    deleteTask: (todolistId: Todolist['id'], taskId: TaskType['id']) => void
    changeFilter: (todolistId: Todolist['id'], filter: FilterValues) => void
    createTask: (todolistId: Todolist['id'], title: TaskType['title']) => void
    changeTaskStatus: (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => void
    deleteTodolist: (todolistId: Todolist['id']) => void
    changeTaskTitle: (todolistId: Todolist['id'], taskId: TaskType['id'], title: TaskType['title']) => void
    changeTodolistTitle: (todolistId: Todolist['id'], title: Todolist['title']) => void
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
                                 changeTaskTitle,
                                 changeTodolistTitle,
                             }: TodolistItemType) => {


    const mappedTasks = tasks.length === 0
        ? <p>Your list is empty</p>
        : tasks.map(t => {

            const deleteTaskHandler = () => deleteTask(id, t.id)

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(id, t.id, newStatusValue)
            }

            const changeTaskTitleHandler = (title: TaskType['title']) => {
                changeTaskTitle(id, t.id, title)
            }


            return (
                <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                    <Button title={'x'} onClick={deleteTaskHandler}/>
                </li>
            )
        })

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const createTaskHandler = (title: TaskType['title']) => {
        createTask(id, title)
    }

    const changeTodolistTitleHandler = (title: Todolist['title']) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <Button title={'X'} onClick={deleteTodolistHandler}/>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
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

