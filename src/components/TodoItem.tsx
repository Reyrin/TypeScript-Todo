import React, { FC } from "react";
import { ITodo } from "../types/todo";

interface ITodoItem extends ITodo {
    completeTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoItem: FC<ITodoItem> = ({id, completed, title, completeTodo, removeTodo}) => {
	return (
		<li key={id}>
			<input
				type="checkBox"
				checked={completed}
				onChange={() => completeTodo(id)}
			/>
			<div
				style={{ textDecoration: completed ? "line-through" : "" }}
			>
				{title}
			</div>
			<button onClick={() => removeTodo(id)}>X</button>
		</li>
	);
};

export default TodoItem;
