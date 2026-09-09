import './App.css'
import {type TaskType, TodolistItem} from "./TodolistItem";

export const App = () => {
    const tasks1: TaskType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]

    const tasks2: TaskType[] = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
    ]

  return (
      <div className="app">
        <TodolistItem title={'What to learn'} tasks={tasks1}/>
        <TodolistItem title={'What to buy'} tasks={tasks2}/>
      </div>
  )
}


