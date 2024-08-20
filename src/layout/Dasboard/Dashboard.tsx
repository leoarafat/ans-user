// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { Avatar, Layout, Menu } from "antd";
// import { Bell, LogOut } from "lucide-react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { isLoggedIn, removeUserInfo } from "@/redux/services/auth.service";
// import { authKey } from "@/constants/storageKey";
// import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
// import { imageURL } from "@/redux/api/baseApi";
// import { CiMusicNote1 } from "react-icons/ci";
// import useVerification from "@/utils/isVerified";
// import useApproved from "@/utils/isApproved";
// import "./Dashboard.css";
// import { menuItems } from "./menuItems";
// import { useEffect, useState } from "react";
// const { Header, Sider, Content } = Layout;

// const { SubMenu } = Menu;

// const onboardingItem = {
//   path: "/verify",
//   title: "Onboarding",
//   icon: <CiMusicNote1 size={18} />,
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const isUser = isLoggedIn();
//   const userInfo = useVerification();
//   const userVerifiedInfo = useApproved();
//   const isVerifiedUser = userInfo?.isVerified;
//   const isApproved = userVerifiedInfo?.isApproved;

//   if (!isUser) {
//     navigate("/auth/login");
//   }

//   useEffect(() => {
//     if (!isApproved) {
//       navigate("/pending");
//     }
//   }, []);

//   const { data: userData } = useMyProfileQuery({});
//   const myProfile = userData?.data;

//   const handleLogout = () => {
//     removeUserInfo(authKey);
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//     navigate("/auth/login");
//   };

//   // Add the logout item
//   const logoutItem = {
//     key: "logout",
//     title: "Logout",
//     icon: <LogOut size={18} />,
//     onClick: handleLogout,
//   };

//   const filteredMenuItems =
//     isVerifiedUser && isApproved
//       ? [...menuItems, logoutItem]
//       : [onboardingItem, logoutItem];

//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggle = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <Layout>
//       <Sider
//         width={300}
//         className="sidebar-menu"
//         style={{
//           overflow: "auto",
//           height: "100vh",
//           zIndex: 2,
//           backgroundColor: "#55679C",
//         }}
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         onCollapse={handleToggle}
//         breakpoint="lg"
//       >
//         <Link to={"/"}>
//           <img src={logo} alt="" className="mx-auto  mb-8 mt-5" />
//         </Link>

//         <Menu
//           mode="inline"
//           style={{ background: "#55679C", color: "white" }}
//           defaultSelectedKeys={["1"]}
//         >
//           {filteredMenuItems.map((item, index) =>
//             //@ts-ignore
//             item.subMenu ? (
//               <SubMenu
//                 key={`sub-${index}`}
//                 icon={item.icon}
//                 style={{ color: "#fff", fontSize: "16px" }}
//                 title={item.title}
//               >
//                 {
//                   //@ts-ignore
//                   item.subMenu.map((subItem, subIndex) => (
//                     <Menu.Item
//                       key={`sub-${index}-${subIndex}`}
//                       icon={subItem.icon}
//                       style={{
//                         color: "#fff",
//                         fontSize: "16px",
//                         marginBottom: "10px",
//                         background: "#1E2A5E",
//                       }}
//                     >
//                       <Link to={`${item.path}${subItem.path}`}>
//                         {subItem.title}
//                       </Link>
//                     </Menu.Item>
//                   ))
//                 }
//               </SubMenu>
//             ) : (
//               <Menu.Item
//                 key={`item-${index}`}
//                 icon={item.icon}
//                 style={{
//                   color: "#fff",
//                   fontSize: "16px",
//                   marginBottom: "10px",
//                 }}
//                 onClick={item.onClick}
//               >
//                 <Link to={item.path}>{item.title}</Link>
//               </Menu.Item>
//             )
//           )}
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             background: "#55679C",
//             height: "80px",
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <div className="flex items-center gap-5">
//             {isVerifiedUser && (
//               <>
//                 {/* <Badge count={11}>
//                   <Link to={"/notifications"}>
//                     <Bell size={30} color="#fff" />
//                   </Link>
//                 </Badge> */}
//                 <div className="flex items-center gap-2">
//                   <Link to={"/settings/profile"}>
//                     <Avatar
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: "#87d068",
//                       }}
//                       src={`${imageURL}/${myProfile?.image}`}
//                     />
//                   </Link>
//                   <Link
//                     className="flex justify-between items-center hidden lg:flex"
//                     to={"/settings/profile"}
//                   >
//                     <h2 className="text-lg text-white">{myProfile?.name}</h2>
//                     <p className="text-small text-white">
//                       ({myProfile?.clientId})
//                     </p>
//                   </Link>
//                 </div>
//               </>
//             )}
//             <button
//               className="lg:hidden flex justify-center items-center w-8 h-8 bg-white rounded-full"
//               onClick={handleToggle}
//             >
//               {collapsed ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </Header>
//         <Content
//           style={{
//             background: "#cec9ff",
//             height: `calc(100vh - 80px)`,
//           }}
//         >
//           <div className="bg-white h-[calc(100vh-100px)] m-2 rounded p-3 overflow-y-auto">
//             <Outlet />
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Dashboard;
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, Layout, Menu, Tooltip } from "antd";
import { Bell, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { isLoggedIn, removeUserInfo } from "@/redux/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
import { imageURL } from "@/redux/api/baseApi";
import { CiMusicNote1 } from "react-icons/ci";
import useVerification from "@/utils/isVerified";
import useApproved from "@/utils/isApproved";
import "./Dashboard.css";
import { menuItems } from "./menuItems";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const onboardingItem = {
  path: "/verify",
  title: "Onboarding",
  icon: <CiMusicNote1 size={18} />,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const isUser = isLoggedIn();
  const userInfo = useVerification();
  const userVerifiedInfo = useApproved();
  const isVerifiedUser = userInfo?.isVerified;
  const isApproved = userVerifiedInfo?.isApproved;

  if (!isUser) {
    navigate("/auth/login");
  }

  useEffect(() => {
    if (!isApproved) {
      navigate("/pending");
    }
  }, []);

  const { data: userData } = useMyProfileQuery({});
  const myProfile = userData?.data;

  const handleLogout = () => {
    removeUserInfo(authKey);
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
    navigate("/auth/login");
  };

  const logoutItem = {
    key: "logout",
    title: "Logout",
    icon: <LogOut size={18} />,
    onClick: handleLogout,
  };

  const filteredMenuItems =
    isVerifiedUser && isApproved
      ? [...menuItems, logoutItem]
      : [onboardingItem, logoutItem];

  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: "100vh", backgroundColor: "#1a1a1a" }}>
      <Sider
        width={280}
        style={{
          overflow: "auto",
          background: "#2e2e2e",
          boxShadow: "2px 0 12px rgba(0, 0, 0, 0.8)",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={handleToggle}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Company Logo"
            style={{
              width: collapsed ? "50px" : "120px",
              margin: "20px auto",
              display: "block",
              transition: "width 0.3s",
            }}
          />
        </Link>
        <Menu
          mode="inline"
          style={{
            background: "#2e2e2e",
            color: "#d0d0d0",
            border: "none",
          }}
          defaultSelectedKeys={["1"]}
        >
          {filteredMenuItems.map((item, index) =>
            item.subMenu ? (
              <SubMenu
                key={`sub-${index}`}
                icon={item.icon}
                title={item.title}
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Menu.Item
                    key={`sub-${index}-${subIndex}`}
                    icon={subItem.icon}
                    style={{
                      color: "#d0d0d0",
                      fontSize: "14px",
                      margin: "5px 0",
                    }}
                  >
                    <Link to={`${item.path}${subItem.path}`}>
                      {subItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                style={{
                  color: "#d0d0d0",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
                onClick={item.onClick}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#1a1a1a",
            borderBottom: "1px solid #3a3a3a",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          <Tooltip title="Toggle Menu">
            <button
              style={{
                background: "none",
                border: "none",
                color: "#d0d0d0",
                cursor: "pointer",
              }}
              onClick={handleToggle}
            >
              {collapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </Tooltip>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isVerifiedUser && (
              <>
                <Tooltip title="Notifications">
                  <Link to="/notifications" style={{ marginRight: "20px" }}>
                    <Bell size={24} color="#d0d0d0" />
                  </Link>
                </Tooltip>
                <Tooltip title="Profile">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/settings/profile">
                      <Avatar
                        src={`${imageURL}/${myProfile?.image}`}
                        style={{
                          width: "40px",
                          height: "40px",
                          border: "2px solid #d0d0d0",
                        }}
                      />
                    </Link>
                    <Link
                      to="/settings/profile"
                      style={{
                        marginLeft: "10px",
                        color: "#d0d0d0",
                        textDecoration: "none",
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {myProfile?.name}
                      </div>
                      {/* <div style={{ fontSize: "12px", color: "#a0a0a0" }}>
                        ({myProfile?.clientId})
                      </div> */}
                    </Link>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        </Header>
        <Content
          style={{
            // background: "#1f1f1f",
            padding: "20px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              // background: "#2a2a2a",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
