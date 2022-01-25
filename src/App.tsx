import React, { FC } from "react";
import "./App.css";

import { ITodo } from "./types/todo";

import TodoList from './components/TodoList'

const App: FC = () => {
	const [value, setValue] = React.useState("");
	const [todos, setTodos] = React.useState<ITodo[]>([{
		id: 1643068477497,
		title: 'Learn React + Redux',
		completed: true,
	},
	{
		id: 1643068489191,
		title: 'Learn TypeScript',
		completed: false,
	},]);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') addTodo();
	};

	const addTodo = () => {
		if (value.trim().length && value.length < 29) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					title: value,
					completed: false,
				},
			]);
		} else {
			alert('Todo не должна быть пустой или слишком большой!')
		}

        setValue('');
	};

    const completeTodo = (id: number): void => {
        setTodos(
            todos.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        completed: !item.completed
                    }
                }

                return item;
            })
        );
    };

    const removeTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

	React.useEffect(() => {
		if(inputRef.current) inputRef.current.focus();
	}, []);

	return (
		<div className="todo">
			<h1 className="title">TypeScript Todo List</h1>
			<input
				onKeyDown={handleKeyDown}
				ref={inputRef}
				type="text"
				value={value}
				onChange={handleChange}
				placeholder="Add a todo..."
				className="input-todo"
			/>
			<button onClick={addTodo} className="add-btn">Add Todo</button>

			<TodoList items={todos} completeTodo={completeTodo} removeTodo={removeTodo}  />
		</div>
	);
};

export default App;
