import './App.css'
import {useState} from "react";
import {type TaskType, TodolistItem} from "./TodolistItem";

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const title = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ])

    const [filter,setFilter] = useState<FilterValues>('all')

    const deleteTask = (taskId: TaskType['id']) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTasks)
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


  return (
      <div className="app">
        <TodolistItem title={title}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
        />
      </div>
  )
}


