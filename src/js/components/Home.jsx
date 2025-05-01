import React, { useState } from "react";



//create your first component
const Home = () => {
	const [toDo, setToDo] = useState("");
	const [arrayToDos, setArrayToDos] = useState([]);

	const enterToDo = (e) => {
		if (e.key === "Enter" && toDo.trim() !== '') {
			setArrayToDos([...arrayToDos, { text: toDo.trim(), completed: false }]);
			setToDo("");
		}
	};

	const toggleCompleted = (index) => {
		const updated = [...arrayToDos];
		updated[index].completed = !updated[index].completed;
		setArrayToDos(updated);
	};

	return (
		<div className="container d-flex justify-content-center flex-column p-3 my-5 bg-warning-subtle shadow fuzzy-bubbles-regular">
			<h1 className="text-center text-color-a" >To Do List</h1>
			<ul className="list-group w-200 aline-center bg-orange-100">
				<li className="list-group-item">
					<input className="form-control" placeholder="Add Stuff To Do"
						onChange={(e) => {
							setToDo(e.target.value)
						}}
						onKeyDown={enterToDo}
						value={toDo}
					/>
				</li>

				{arrayToDos.map((arrayToDo, index) => {
					return <li className={`list-group-item d-flex list-group-item-action align-items-center show-hiden
						list-group-item-warning
					`}
						key={arrayToDo + index}>
						<input className="form-check-input check-green mx-2" type="checkbox"
							checked={arrayToDo.completed}
							onChange={() => toggleCompleted(index)}
						/>
						<label className="form-check-label mt-1">{arrayToDo.text}</label>
						<button className="btn btn-sm btn-danger ms-auto hide"
							onClick={() => setArrayToDos(arrayToDos.filter((_, i) => i !== index))}
						><i className="fa-regular fa-trash-can"></i></button>
					</li>
				})
				}
				<li className="list-group-item list-group-item-light">{`${arrayToDos.length} items left`}</li>
			</ul>



		</div>
	);
};

export default Home;