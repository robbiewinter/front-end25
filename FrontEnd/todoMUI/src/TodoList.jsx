import { useState } from "react";
import TodoTable from "./TodoTable";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function TodoList() {
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const [filters, setFilters] = useState({ date: '', description: '', priority: '' });

    const handleChange = (event) => {
        const newTodo = {
            description: todo.description,
            date: todo.date,
            priority: todo.priority
        };
        newTodo[event.target.name] = event.target.value;
        setTodo(newTodo);
    };

    const handleDateChange = (date) => {
        setTodo({
            ...todo,
            date: date ? dayjs(date).format('YYYY-MM-DD') : ''
        });
    };

    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ description: '', date: '', priority: '' });
    };

    const deleteTodo = (index) => {
        const updatedTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (i !== index) {
                updatedTodos.push(todos[i]);
            }
        }
        setTodos(updatedTodos);
    };

    const deleteFilteredTodos = () => {
        const remainingTodos = todos.filter(todo => {
            return !(
                todo.date.includes(filters.date) &&
                todo.description.includes(filters.description) &&
                todo.priority.includes(filters.priority)
            );
        });
        setTodos(remainingTodos);
    };

    return (
        <>
          <h1 class="header">Simple Todolist</h1>
          <div class="inputs">
            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={todo.description}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={todo.date ? dayjs(todo.date) : null}
                    onChange={date => handleDateChange(date)}
                    renderInput={(params) => <input {...params} name="date" placeholder="Date" />}
                />
            </LocalizationProvider>
            
            <input
                name="priority"
                placeholder="Priority"
                onChange={handleChange}
                value={todo.priority}
            />
            <button onClick={addTodo}>Add</button>
            <button onClick={deleteFilteredTodos}>Delete</button>
          </div>

          <TodoTable todos={todos} deleteTodo={deleteTodo} setTodos={setTodos} filters={filters} setFilters={setFilters}/>
        </>
      );
}

export default TodoList;