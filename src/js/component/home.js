import React, { useState } from "react";

export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useState([]);

	const addTodo = input => {
		if (input) {
			setTodoList([...todoList, input]);
		} else {
			alert("Please add a task");
		}
	};
	const deleteTodo = indexToRemove => {
		let alteredList = todoList.filter((value, i) => i != indexToRemove);
		setTodoList(alteredList);
	};

	return (
		<div className="container">
			<h1>Maikel&apos;s Todo List</h1>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Add a task todo."
					aria-label="Recipient's username"
					aria-describedby="button-addon2"
					onChange={e => setInputValue(e.target.value)}
					value={inputValue}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-secondary"
						type="button"
						id="button-addon2"
						onClick={() => {
							addTodo(inputValue);
							setInputValue("");
						}}>
						Add Todo
					</button>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12">
					{todoList.map((value, i) => {
						return (
							<React.Fragment key={i}>
								<div className="d-flex justify-content-between">
									{value}{" "}
									<i
										onClick={() => deleteTodo(i)}
										className="fas fa-trash ml-auto"></i>{" "}
								</div>
							</React.Fragment>
						);
					})}
				</div>
			</div>
		</div>
	);
}
