import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import "./chat.styles.scss";
import Message from "./message.component";

import ChatInput from "./chatinput.component";

const { Header, Content } = Layout;

const ChatComponent = () => {
	const { uid } = useParams();
	const [chatRef] = useState(firestore.collection("contacts"));
	const [chatDetails, setChatDetails] = useState(null);
	const [chatMessages, setChatMessages] = useState(null);

	useEffect(() => {
		if (uid) {
			chatRef
				.doc(uid)
				.onSnapshot((snapshot) => setChatDetails(snapshot.data()));
		}

		chatRef
			.doc(uid)
			.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) =>
				setChatMessages(snapshot.docs.map((doc) => doc.data()))
			);

		//eslint-disable-next-line
	}, [uid]);

	return (
		<div>
			<Header className="chat__header">
				<h2 style={{ color: "black" }}>@{chatDetails?.name}</h2>
			</Header>
			<Content>
				{chatMessages?.map(({ message, timestamp, user, avatarName }) => (
					<Message
						message={message}
						timestamp={timestamp}
						user={user}
						avatarName={avatarName}
						key={timestamp}
					/>
				))}
				<ChatInput chatid={uid} />
			</Content>
		</div>
	);
};

export default ChatComponent;
