import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";
import "./contactform.styles.scss";

//importing firebase essentials for storage purpose
import { firestore } from "../../firebase";

const ContactForm = () => {
	//using state for holding the values
	const [contact, SetContact] = useState({
		name: "",
		email: "",
		phno: "",
	});

	//storage reference for firebase
	const [storageRef] = useState(firestore.collection("contacts"));

	//submit function
	const handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(contact)) {
			message.loading("please wait ..", 2);
			storageRef
				.add({
					name: contact.name,
					email: contact.email,
					phno: contact.phno,
					avatarName: contact.name.slice(0, 2).toUpperCase(),
				})
				.then((createdContact) => {
					message.success(`${contact.name} is successfully stored`, 2);
				})
				.catch((err) => {
					message.error(err, 2);
				});
			SetContact({ name: "", email: "", phno: "" });
		} else {
			SetContact({ name: "", email: "", phno: "" });
		}
	};

	//formvalidation
	const formValid = (contact) => {
		if (formEmpty(contact)) {
			message.error("Fill in all required fields");
			return false;
		}
		if (!numberValid(contact.phno)) {
			message.error("Number Incorrect, must have 10 digits");
			return false;
		} else {
			return true;
		}
	};

	//checking for required fields
	const formEmpty = ({ name, phno }) => {
		return !name.length || !phno.length;
	};

	//checking if the number is valid
	const numberValid = (phno) => {
		if (phno.length < 8 || phno.length > 10) {
			return false;
		} else {
			return true;
		}
	};

	//controlling the inputs
	const handleChange = (e) => {
		const change = e.target.name;
		switch (change) {
			case "name":
				SetContact({ ...contact, name: e.target.value });
				break;
			case "email":
				SetContact({ ...contact, email: e.target.value });
				break;
			case "phno":
				SetContact({ ...contact, phno: e.target.value });
				break;
			default:
				break;
		}
	};

	//destructured state values
	const { name, email, phno } = contact;

	//form layout constraints
	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 5,
			},
		},
		wrapperCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 12,
			},
		},
	};

	return (
		<div>
			<Form
				{...formItemLayout}
				style={{
					padding: "4rem",
				}}
				className="contactform"
			>
				<Input
					name="name"
					className="contact__formInput"
					placeholder="Contact Name"
					size="large"
					prefix={
						<UserOutlined
							size="large"
							style={{ marginRight: "8px", color: "#00c9ff" }}
						/>
					}
					type="text"
					onChange={handleChange}
					value={name}
					required
				/>
				<Input
					name="email"
					className="contact__formInput"
					placeholder="Contact Email"
					size="large"
					prefix={
						<MailOutlined
							size="large"
							style={{ marginRight: "8px", color: "#00c9ff" }}
						/>
					}
					type="email"
					onChange={handleChange}
					value={email}
				/>
				<Input
					name="phno"
					className="contact__formInput"
					placeholder="Contact Number"
					size="large"
					prefix={
						<NumberOutlined
							size="large"
							style={{ marginRight: "8px", color: "#00c9ff" }}
						/>
					}
					type="number"
					onChange={handleChange}
					value={phno}
					required
				/>
				<Button className="contact__formButton" onClick={handleSubmit}>
					Add Contact
				</Button>
			</Form>
		</div>
	);
};

export default ContactForm;
