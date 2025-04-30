import React, { useState } from "react";



//create your first component
const Home = () => {
	const [toDo, setToDo] = useState("");
	const [arrayToDos, setArrayToDos] = useState([]);

	return (
		<div className="container d-flex justify-content-center flex-column">
			<h1 className="my-4 text-center " >To Do List</h1>
			<ul className="list-group w-200 aline-center">
				<li className="list-group-item">
					<input className="form-control" placeholder="Add Stuff To Do" 
					onChange={(e)=>{setToDo(e.target.value)
						}}						
					onKeyDown={(e)=>{if (e.key === "Enter" && toDo.trim() !== ''){				
						setArrayToDos([...arrayToDos,toDo.trim()])
						setToDo(""); 
					};					
					}}
					value={toDo}
					/>
				</li>

				{arrayToDos.map((arrayToDo,index,array)=>{return <li className="list-group-item d-flex justify-content-between align-items-center" key={arrayToDo+index}>
					{arrayToDo}
					<button className="btn btn-sm text-bg-danger" 
					onClick={() => setArrayToDos(arrayToDos.filter((_, i) => i !== index))}
					><i className="fa-regular fa-trash-can"></i></button>
				</li>})
				}
				<li className="list-group-item list-group-item-light">{`${arrayToDos.length} items left`}</li>
			</ul>



		</div>
	);
};

export default Home;