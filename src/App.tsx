import React, { FC } from "react";
import "./App.css";

import { ITodo } from "./types/todo";

import TodoList from './components/TodoList'

const App: FC = () => {
	const [value, setValue] = React.useState("");
	const [todos, setTodos] = React.useState<ITodo[]>([]);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setValue(e.target.value);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') addTodo();
	};

	const addTodo = () => {
		if (value.trim().length) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					title: value,
					completed: false,
				},
			]);
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
		<div className="App">
			<input
				onKeyDown={handleKeyDown}
				ref={inputRef}
				type="text"
				value={value}
				onChange={handleChange}
			/>
			<button onClick={addTodo}>Send</button>

			<TodoList items={todos} completeTodo={completeTodo} removeTodo={removeTodo}  />
		</div>
	);
};

export default App;
