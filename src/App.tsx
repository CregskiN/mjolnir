import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./App.css";

// import Button from "./components/Button/button";
// import Menu from "./components/Menu/menu";
// import MenuItem from "./components/Menu/menuItem";
// import SubMenu from "./components/Menu/subMenu";
// import Icon from "./components/Icon/icon";
// import Transition from './components/Transition/transition';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCoffee, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
// import { fas } from "@fortawesome/free-solid-svg-icons"
// import { library } from "@fortawesome/fontawesome-svg-core"
// library.add(fas);

function App() {
	const [title, setTitle] = useState('');
	const postData = {
		title: 'my titile',
		body: 'hello man'
	}
	useEffect(() => {
		axios.post('http://jsonplaceholder.typicode.com/posts', postData).then(res => {
			console.log(res);
			setTitle(res.data.toString());
		})
	}, [postData])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const uploadFile = files[0]; // File
			const formData = new FormData();
			formData.append(uploadFile.name, uploadFile);
			axios.post('http://jsonplaceholder.typicode.com/posts', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(res => {
				console.log(res);
				
			})
		}
	}

	return (
		<div className="App">
			<h1>{title}</h1>
			{/* <form method="post" encType="multipart/form-data" action="http://jsonplaceholder.typicode.com/posts">
				<input type="file" name="myFile" />
				<button type="submit">Submit</button>
			</form> */}
			<input type="file" onChange={handleFileChange} />
		</div>
	);
}

export default App;
