import './App.css'
import {useState} from "react";
import {v1} from "uuid";
import {type TaskType, TodolistItem} from "./TodolistItem";

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: true},
        ]
    })

    const deleteTask = (todolistId: string, taskId: TaskType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [...tasks, newTask]
        setTasks(newTasks)
    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const changeTaskStatus = (taskId: TaskType['id'], isDone: TaskType['isDone']) => {
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(newState)
    }


    return (
        <div className="app">
            {todolists.map(todolist => {

                let filteredTasks = tasks
                if (todolist.filter === 'active') {
                    filteredTasks = tasks.filter(t => !t.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasks.filter(t => t.isDone)
                }
                return (
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                    />
                )
            })}
        </div>
    )
}


