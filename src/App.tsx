import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {type TaskType, TodolistItem} from "./TodolistItem";

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const title = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('all')

    const deleteTask = (taskId: TaskType['id']) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: TaskType['isDone']) => {
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(newState)
    }


    return (
        <div className="app">
            <TodolistItem title={title}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
                          filter={filter}
            />
        </div>
    )
}


