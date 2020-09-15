import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import HeaderComponent from "./components/header/header.component";
import { firestore } from "./firebase";
import Sidebar from "./components/sidebar/sidebar.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import ChatComponent from "./components/chat/chat.component";
import ContactForm from "./components/addcontact/addContact.component";
import ViewContactComponent from "./components/viewcontacts/viewcontact.component";
const { Content } = Layout;

function App() {
	const [contacts, setContacts] = useState([]);
	const [storageRef] = useState(firestore.collection("contacts"));

	useEffect(() => {
		const loadContacts = async () => {
			await storageRef.onSnapshot((snapshot) =>
				setContacts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			);
		};
		loadContacts();
		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<Router>
				<HeaderComponent contacts={contacts} />
				<Layout>
					<Sidebar contacts={contacts} />
					<Content>
						<Switch>
							<Route exact path="/">
								<ContactForm />
							</Route>
							<Route path="/viewcontacts">
								<ViewContactComponent />
							</Route>
							<Route path="/user/:uid">
								<ChatComponent />
							</Route>
						</Switch>
					</Content>
				</Layout>
			</Router>
		</div>
	);
}

export default App;
