import React, { useEffect, useState } from "react";
import "./viewcontact.styles.scss";
import { firestore } from "../../firebase";
import { message } from "antd";
import ContactCard from "./contactcard.component";

const ViewContactComponent = () => {
	const [loading, setLoading] = useState(false);
	const [storageRef] = useState(firestore.collection("contacts"));
	const [contacts, setContacts] = useState([]);
	const [del, setDel] = useState(1);

	useEffect(() => {
		setLoading(true);
		loadContacts();
		setLoading(false);
		//eslint-disable-next-line
	}, []);

	const loadContacts = async () => {
		await storageRef.onSnapshot((snapshot) =>
			setContacts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		);
	};

	const handleDelete = () => {
		setLoading(true);
		setDel({ del: del + 1 });
		message
			.warning("contact deleted", 1)
			.then(() => message.info("Kindly refresh the page for updates", 2));
		setLoading(false);
	};

	return (
		<div>
			<div className="contactlist">
				{contacts.map((contact) => (
					<ContactCard
						contact={contact}
						loading={loading}
						deleteContact={handleDelete}
					/>
				))}
			</div>
		</div>
	);
};

export default ViewContactComponent;
