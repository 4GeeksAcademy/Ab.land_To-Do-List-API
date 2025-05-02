import React, { useState } from "react";

//create your first component
const Home = () => {
	const [toDo, setToDo] = useState("");
	const [editValue, setEditValue] = useState("");
	const [currentEditIndex, setCurrentEditIndex] = useState(null);
	const [arrayToDos, setArrayToDos] = useState([]);

	const enterToDo = (e) => {
		if (e.key === "Enter" && toDo.trim() !== "") {
			setArrayToDos([...arrayToDos, { text: toDo.trim(), completed: false }]);
			setToDo("");
		}
	};

	const toggleCompleted = (index) => {
		const updated = [...arrayToDos];
		updated[index].completed = !updated[index].completed;
		setArrayToDos(updated);
	};

	
	const startEdit = (index) => {
		setCurrentEditIndex(index);
		setEditValue(arrayToDos[index].text);
	};

	const handleSave = () => {
		const updated = [...arrayToDos];
		updated[currentEditIndex].text = editValue;
		setArrayToDos(updated);
		setCurrentEditIndex(null);
	};

	const deleteToDo = (index) => {
		setArrayToDos(arrayToDos.filter((_, i) => i !== index));
	};

	return (
		<div className="container d-flex justify-content-center flex-column p-3 my-5 bg-warning-subtle shadow fuzzy-bubbles-regular rounded">
			<h1 className="text-center text-color-a "><b>To Do List</b></h1>
			<ul className="list-group w-100 align-center bg-orange-100 ">
				<li className="list-group-item border-0 bg-purple">
					<input
						className="form-control"
						placeholder="Add Stuff To Do"
						onChange={(e) => setToDo(e.target.value)}
						onKeyDown={enterToDo}
						value={toDo}
					/>
				</li>

				{arrayToDos.map(({text, completed }, index) => (
					<li
						className={`list-group-item d-flex list-group-item-action align-items-center show-hiden list-group-item-warning ${
							completed ? "text-decoration-line-through" : ""
						}`}
						
					>
						<input
							className="form-check-input check-green mx-2"
							type="checkbox"
							checked={completed}
							onChange={() => toggleCompleted(index)}
						/>
						<label className="form-check-label align-items-center">{text}</label>
						<div className="ms-auto">
							<button
								className="btn btn-outline-primary border-0 btn-sm hide"
								data-bs-toggle="modal"
								data-bs-target="#editModal"
								onClick={() => startEdit(index)}
							>
								<i className="fa-solid fa-pen"></i>
							</button>
							<button
								className="btn btn-outline-danger border-0 btn-sm hide"
								onClick={() => deleteToDo(index)}
							>
								<i className="fa-solid fa-xmark fa-xl"></i>
							</button>
						</div>
					</li>
				))}

				<li className="list-group-item border-0 bg-purple border-top-purple">
					{`${arrayToDos.length} task${arrayToDos.length !== 1 ? "s" : ""} left`}
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
