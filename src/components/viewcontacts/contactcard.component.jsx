import React, { useState } from "react";
import { Skeleton, Card, Avatar, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { firestore } from "../../firebase";
const { Meta } = Card;

const ContactCard = ({ contact, loading, deleteContact }) => {
	const [edit, setEdit] = useState(false);
	const [contactRef] = useState(
		firestore.collection("contacts").doc(contact.id)
	);

	const handleEdit = () => {
		setEdit(!edit);
	};

	const [contactu, setContactu] = useState({
		name: contact.name,
		email: contact.email,
		avatarName: contact.avatarName,
		phno: contact.phno,
	});

	const handleChange = (e) => {
		const change = e.target.name;
		switch (change) {
			case "name":
				setContactu({ ...contactu, name: e.target.value });
				break;

			case "email":
				setContactu({ ...contactu, email: e.target.value });
				break;

			case "phno":
				setContactu({ ...contactu, phno: e.target.value });
				break;

			default:
				break;
		}
	};

	const handleSubmit = () => {
		contactRef.set({
			...contactu,
			name: contactu.name,
			phno: contactu.phno,
			email: contactu.email,
		});
		setEdit(!edit);
	};

	const handleDelete = () => {
		contactRef.delete();
		deleteContact();
	};

	const inputStyle = {
		marginTop: "4px",
	};

	return (
		<div>
			<Card
				key={contact.id}
				style={{
					width: 285,
					margin: "2rem",
					border: "1px solid  #0a1a206c",
					borderRadius: "4px",
				}}
				actions={[
					!edit ? (
						<EditOutlined key={`edit${contact.id}`} onClick={handleEdit} />
					) : (
						<Button onClick={handleSubmit}>Update</Button>
					),
					<DeleteOutlined key={`delete${contact.id}`} onClick={handleDelete} />,
				]}
			>
				<Skeleton loading={loading} avatar>
					<Meta
						style={{ textAlign: "left" }}
						avatar={
							<Avatar size="large" style={{ background: "#124f45" }}>
								{contactu.avatarName}
							</Avatar>
						}
						title={
							<Input
								name="name"
								value={contactu.name}
								bordered={edit}
								size="medium"
								onChange={handleChange}
							/>
						}
						description={
							<div>
								<Input
									name="phno"
									value={contactu.phno}
									bordered={edit}
									size="medium"
									style={inputStyle}
									onChange={handleChange}
								/>
								<Input
									name="email"
									value={contactu.email}
									bordered={edit}
									size="medium"
									style={inputStyle}
									placeholder=" email"
									onChange={handleChange}
								/>
							</div>
						}
					/>
				</Skeleton>
			</Card>
		</div>
	);
};

export default ContactCard;
