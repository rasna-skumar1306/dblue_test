import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions/userActions";

const { Header } = Layout;
const { SubMenu } = Menu;

const HeaderComponent = ({ contacts }) => {
	const defaultUser = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	//eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState("Select User");

	const useCurrentUser = (e) => {
		setCurrentUser(e.item.props.id);
		dispatch(setUser(e.item.props.id));
	};
	return (
		<div className="header">
			<Header
				style={{
					background: "#000f",
					alignItems: "center",
					display: "flex",
					paddingLeft: "1.35rem",
					justifyContent: "space-between",
				}}
			>
				<div>
					<h1 style={{ color: "white", fontSize: "1.4rem" }}>
						<img
							src="https://www.doodleblue.com/_nuxt/img/d503413.svg"
							alt="doodleblue logo"
							style={{ width: "9rem" }}
						/>
						's Contact Book
					</h1>
				</div>
				<Menu theme="dark" mode="horizontal" style={{ background: "#000f" }}>
					<SubMenu title={defaultUser}>
						{contacts.map((contact) => (
							<Menu.Item
								key={contact.id}
								id={contact.name}
								onClick={useCurrentUser}
								style={{ background: "#0005" }}
							>
								{contact.name}
							</Menu.Item>
						))}
					</SubMenu>
				</Menu>
			</Header>
		</div>
	);
};

export default HeaderComponent;
