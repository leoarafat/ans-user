// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { Avatar, Layout, Menu, Tooltip } from "antd";
// import { Bell, LogOut } from "lucide-react";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/original-logo.jpg";
// import {
//   isLoggedIn,
//   removeUserInfo,
//   storeUserInfo,
// } from "@/redux/services/auth.service";
// import { authKey } from "@/constants/storageKey";
// import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";

// import { CiMusicNote1 } from "react-icons/ci";
// import useVerification from "@/utils/isVerified";
// import useApproved from "@/utils/isApproved";
// import "./Dashboard.css";

// import { useEffect, useState } from "react";
// import { CiCircleInfo } from "react-icons/ci";
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
//   MusicIcon,
//   TriangleAlert,
//   UserIcon,
// } from "lucide-react";
// import { RiPlayListAddFill } from "react-icons/ri";
// import { MdAttachMoney } from "react-icons/md";
// import PendingReleaseIcon from "@mui/icons-material/HourglassFull";
// import { ShieldAlert } from "lucide-react";

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
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get("token");

//     if (token) {
//       storeUserInfo({ accessToken: token });
//     }
//   }, [location]);
//   useEffect(() => {
//     if (!isApproved) {
//       navigate("/pending");
//     }
//   }, []);

//   if (!isUser) {
//     navigate("/auth/login");
//   }

//   const { data: userData } = useMyProfileQuery({});
//   const myProfile = userData?.data;
//   const isUserRole = myProfile?.role === "user";
//   const isSubUser = myProfile?.role === "sub-user";

//   const handleLogout = () => {
//     removeUserInfo(authKey);
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/auth/login");
//   };

//   const logoutItem = {
//     key: "logout",
//     title: "Logout",
//     icon: <LogOut size={18} />,
//     onClick: handleLogout,
//   };
//   const menuItems = [
//     {
//       path: "/",
//       title: "Overview",
//       icon: <LayoutDashboard size={18} />,
//     },
//     {
//       path: "/upload",
//       title: "Upload Music",
//       icon: <MusicIcon size={18} />,
//     },
//     {
//       path: "/release-video",
//       title: "Upload Video",
//       icon: <VideoIcon size={18} />,
//     },
//     {
//       path: "/my-uploads",
//       title: "My Uploads",
//       icon: <RiPlayListAddFill size={18} color="#fff" />,
//       subMenu: [
//         {
//           path: "/success-track",
//           title: "Music",
//           icon: <Music4Icon size={18} color="#fff" />,
//         },
//         {
//           path: "/pending-track",
//           title: "Pending Release",
//           icon: <PendingReleaseIcon style={{ fontSize: 18, color: "white" }} />,
//         },
//         {
//           path: "/correction-track",
//           title: "Correction Request",
//           icon: <ShieldAlert size={18} style={{ color: "white" }} />,
//         },

//         {
//           path: "/videos",
//           title: "Videos",
//           icon: <VideoIcon size={18} color="white" />,
//         },

//         {
//           path: "/pending-videos",
//           title: "Pending Videos",
//           icon: <PendingReleaseIcon style={{ fontSize: 18, color: "white" }} />,
//         },
//         {
//           path: "/correction-videos",
//           title: "Correction Videos",
//           icon: <ShieldAlert size={18} style={{ color: "white" }} />,
//         },
//       ],
//     },
//     {
//       path: "/artist-management",
//       title: "Artist & Label Manage",
//       icon: <Settings2Icon size={18} />,
//     },
//     {
//       path: "/analytics",
//       title: "Analytics",
//       icon: <SiSimpleanalytics size={18} />,
//     },
//     {
//       path: "/financial",
//       title: "Financial",
//       icon: <MdAttachMoney size={18} color="#fff" />,
//       subMenu: [
//         {
//           path: "/financial-operations",
//           title: "Payment & operation",
//           icon: <MdPayments size={18} />,
//         },
//         {
//           path: "/financial-reports",
//           title: "Financial Reports",
//           icon: <SiSimpleanalytics size={18} />,
//         },
//         {
//           path: "/financial-analytics",
//           title: "Financial Analytics",
//           icon: <SiSimpleanalytics size={18} />,
//         },
//       ],
//     },
//     {
//       path: "/manage-claim",
//       title: "Claim Manage",
//       icon: <TriangleAlert size={18} color="#fff" />,
//       subMenu: [
//         {
//           path: "/tiktok",
//           title: "TikTokClaim",
//           icon: <SendHorizontal size={18} color="#fff" />,
//         },
//         {
//           path: "/fb-claim",
//           title: "FacebookClaim",
//           icon: <SendHorizontal style={{ fontSize: 18, color: "white" }} />,
//         },
//         {
//           path: "/youtube-claim",
//           title: "YoutubeClaim",
//           icon: <SendHorizontal size={18} style={{ color: "white" }} />,
//         },
//         {
//           path: "/youtube-takedown",
//           title: "YoutubeTakeDown",
//           icon: <SendHorizontal size={18} color="white" />,
//         },
//         {
//           path: "/youyube-manual-claim",
//           title: "YouTubeManualClaim",
//           icon: <SendHorizontal size={18} color="white" />,
//         },

//         {
//           path: "/fb-whitelist",
//           title: "FacebookWhiteList",
//           icon: <SendHorizontal style={{ fontSize: 18, color: "white" }} />,
//         },
//         {
//           path: "/artist-channel",
//           title: "ArtistChannelRequest",
//           icon: <SendHorizontal size={18} style={{ color: "white" }} />,
//         },
//         {
//           path: "/whitelist",
//           title: "WhiteListRequest",
//           icon: <SendHorizontal size={18} style={{ color: "white" }} />,
//         },
//       ],
//     },
//     {
//       path: "/claims",
//       title: "Legal",
//       icon: <CiCircleInfo size={18} color="white" />,
//       subMenu: [
//         {
//           path: "/artist-channel-request",
//           title: "Artist Channels",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/tikTok-claim-request",
//           title: "TikTok Claims",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/facebook-whiteList-request",
//           title: "Facebook WhiteLists",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/facebook-claim-request",
//           title: "Facebook Claim Release",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/whiteList-request",
//           title: "WhiteLists",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/youtube-claim-request",
//           title: "Youtube Claim Release",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/youtube-manual-claim",
//           title: "Youtube Manual Claims",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//         {
//           path: "/youtube-take-down",
//           title: "Youtube Take Downs",
//           icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
//         },
//       ],
//     },
//     {
//       path: "/manage-account",
//       title: "Account Details",
//       icon: <MdPayments size={18} color="#fff" />,
//       subMenu: [
//         {
//           path: "/add-account",
//           title: "Add Bank Details",
//           icon: <MdPayments size={18} />,
//         },
//         {
//           path: "/my-account",
//           title: "Account Info",
//           icon: <MdPayments size={18} />,
//         },
//       ],
//     },
//     {
//       path: "/settings",
//       title: "Settings",
//       icon: <Settings size={18} color="#fff" />,
//       subMenu: [
//         ...(isUserRole
//           ? [
//               {
//                 path: "/sub-user",
//                 title: "Manage Sub-User",
//                 icon: <UserIcon size={18} />,
//               },
//             ]
//           : []),
//         {
//           path: "/profile",
//           title: "Manage Profile",
//           icon: <Settings size={18} />,
//         },

//         {
//           path: "/change-password",
//           title: "Change password",
//           icon: <Settings size={18} />,
//         },
//       ],
//     },
//     {
//       path: "/help",
//       title: "Help",
//       icon: <HelpCircleIcon size={18} />,
//     },
//     {
//       key: "logout",
//       title: "Logout",
//       icon: <LogOut size={18} />,
//       onClick: handleLogout,
//     },
//     {
//       key: "logout",
//       title: "Logout",
//       icon: <LogOut size={18} />,
//       onClick: handleLogout,
//     },
//   ];
//   //!
//   const menuPermissions = {
//     "/": "One release",
//     "/upload": "One release",
//     "/release-video": "Video Release",
//     "/my-uploads": "Catalog Music",
//     "/success-track": "Catalog Music",
//     "/pending-track": "Catalog Music",
//     "/correction-track": "Catalog Music",
//     "/videos": "Catalog Video",
//     "/pending-videos": "Catalog Video",
//     "/correction-videos": "Catalog Video",
//     "/artist-management": "All Products (for all artists, labels, channels)",
//     "/financial": "Financial",
//     "/financial-reports": "Financial reports",
//     "/financial-operations": "Payment & Operation",
//     "/claims": "Legal",
//     "/manage-claim": "Legal",
//     "/tiktok": "Legal",
//     "/artist-channel-request": "Legal",
//     "/manage-account": "Payout Account",
//     "/add-account": "Payout Account",
//     "/settings": "Change Password",
//     "/change-password": "Change Password",
//     "/help": "Help",
//   };
//   //!

//   // //!
//   const filteredMenuItems = () => {
//     if (isUserRole && isApproved) {
//       return menuItems;
//     } else if (isSubUser) {
//       const userPermissions = myProfile.permission;

//       const filteredItems = menuItems.filter((item) => {
//         if (item.subMenu) {
//           return item.subMenu.some((subItem) => {
//             //@ts-ignore
//             const permission = menuPermissions[subItem.path];
//             return userPermissions.includes(permission);
//           });
//         } else {
//           //@ts-ignore
//           const permission = menuPermissions[item.path];
//           return userPermissions.includes(permission);
//         }
//       });
//       return [...filteredItems, logoutItem];
//     } else {
//       return [onboardingItem, logoutItem];
//     }
//   };
//   //!

//   const filteredMenuItemsList = filteredMenuItems();
//   const [collapsed, setCollapsed] = useState(false);

//   const handleToggle = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <Layout style={{ height: "100vh", backgroundColor: "#1a1a1a" }}>
//       <Sider
//         width={280}
//         style={{
//           overflow: "auto",
//           background: "#2e2e2e",
//           boxShadow: "2px 0 12px rgba(0, 0, 0, 0.8)",
//         }}
//         collapsible
//         collapsed={collapsed}
//         onCollapse={handleToggle}
//       >
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Company Logo"
//             style={{
//               width: collapsed ? "50px" : "170px",
//               margin: "20px auto",
//               display: "block",
//               transition: "width 0.3s",
//             }}
//           />
//         </Link>
//         <Menu
//           mode="inline"
//           style={{
//             background: "#2e2e2e",
//             color: "#d0d0d0",
//             border: "none",
//           }}
//           defaultSelectedKeys={["1"]}
//         >
//           {filteredMenuItemsList?.map((item, index) =>
//             //@ts-ignore
//             item.subMenu ? (
//               <SubMenu
//                 key={`sub-${index}`}
//                 icon={item.icon}
//                 title={item.title}
//                 style={{
//                   color: "#fff",
//                   fontSize: "14px",
//                   marginBottom: "15px",
//                 }}
//               >
//                 {
//                   //@ts-ignore
//                   item.subMenu.map((subItem, subIndex) => (
//                     <Menu.Item
//                       key={`sub-${index}-${subIndex}`}
//                       icon={subItem.icon}
//                       style={{
//                         color: "#d0d0d0",
//                         fontSize: "14px",
//                         margin: "5px 0",
//                         backgroundColor: collapsed ? "#2e2e2e" : "",
//                       }}
//                     >
//                       <Link
//                         to={
//                           //@ts-ignore
//                           `${item.path}${subItem.path}`
//                         }
//                       >
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
//                   color: "#d0d0d0",
//                   fontSize: "14px",
//                   marginBottom: "15px",
//                 }}
//                 onClick={
//                   //@ts-ignore
//                   item.onClick
//                 }
//               >
//                 <Link
//                   to={
//                     //@ts-ignore
//                     item.path
//                   }
//                 >
//                   {item.title}
//                 </Link>
//               </Menu.Item>
//             )
//           )}
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             background: "#1a1a1a",
//             borderBottom: "1px solid #3a3a3a",
//             padding: "0 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             height: "80px",
//           }}
//         >
//           <Tooltip title="Toggle Menu">
//             <button
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#d0d0d0",
//                 cursor: "pointer",
//               }}
//               onClick={handleToggle}
//             >
//               {collapsed ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
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
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </Tooltip>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {isVerifiedUser && (
//               <>
//                 <Tooltip title="Notifications">
//                   <Link to="/notifications" style={{ marginRight: "20px" }}>
//                     <Bell size={24} color="#d0d0d0" />
//                   </Link>
//                 </Tooltip>
//                 {isApproved && (
//                   <Tooltip title="Profile">
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <Link to="/settings/profile">
//                         <Avatar
//                           src={`${myProfile?.image}`}
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             border: "2px solid #d0d0d0",
//                           }}
//                         />
//                       </Link>
//                       <Link
//                         to="/settings/profile"
//                         style={{
//                           marginLeft: "10px",
//                           color: "#d0d0d0",
//                           textDecoration: "none",
//                         }}
//                       >
//                         <div style={{ fontSize: "14px", fontWeight: "bold" }}>
//                           {myProfile?.name}
//                         </div>
//                       </Link>
//                     </div>
//                   </Tooltip>
//                 )}
//               </>
//             )}
//           </div>
//         </Header>
//         <Content
//           style={{
//             // background: "#1f1f1f",
//             padding: "20px",
//             height: "calc(100vh - 80px)",
//             overflowY: "auto",
//           }}
//         >
//           <div
//             style={{
//               // background: "#2a2a2a",
//               borderRadius: "8px",
//               padding: "20px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
//             }}
//           >
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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/original-logo.jpg";
import {
  isLoggedIn,
  removeUserInfo,
  storeUserInfo,
} from "@/redux/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";

import { CiMusicNote1 } from "react-icons/ci";
import useVerification from "@/utils/isVerified";
import useApproved from "@/utils/isApproved";
import "./Dashboard.css";

import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { MdPayments } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import {
  Settings,
  Music4Icon,
  Settings2Icon,
  YoutubeIcon,
  HelpCircleIcon,
  LayoutDashboard,
  VideoIcon,
  SendHorizontal,
  MusicIcon,
  TriangleAlert,
  UserIcon,
} from "lucide-react";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import PendingReleaseIcon from "@mui/icons-material/HourglassFull";
import { ShieldAlert } from "lucide-react";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

// Define your onboarding item
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      storeUserInfo({ accessToken: token });
    }
  }, [location]);

  useEffect(() => {
    if (!isApproved) {
      navigate("/pending");
    }
  }, [isApproved, navigate]);

  if (!isUser) {
    navigate("/auth/login");
  }

  const { data: userData } = useMyProfileQuery({});
  const myProfile = userData?.data;
  const isUserRole = myProfile?.role === "user";
  const isSubUser = myProfile?.role === "sub-user";

  const handleLogout = () => {
    removeUserInfo(authKey);
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/auth/login");
  };

  const logoutItem = {
    key: "logout",
    title: "Logout",
    icon: <LogOut size={18} />,
    onClick: handleLogout,
  };

  const menuItems = [
    {
      path: "/",
      title: "Overview",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/upload",
      title: "Upload Music",
      icon: <MusicIcon size={18} />,
    },
    {
      path: "/release-video",
      title: "Upload Video",
      icon: <VideoIcon size={18} />,
    },
    {
      path: "/my-uploads",
      title: "My Uploads",
      icon: <RiPlayListAddFill size={18} color="#fff" />,
      subMenu: [
        {
          path: "/success-track",
          title: "Music",
          icon: <Music4Icon size={18} color="#fff" />,
        },
        {
          path: "/pending-track",
          title: "Pending Release",
          icon: <PendingReleaseIcon style={{ fontSize: 18, color: "white" }} />,
        },
        {
          path: "/correction-track",
          title: "Correction Request",
          icon: <ShieldAlert size={18} style={{ color: "white" }} />,
        },
        {
          path: "/videos",
          title: "Videos",
          icon: <VideoIcon size={18} color="white" />,
        },
        {
          path: "/pending-videos",
          title: "Pending Videos",
          icon: <PendingReleaseIcon style={{ fontSize: 18, color: "white" }} />,
        },
        {
          path: "/correction-videos",
          title: "Correction Videos",
          icon: <ShieldAlert size={18} style={{ color: "white" }} />,
        },
      ],
    },
    {
      path: "/artist-management",
      title: "Artist & Label Manage",
      icon: <Settings2Icon size={18} />,
    },
    {
      path: "/analytics",
      title: "Analytics",
      icon: <SiSimpleanalytics size={18} />,
    },
    {
      path: "/financial",
      title: "Financial",
      icon: <MdAttachMoney size={18} color="#fff" />,
      subMenu: [
        {
          path: "/financial-operations",
          title: "Payment & operation",
          icon: <MdPayments size={18} />,
        },
        {
          path: "/financial-reports",
          title: "Financial Reports",
          icon: <SiSimpleanalytics size={18} />,
        },
        {
          path: "/financial-analytics",
          title: "Financial Analytics",
          icon: <SiSimpleanalytics size={18} />,
        },
      ],
    },
    {
      path: "/manage-claim",
      title: "Claim Manage",
      icon: <TriangleAlert size={18} color="#fff" />,
      subMenu: [
        {
          path: "/tiktok",
          title: "TikTokClaim",
          icon: <SendHorizontal size={18} color="#fff" />,
        },
        {
          path: "/fb-claim",
          title: "FacebookClaim",
          icon: <SendHorizontal style={{ fontSize: 18, color: "white" }} />,
        },
        {
          path: "/youtube-claim",
          title: "YoutubeClaim",
          icon: <SendHorizontal size={18} style={{ color: "white" }} />,
        },
        // {
        //   path: "/youtube-takedown",
        //   title: "YoutubeTakeDown",
        //   icon: <SendHorizontal size={18} color="white" />,
        // },
        {
          path: "/youyube-manual-claim",
          title: "YouTubeManualClaim",
          icon: <SendHorizontal size={18} color="white" />,
        },
        {
          path: "/fb-whitelist",
          title: "FacebookWhiteList",
          icon: <SendHorizontal style={{ fontSize: 18, color: "white" }} />,
        },
        {
          path: "/artist-channel",
          title: "ArtistChannelRequest",
          icon: <SendHorizontal size={18} style={{ color: "white" }} />,
        },
        {
          path: "/whitelist",
          title: "WhiteListRequest",
          icon: <SendHorizontal size={18} style={{ color: "white" }} />,
        },
      ],
    },
    {
      path: "/claims",
      title: "Legal",
      icon: <CiCircleInfo size={18} color="white" />,
      subMenu: [
        {
          path: "/artist-channel-request",
          title: "Artist Channels",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/tikTok-claim-request",
          title: "TikTok Claims",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/facebook-whiteList-request",
          title: "Facebook WhiteLists",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/facebook-claim-request",
          title: "Facebook Claim Release",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/whiteList-request",
          title: "WhiteLists",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/youtube-claim-request",
          title: "Youtube Claim Release",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/youtube-manual-claim",
          title: "Youtube Manual Claims",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
        {
          path: "/youtube-take-down",
          title: "Youtube Take Downs",
          icon: <PendingReleaseIcon style={{ fontSize: 20, color: "white" }} />,
        },
      ],
    },
    {
      path: "/manage-account",
      title: "Account Details",
      icon: <MdPayments size={18} color="#fff" />,
      subMenu: [
        {
          path: "/add-account",
          title: "Add Bank Details",
          icon: <MdPayments size={18} />,
        },
        {
          path: "/my-account",
          title: "Account Info",
          icon: <MdPayments size={18} />,
        },
      ],
    },
    {
      path: "/settings",
      title: "Settings",
      icon: <Settings size={18} color="#fff" />,
      subMenu: [
        ...(isUserRole
          ? [
              {
                path: "/sub-user",
                title: "Manage Sub-User",
                icon: <UserIcon size={18} />,
              },
            ]
          : []),
        {
          path: "/profile",
          title: "Manage Profile",
          icon: <Settings size={18} />,
        },
        {
          path: "/change-password",
          title: "Change password",
          icon: <Settings size={18} />,
        },
      ],
    },
    {
      path: "/help",
      title: "Help",
      icon: <HelpCircleIcon size={18} />,
    },
    {
      key: "logout",
      title: "Logout",
      icon: <LogOut size={18} />,
      onClick: handleLogout,
    },
  ];

  const menuPermissions = {
    "/": "One release",
    "/upload": "One release",
    "/release-video": "Video Release",
    "/my-uploads": "Catalog Music",
    "/success-track": "Catalog Music",
    "/pending-track": "Catalog Music",
    "/correction-track": "Catalog Music",
    "/videos": "Catalog Video",
    "/pending-videos": "Catalog Video",
    "/correction-videos": "Catalog Video",
    "/artist-management": "All Products (for all artists, labels, channels)",
    "/financial": "Financial",
    "/financial-reports": "Financial reports",
    "/financial-operations": "Payment & Operation",
    "/claims": "Legal",
    "/manage-claim": "Legal",
    "/tiktok": "Legal",
    "/artist-channel-request": "Legal",
    "/manage-account": "Payout Account",
    "/add-account": "Payout Account",
    "/settings": "Change Password",
    "/change-password": "Change Password",
    "/help": "Help",
  };

  const filteredMenuItems = () => {
    if (isUserRole && isApproved) {
      return menuItems;
    } else if (isSubUser) {
      const userPermissions = myProfile.permission;

      const filteredItems = menuItems.filter((item) => {
        if (item.subMenu) {
          return item.subMenu.some((subItem) => {
            //@ts-ignore
            const permission = menuPermissions[subItem.path];
            return userPermissions.includes(permission);
          });
        } else {
          //@ts-ignore
          const permission = menuPermissions[item.path];
          return userPermissions.includes(permission);
        }
      });
      return [...filteredItems, logoutItem];
    } else {
      return [onboardingItem, logoutItem];
    }
  };

  const filteredMenuItemsList = filteredMenuItems();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
    // style={{ height: "100vh" }}
    >
      <Sider
        width={280}
        className="sidebar-gradient"
        style={{
          overflow: "auto",
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
              width: collapsed ? "50px" : "170px",
              margin: "20px auto",
              display: "block",
              transition: "width 0.3s",
            }}
          />
        </Link>
        <Menu
          mode="inline"
          style={{
            background: "transparent",
            color: "#d0d0d0",
            border: "none",
          }}
          defaultSelectedKeys={["1"]}
        >
          {filteredMenuItemsList?.map((item, index) =>
            //@ts-ignore
            item.subMenu ? (
              <SubMenu
                key={`sub-${index}`}
                icon={item.icon}
                title={item.title}
                className="submenu-title"
              >
                {
                  //@ts-ignore
                  item.subMenu.map((subItem, subIndex) => (
                    <Menu.Item
                      key={`sub-${index}-${subIndex}`}
                      icon={subItem.icon}
                      className="submenu-item"
                    >
                      <Link
                        to={
                          //@ts-ignore
                          `${item.path}${subItem.path}`
                        }
                      >
                        {subItem.title}
                      </Link>
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            ) : (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                className="menu-item"
                onClick={
                  //@ts-ignore
                  item.onClick
                }
              >
                <Link
                  to={
                    //@ts-ignore
                    item.path
                  }
                >
                  {item.title}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header className="header-gradient">
          <div className="header-content">
            <Tooltip title="Toggle Menu">
              <button className="toggle-button" onClick={handleToggle}>
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
            <div className="header-right">
              {isVerifiedUser && (
                <>
                  <Tooltip title="Notifications">
                    <Link to="/notifications" className="notification-icon">
                      <Bell size={24} color="#d0d0d0" />
                    </Link>
                  </Tooltip>
                  {isApproved && (
                    <Tooltip title="Profile">
                      <div className="profile-section">
                        <Link to="/settings/profile">
                          <Avatar
                            src={`${myProfile?.image}`}
                            className="profile-avatar"
                          />
                        </Link>
                        <Link to="/settings/profile" className="profile-name">
                          <div>{myProfile?.name}</div>
                        </Link>
                      </div>
                    </Tooltip>
                  )}
                </>
              )}
            </div>
          </div>
        </Header>
        <Content className="content-background">
          <div className="content-card">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
