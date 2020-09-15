import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import "./message.styles.scss";

const Message = ({ message, timestamp, user, uid, avatarName }) => {
	return (
		<div className="message">
			<Avatar size="large" className="avatar">
				{avatarName}
			</Avatar>
			<div>
				<h3 className="username">
					{user}{" "}
					<span className="timestamp">
						{new Date(timestamp?.toDate()).toUTCString()}
					</span>
				</h3>
				<p className="usermessage">{message}</p>
			</div>
		</div>
	);
};

export default Message;
