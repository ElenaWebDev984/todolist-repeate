import './App.css'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import {useReducer, useState} from "react";
import {CreateItemForm} from "../CreateItemForm";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "../model/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "../model/todolists-reducer";
import {NavButton} from '../NavButton';
import {type TaskType, TodolistItem} from "../TodolistItem/TodolistItem";
import {containerSx} from "../TodolistItem/TodolistItem.styles";
import {appBarSx, gridContainerSx, paperSx} from "./App.styles";

type ThemeMode = 'dark' | 'light'

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: TaskType[]
}


export const App = () => {
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {})

    const deleteTask = (todolistId: Todolist['id'], taskId: TaskType['id']) => {
        dispatchTasks(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: Todolist['id'], title: TaskType['title']) => {
        dispatchTasks(createTaskAC({todolistId, title}))
    }

    const changeFilter = (todolistId: Todolist['id'], filter: FilterValues) => {
        dispatchTodolists(changeTodolistFilterAC({id: todolistId, filter}))
    }

    const changeTaskStatus = (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => {
        dispatchTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const deleteTodolist = (todolistId: Todolist['id']) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const createTodolist = (title: Todolist['title']) => {
        const action = createTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)

    }

    const changeTaskTitle = (todolistId: Todolist['id'], taskId: TaskType['id'], title: TaskType['title']) => {
        dispatchTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const changeTodolistTitle = (todolistId: Todolist['id'], title: Todolist['title']) => {
        dispatchTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('dark')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        }
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={appBarSx}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color={'inherit'}>
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton background={theme.palette.primary.light}>Login</NavButton>
                            <NavButton background={theme.palette.primary.light}>Logout</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={gridContainerSx}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(todolist => {
                        const todolistTasks = tasks[todolist.id]
                        let filteredTasks = todolistTasks
                        if (todolist.filter === 'active') {
                            filteredTasks = todolistTasks.filter(t => !t.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(t => t.isDone)
                        }
                        return (
                            <Grid key={todolist.id}>
                                <Paper sx={paperSx}>
                                    <TodolistItem todolist={todolist}
                                                  tasks={filteredTasks}
                                                  deleteTask={deleteTask}
                                                  changeFilter={changeFilter}
                                                  createTask={createTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  deleteTodolist={deleteTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}


