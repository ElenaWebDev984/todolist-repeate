import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {ChangeEvent} from "react";
import type {FilterValues, Todolist} from "../App/App";
import {CreateItemForm} from "../CreateItemForm";
import {EditableSpan} from "../EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles";

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
                <ListItem key={t.id}
                          sx={getListItemSx(t.isDone)}>
                    <div>
                        <Checkbox checked={t.isDone}
                                  onChange={changeTaskStatusHandler}/>
                        <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                    </div>
                    <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
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
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            <List>
                {mappedTasks}
            </List>
            <Box sx={containerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};

