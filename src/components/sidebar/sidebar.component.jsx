import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
	UserAddOutlined,
	ContactsOutlined,
	MailOutlined,
} from "@ant-design/icons";
import "./sidebar.styles.scss";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = ({ contacts }) => {
	const defaultUser = useSelector((state) => state.currentUser);
	const history = useHistory();
	const [page, setPage] = useState();

	const handlePage = (e) => {
		setPage(e.key);
		let selected = e.key;
		if (selected.length > 5) {
			history.push(`/user/${selected}`);
		} else if (selected === "add") {
			history.push("/");
		} else {
			history.push(`/user/${selected}`);
		}
	};

	const messagable = contacts.filter((contact) => contact.name !== defaultUser);

	return (
		<Sider
			className="sidebar__sider"
			breakpoint="lg"
			collapsedWidth="0"
			onBreakpoint={(broken) => {
				// console.log(broken);
			}}
			onCollapse={(collapsed, type) => {
				// console.log(collapsed, type);
			}}
		>
			<Menu
				className="sidebar__menu"
				mode="inline"
				theme="dark"
				defaultSelectedKeys={[page]}
			>
				<Menu.Item key="add" icon={<UserAddOutlined className="addlogo" />}>
					<Link to="/">Add Contact</Link>
				</Menu.Item>
				<Menu.Item key="view" icon={<ContactsOutlined className="viewlogo" />}>
					<Link to="/viewcontacts">View Contacts</Link>
				</Menu.Item>
				<SubMenu
					key="message"
					title="Direct Messages"
					icon={<MailOutlined className="messagelogo" />}
				>
					{messagable.map((contact) => (
						<Menu.Item
							key={contact.id}
							onClick={handlePage}
							className="contactDisplay"
						>
							<span className="contact">@</span>
							{contact.name}
						</Menu.Item>
					))}
				</SubMenu>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
