import './App.css'
import MenuIcon from '@mui/icons-material/Menu'
import Switch from '@mui/material/Switch'
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Toolbar from '@mui/material/Toolbar'
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "../CreateItemForm";
import {todolistsReducer} from "../model/todolists-reducer";
import {type TaskType, TodolistItem} from "../TodolistItem/TodolistItem";
import {containerSx} from "../TodolistItem/TodolistItem.styles";
import {appBarSx, gridContainerSx, paperSx} from "./App.styles";
import {NavButton} from '../NavButton';

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
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatch] = useReducer(todolistsReducer, [])

    // const [todolists, setTodolists] = useState<Todolist[]>([
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'},
    // ])

    const [tasks, setTasks] = useState<TasksState>({
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

    const deleteTask = (todolistId: Todolist['id'], taskId: TaskType['id']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (todolistId: Todolist['id'], title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: Todolist['id'], filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const changeTaskStatus = (todolistId: Todolist['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const deleteTodolist = (todolistId: Todolist['id']) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title: Todolist['title']) => {
        const todolistId = v1()
        const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    const changeTaskTitle = (todolistId: Todolist['id'], taskId: TaskType['id'], title: TaskType['title']) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
    }

    const changeTodolistTitle = (todolistId: Todolist['id'], title: Todolist['title']) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
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


