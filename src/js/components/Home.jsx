import React, { useState } from "react";

//create your first component
const Home = () => {
	const [toDo, setToDo] = useState("");
	const [editValue, setEditValue] = useState("");
	const [currentEditIndex, setCurrentEditIndex] = useState(null);
	const [arrayToDos, setArrayToDos] = useState([]);

	let myUser = 'myAPIuserLand'
	function postUser(){
		fetch(`https://playground.4geeks.com/todo/users/${myUser}`,
			{method:'post'})
			.then((response)=>{								
				if(!response.ok){
					throw new Error(`${response.status}, ${response.statusText}, User already exists.`)
				}					
			})
			.catch((error)=>{alert(error)})
	};

	function getAPIList(){
		fetch(`https://playground.4geeks.com/todo/users/${myUser}`,{ 
			method:"get"
		})
		.then((response)=>{
			
			
			return response.json()
			
		})
		.then((data)=>{
			setArrayToDos(data.todos)			
		})
		.catch((error)=>{console.log(error);
		})

	};

	function postToDo (obj){
		fetch(`https://playground.4geeks.com/todo/todos/${myUser}`,
			{method: 'post',
			body: JSON.stringify(obj),
			headers:{'Content-Type': 'application/json'}
		})
		.then((response)=>{
			if(!response.ok){
				throw new Error(`${response.status}, ${response.statusText}`)
			}
			return response.json()
		})
		.then((data)=>{
			getAPIList()
		})
		.catch((error)=>{
			console.error(error.detail)		
		})
	};

	function updateTodo(obj,id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,
			{method: 'put',
			body: JSON.stringify(obj),
			headers:{'Content-Type': 'application/json'}
		})
		.then((response)=>{
			if(!response.ok){
				throw new Error(`${response.status}, ${response.statusText}`)
			}
			return response.json()
		})
		.then((data)=>{
			getAPIList()
		})
		.catch((error)=>{
			console.error(error.detail)		
		})
	};

	function deleteTodo(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`,
			{method: 'delete'
			})
		.then((response)=>{
			console.log(response);
			
			if(!response.ok){
				throw new Error(`${response.status}, ${response.statusText}`)
			}
			
		})
		.then(()=>{
					
			getAPIList()
		})
		.catch((error)=>{
			console.error(error.detail)		
		})
	};

	const enterToDo = (e) => {
		if (e.key === "Enter" && toDo.trim() !== "") {
			postToDo({
				"label": toDo.trim(),
				"is_done": false
			  })
			//setArrayToDos([...arrayToDos, { text: toDo.trim(), completed: false }]);
			setToDo("");
		}
	};

	const toggleCompleted = (label, is_done, id) => {
		let updated = {
			"label": label,
			"is_done": !is_done
		  }
		  updateTodo(updated, id)

		/*const updated = [...arrayToDos];
		updated[index].completed = !updated[index].completed;
		setArrayToDos(updated);*/
	};

	
	const startEdit = (label, is_done, id) => {
		console.log([label, is_done,id]);

		setCurrentEditIndex([label, is_done,id]);
		setEditValue(label);
		
		//setCurrentEditIndex(index);
		//setEditValue(arrayToDos[index].text);
	};

	const handleSave = ( ) => {
		let updated = {
			"label": editValue,
			"is_done": currentEditIndex[1]
		  }
		  updateTodo(updated, currentEditIndex[2])


		/*const updated = [...arrayToDos];
		updated[currentEditIndex].text = editValue;
		setArrayToDos(updated);*/
		setCurrentEditIndex(null);
	};

	const handleDelete = (id) => {
		deleteTodo(id)

		//setArrayToDos(arrayToDos.filter((_, i) => i !== index));
	};

	return (
		<div className="container d-flex justify-content-center flex-column p-3 my-5 bg-warning-subtle shadow fuzzy-bubbles-regular rounded">
			<h1 className="text-center text-color-a "><b>To Do List</b></h1>
			<ul className="list-group w-100 align-center ">
				<li className="list-group-item border-0 bg-a">
					<input
						className="form-control"
						placeholder="Add Stuff To Do"
						onChange={(e) => setToDo(e.target.value)}
						onKeyDown={enterToDo}
						value={toDo}
					/>
				</li>

				{arrayToDos.map(({label, is_done, id }, index, array) => (
					<li
						className={`list-group-item d-flex list-group-item-action align-items-center show-hiden list-group-item-warning ${
							is_done ? "text-decoration-line-through" : ""
						}`}
						
					>
						<input
							className="form-check-input check-green mx-2"
							type="checkbox"
							checked={is_done}
							onChange={() => toggleCompleted(label, is_done, id )}
						/>
						<label className="form-check-label align-items-center">{label}</label>
						<div className="ms-auto">
							<button
								className="btn btn-outline-primary border-0 btn-sm hide"
								data-bs-toggle="modal"
								data-bs-target="#editModal"
								onClick={() => startEdit(label, is_done, id)}
							>
								<i className="fa-solid fa-pen"></i>
							</button>
							<button
								className="btn btn-outline-danger border-0 btn-sm hide"
								onClick={() => handleDelete(id)}
							>
								<i className="fa-solid fa-xmark fa-xl"></i>
							</button>
						</div>
					</li>
				))}

				<li className="list-group-item border-0 bg-a d-flex align-items-center ">
					{`${arrayToDos.length} task${arrayToDos.length !== 1 ? "s" : ""} left`}
					<button className="btn btn-outline-warning border-0 btn-sm ms-auto" onClick={getAPIList}><i class="fa-solid fa-bug-slash"></i></button>
				</li>
			</ul>

			{/* Modal */}
			<div
				className="modal fade"
				id="editModal"
				tabIndex="-1"
				aria-labelledby="editModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="editModalLabel">Edit your task</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<input
								className="form-control"
								placeholder="Edit task"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={handleSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
