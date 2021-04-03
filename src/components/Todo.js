import React, { useState, useContext } from 'react'
import { todoContext } from "./App.js"

export default function Todo() {

	const { todoState, dispatch } = useContext(todoContext)
	const [newTodo, setNewTodo] = useState("")
	const handleKeyDown = e => {
		if (newTodo !== "" && e.key === "Enter") {
			dispatch({ type: "add-todo", payload: { text: newTodo, status: "uncompleted" } })
			setNewTodo("");
		}
	}

	const handleToggleTodo = (index, e) => {
		e.preventDefault()
		dispatch({ type: "toggle-todo", payload: index })
	}

	const handleDeleteTodo = (index, e) => {
		e.preventDefault()
		dispatch({ type: "delete-todo", payload: index })
	}

	return (
		<div>
			<input value={newTodo}
				onChange={e => setNewTodo(e.target.value)}
				onKeyDown={handleKeyDown}
			></input>
			<h3>number of todos: {todoState.count}</h3>
			<h3>todo list:</h3>
			{todoState.todos.map((todo, idx) => (
				<div key={idx}>
					<h4>{todo.text}</h4>
					<div>{todo.status}
						<button onClick={handleToggleTodo.bind(null, idx)}>toggle</button>
						<button onClick={handleDeleteTodo.bind(null, idx)}>delete</button></div>
				</div>
			))}
		</div>
	)
}
