import React, { useState } from "react";
import Form from "antd/lib/form/Form";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import firebase, { firestore } from "../../firebase";
import { SendOutlined } from "@ant-design/icons";

const ChatInput = ({ chatid, contacts }) => {
	const [message, setMessage] = useState("");
	const [chatRef] = useState(firestore.collection("contacts"));
	const user = useSelector((state) => state.currentUser);
	const avatar = user.slice(0, 2).toUpperCase();

	let sender = contacts.filter((contact) => contact.name === user);
	console.log(sender[0]?.id);
	const sendMessage = (e) => {
		e.preventDefault();
		if (chatid) {
			chatRef.doc(chatid).collection("messages").add({
				message: message,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user,
				avatarName: avatar,
			});
			chatRef.doc(sender[0]?.id).collection("messages").add({
				message: message,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user,
				avatarName: avatar,
			});

			setMessage("");
		}
	};
	return (
		<div>
			<Form className="chat__input">
				<Input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></Input>
				<Button
					onClick={sendMessage}
					className="chat__btn"
					icon={<SendOutlined />}
				>
					Send
				</Button>
			</Form>
		</div>
	);
};

export default ChatInput;
