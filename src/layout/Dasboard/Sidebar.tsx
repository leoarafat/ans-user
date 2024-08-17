// // import { Layout, Menu } from "antd";
// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { menuItems } from "./menuItems";
// // import logo from "../../assets/logo.png";
// // const { Sider } = Layout;

// // const SideBar = () => {
// //   const [collapsed, setCollapsed] = useState(false);

// //   const renderMenuItems = (items) => {
// //     return items.map((item) => {
// //       if (item.children) {
// //         return (
// //           <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
// //             {renderMenuItems(item.children)}
// //           </Menu.SubMenu>
// //         );
// //       }
// //       return (
// //         <Menu.Item key={item.key} icon={item.icon}>
// //           <Link to={item.path}>{item.title}</Link>
// //         </Menu.Item>
// //       );
// //     });
// //   };

// //   return (
// //     <Sider
// //       collapsible
// //       collapsed={collapsed}
// //       onCollapse={(value) => setCollapsed(value)}
// //       width={280}
// //       style={{
// //         overflow: "auto",
// //         height: "100vh",
// //         position: "sticky",
// //         left: 0,
// //         top: 0,
// //         bottom: 0,
// //         background: "#03008D",
// //       }}
// //     >
// //       <div
// //         style={{
// //           color: "white",
// //           fontSize: "2rem",
// //           textAlign: "center",
// //           fontWeight: "bold",
// //           marginBottom: ".5rem",
// //           padding: "10px 0px",
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           background: "#03008D",
// //         }}
// //       >
// //         <img
// //           src={logo}
// //           alt="logo"
// //           style={{
// //             width: collapsed ? "40px" : "100px",
// //             height: collapsed ? "40px" : "100px",
// //             borderRadius: "50%",
// //             marginBottom: "10px",
// //           }}
// //         />
// //       </div>
// //       <Menu
// //         style={{
// //           background: "#03008D",
// //         }}
// //         mode="inline"
// //       >
// //         {renderMenuItems(menuItems)}
// //       </Menu>
// //     </Sider>
// //   );
// // };

// // export default SideBar;
// import { Layout, Menu } from "antd";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { CiCircleInfo, CiMusicNote1 } from "react-icons/ci";
// import { MdPayments } from "react-icons/md";
// import { SiSimpleanalytics } from "react-icons/si";
// import {
//   Settings,
//   Music4Icon,
//   Settings2Icon,
//   YoutubeIcon,
//   HelpCircleIcon,
//   LayoutDashboard,
//   VideoIcon,
//   SendHorizontal,
//   LogOut,
// } from "lucide-react";
// import { RiPlayListAddFill } from "react-icons/ri";
// import { MdAttachMoney } from "react-icons/md";
// import PendingReleaseIcon from "@mui/icons-material/HourglassFull";
// import { ShieldAlert } from "lucide-react";
// import logo from "../../assets/logo.png";
// import { isLoggedIn, removeUserInfo } from "@/redux/services/auth.service";
// import { authKey } from "@/constants/storageKey";
// import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
// import useVerification from "@/utils/isVerified";
// import useApproved from "@/utils/isApproved";
// import { menuItems } from "./menuItems";

// const { Sider } = Layout;

// const SideBar = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const isUser = isLoggedIn();
//   const userInfo = useVerification();
//   const userVerifiedInfo = useApproved();
//   const isVerifiedUser = userInfo?.isVerified;
//   const isApproved = userVerifiedInfo?.isApproved;

//   const { data: userData } = useMyProfileQuery({});

//   const handleLogout = () => {
//     removeUserInfo(authKey);
//     navigate("/auth/login");
//   };

//   const logoutItem = {
//     key: "logout",
//     title: "Logout",
//     icon: <LogOut size={18} />,
//     onClick: handleLogout,
//   };

//   const onboardingItem = {
//     path: "/verify",
//     title: "Onboarding",
//     icon: <CiMusicNote1 size={18} />,
//   };

//   const filteredMenuItems =
//     isVerifiedUser && isApproved
//       ? [...menuItems, logoutItem]
//       : [onboardingItem, logoutItem];

//   const renderMenuItems = (items) => {
//     return items.map((item) => {
//       if (item.children) {
//         return (
//           <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
//             {renderMenuItems(item.children)}
//           </Menu.SubMenu>
//         );
//       }
//       return (
//         <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
//           <Link to={item.path}>{item.title}</Link>
//         </Menu.Item>
//       );
//     });
//   };

//   return (
//     <Sider
//       collapsible
//       collapsed={collapsed}
//       onCollapse={(value) => setCollapsed(value)}
//       width={280}
//       style={{
//         overflow: "auto",
//         height: "100vh",
//         position: "sticky",
//         left: 0,
//         top: 0,
//         bottom: 0,
//         background: "#03008D",
//       }}
//     >
//       <div
//         style={{
//           color: "white",
//           fontSize: "2rem",
//           textAlign: "center",
//           fontWeight: "bold",
//           marginBottom: ".5rem",
//           padding: "10px 0px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           background: "#03008D",
//         }}
//       >
//         <img
//           src={logo}
//           alt="logo"
//           style={{
//             width: collapsed ? "40px" : "100px",
//             height: collapsed ? "40px" : "100px",
//             borderRadius: "50%",
//             marginBottom: "10px",
//           }}
//         />
//       </div>
//       <Menu
//         style={{
//           background: "#03008D",
//         }}
//         mode="inline"
//       >
//         {renderMenuItems(filteredMenuItems)}
//       </Menu>
//     </Sider>
//   );
// };

// export default SideBar;
