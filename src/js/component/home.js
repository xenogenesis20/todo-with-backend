import React, { useState, useEffect } from "react";

export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useState([{ label: "", done: false }]);
	// console.log("Here is the initial list", todoList);

	// get todo list from API
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pizza")
			.then(function(response) {
				if (response.status !== 200) {
					console.log(
						"Looks like there was a problem. Status Code: " +
							response.status
					);
					return;
				}
				response.json().then(function(data) {
					setTodoList(data);
					console.log(data);
				});
			}, [])

			.catch(function(err) {
				console.log("Fetch Error :-S", err);
			});
	}, []);
	// send current list to API
	const sendTodos = input => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/pizza", {
			method: "PUT",
			body: JSON.stringify(input),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const addTodo = e => {
		const currentTodoList = [...todoList];
		const newTodo = { label: inputValue, done: false };
		setTodoList([...currentTodoList, newTodo]);
		sendTodos([...currentTodoList, newTodo]);
		setInputValue("");
	};
	const deleteTodo = indexToRemove => {
		let alteredList = todoList.filter((value, i) => i != indexToRemove);
		setTodoList(alteredList);
		sendTodos(alteredList);
	};

	const markDone = indexToAlter => {
		// let markedDone = todoList.filter((value, i) => i == indexToAlter);
		let updatedTasks = todoList.map((value, i) => {
			if (i == indexToAlter) {
				value.done = !value.done;
				return value;
			} else {
				return value;
			}
		});
		setTodoList(updatedTasks);
		sendTodos(updatedTasks);
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
							addTodo({ label: inputValue, done: false });
						}}>
						Add Todo
					</button>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-12">
					{todoList.map((item, i) => {
						return (
							<div
								key={i}
								className="d-flex justify-content-between">
								<div>
									{item.label} -{" "}
									{item.done ? "done" : "not done"}
								</div>
								<div>
									<i
										onClick={e => markDone(i)}
										className="fas fa-check"></i>
									<i
										onClick={() => deleteTodo(i)}
										className="fas fa-trash ml-auto"></i>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
