import React, { useReducer } from 'react'
import Todo from "./Todo.js"

export const todoContext = React.createContext();

const todoReducer = (state, action) => {

	switch (action.type) {
		case "add-todo": {
			let newTodos = state.todos;
			newTodos.push(action.payload)
			return { todos: newTodos, count: state.count + 1 }
		};
		case "toggle-todo": {
			let newTodos = state.todos;
			if (newTodos[action.payload].status === "uncompleted") {
				newTodos[action.payload].status = "completed"
			} else {
				newTodos[action.payload].status = "uncompleted"
			}
			return { todos: newTodos, count: state.count };
		};
		case "delete-todo": {
			let newTodos = state.todos;
			newTodos.splice(action.payload, 1);
			return { todos: newTodos, count: state.count - 1 };
		};
		default: return state;
	}

}


export default function App() {

	const [todoState, dispatch] = useReducer(todoReducer, { todos: [], count: 0 })

	return (
		<div>
			<todoContext.Provider value={{ todoState, dispatch }}>
				<Todo />
			</todoContext.Provider>
		</div>
	)
}
