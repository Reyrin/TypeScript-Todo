import React, { FC } from 'react';
import { ITodo } from '../types/todo';
import TodoItem from './TodoItem';

interface ITodoListProps {
    items: ITodo[];
    completeTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoList: FC<ITodoListProps> = ({items, completeTodo, removeTodo}) => {
    return (
        <ul className='TodoList'>
            {items.map((item) => 
                <TodoItem key={item.id} {...item} completeTodo={completeTodo} removeTodo={removeTodo} />
            )}
        </ul>
    );
};

export default TodoList;