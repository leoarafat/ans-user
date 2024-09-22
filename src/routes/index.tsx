import Auth from "@/layout/Auth/Auth";
import Dashboard from "@/layout/Dasboard/Dashboard";
import ChangePassword from "@/pages/ChangePassword";
import ForgetPassword from "@/pages/ForgetPassword";
import NotificationList from "@/pages/Notification";
import Profile from "@/pages/Profile";
import SetNewPassword from "@/pages/SetNewPassword";
import Settings from "@/pages/Settings";
import VerifyEmail from "@/pages/VerifyEmail";
import StepperForm from "@/components/SteperForm/SetperForm";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import Verify from "@/components/Active-User/ActiveUser";
import { createBrowserRouter } from "react-router-dom";
import IsVerifiedRoutes from "./VerifiedRoutes/VerifyProtect";
import ArtistLabelManagement from "@/components/ArtisLabelManagement/ArtisLabelManagement";
import HelpPage from "@/components/Help/Help";
import ManageAccount from "@/components/ManageAccount/ManageAccount";
import DashboardHome from "@/components/DashboardHome/DashboardHome";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import UploadVideo from "@/components/Uplaods/UplaodVideo/UploadVideo";
import AnalyticsPage from "@/components/Analytics/AnalyticsPage";
import FinancialAnalytics from "@/components/Financial/FinancialAnalytics";
import FinancialReports from "@/components/Financial/FinancialReports";
import AccountDetails from "@/components/ManageAccount/AccountDetails/AccountDetails";
import PaymentOperations from "@/components/ManageAccount/PaymentOperations/PaymentOperations";
import TransactionHistory from "@/components/ManageAccount/TransactionHistory/TransactionHistory";
import UploaderStepperForm from "@/components/SteperForm/UploaderStepper";
import FinalizeMusic from "@/components/MyUploads/FinalizeMusic/FinalizeMusic";
import Drafts from "@/components/MyUploads/Drafts/Drafts";
import PendingVideos from "@/components/MyUploads/PendingVideos/PendingVideos";
import SuccessVideos from "@/components/MyUploads/SuccessVideos/SuccessVideos";
import DigitalRightsManagementPage from "@/components/Youtube/DigitalRightsManagementPage/DigitalRightsManagementPage";
import CorrectionMusic from "@/components/MyUploads/CorrectionMusic/CorrectionMusic";
import AlbumStepperForm from "@/components/SteperForm/AlbumStepper";
import Uploads from "@/components/Uplaods/Uploads";
import ArtistChannelRequest from "@/components/ClaimsManage/ArtistChannelRequest";
import TikTokClaimRequest from "@/components/ClaimsManage/TikTokClaimRequest";
import FacebookWhiteListRequest from "@/components/ClaimsManage/FacebookWhiteListRequest";
import FacebookClaimRequest from "@/components/ClaimsManage/FacebookClaimRequest";
import WhiteListRequest from "@/components/ClaimsManage/WhiteListRequest";
import YoutubeClaimRequest from "@/components/ClaimsManage/YoutubeClaimRequest";
import YoutubeManualClaim from "@/components/ClaimsManage/YoutubeManualClaim";
import YoutubeTakeDown from "@/components/ClaimsManage/YoutubeTakeDown";
import SetPassword from "@/pages/SetPassword";
import ReleasedSongs from "@/components/MyUploads/SuccessRelease/SuccessRelease";
import SuccessAlbum from "@/components/MyUploads/SuccessAlbum/SuccessAlbum";
import PendingApprovalMessage from "@/pages/ApprovedMessage";
import TermsConditionsPage from "@/pages/TermsConditions";
import CorrectionVideo from "@/components/MyUploads/CorrectionVideo/CorrectionVideo";
import TikTokClaim from "@/components/Legal/TikTok/TikTokClaim";
import FacebookClaim from "@/components/Legal/FaceBook/FaceBookClaim";
import YoutubeClaim from "@/components/Legal/Youtube/YoutubeClaim";
import YouTubeManualClaim from "@/components/Legal/Youtube/YouTubeManualClaim";
import FacebookWhiteList from "@/components/Legal/FaceBook/FacebookWhiteList";
import YoutubeTakeDownForm from "@/components/Legal/Youtube/YouTubeTakeDown";
import ArtistChannelRequestForm from "@/components/Youtube/ArtistChannelRequest/ArtistChannelRequest";
import WhiteListRequestForm from "@/components/Youtube/WhiteListRequest/WhiteListRequest";
import RejectedMessage from "@/pages/RejectedMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: (
          <IsVerifiedRoutes>
            <DashboardHome />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/pending",
        element: (
          <IsVerifiedRoutes>
            <PendingApprovalMessage />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/rejected",
        element: (
          <IsVerifiedRoutes>
            <RejectedMessage />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/upload",
        element: (
          <IsVerifiedRoutes>
            <Uploads />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/release-video",
        element: (
          <IsVerifiedRoutes>
            <UploadVideo />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/single",
        element: (
          <IsVerifiedRoutes>
            <UploaderStepperForm />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/album",
        element: (
          <IsVerifiedRoutes>
            <AlbumStepperForm />
          </IsVerifiedRoutes>
        ),
      },

      {
        path: "/artist-management",
        element: (
          <IsVerifiedRoutes>
            <ArtistLabelManagement />
          </IsVerifiedRoutes>
        ),
      },

      {
        path: "/my-uploads/success-track",
        element: (
          <IsVerifiedRoutes>
            <ReleasedSongs />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/success-album",
        element: (
          <IsVerifiedRoutes>
            <SuccessAlbum />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/pending-track",
        element: (
          <IsVerifiedRoutes>
            <FinalizeMusic />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/pending-album",
        element: (
          <IsVerifiedRoutes>
            <FinalizeMusic />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/drafts",
        element: (
          <IsVerifiedRoutes>
            <Drafts />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/pending-videos",
        element: (
          <IsVerifiedRoutes>
            <PendingVideos />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/correction-track",
        element: (
          <IsVerifiedRoutes>
            <CorrectionMusic />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/correction-videos",
        element: (
          <IsVerifiedRoutes>
            <CorrectionVideo />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/my-uploads/videos",
        element: (
          <IsVerifiedRoutes>
            <SuccessVideos />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/analytics",
        element: (
          <IsVerifiedRoutes>
            <AnalyticsPage />
          </IsVerifiedRoutes>
        ),
      },

      {
        path: "/verify",
        element: (
          <PrivateRoutes>
            <StepperForm />
          </PrivateRoutes>
        ),
      },

      {
        path: "/notifications",
        element: (
          <IsVerifiedRoutes>
            <NotificationList />
          </IsVerifiedRoutes>
        ),
      },
      //! Manage Claim
      {
        path: "/manage-claim/tiktok",
        element: (
          <IsVerifiedRoutes>
            <TikTokClaim />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/fb-claim",
        element: (
          <IsVerifiedRoutes>
            <FacebookClaim />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/youtube-claim",
        element: (
          <IsVerifiedRoutes>
            <YoutubeClaim />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/youtube-takedown",
        element: (
          <IsVerifiedRoutes>
            <YoutubeTakeDownForm />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/youyube-manual-claim",
        element: (
          <IsVerifiedRoutes>
            <YouTubeManualClaim />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/fb-whitelist",
        element: (
          <IsVerifiedRoutes>
            <FacebookWhiteList />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/artist-channel",
        element: (
          <IsVerifiedRoutes>
            <ArtistChannelRequestForm />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-claim/whitelist",
        element: (
          <IsVerifiedRoutes>
            <WhiteListRequestForm />
          </IsVerifiedRoutes>
        ),
      },

      //! Claims Start
      {
        path: "/claims/manage",
        element: (
          <IsVerifiedRoutes>
            <DigitalRightsManagementPage />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/claims/artist-channel-request",
        element: (
          <PrivateRoutes>
            <ArtistChannelRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/tikTok-claim-request",
        element: (
          <PrivateRoutes>
            <TikTokClaimRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/facebook-whiteList-request",
        element: (
          <PrivateRoutes>
            <FacebookWhiteListRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/facebook-claim-request",
        element: (
          <PrivateRoutes>
            <FacebookClaimRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/whiteList-request",
        element: (
          <PrivateRoutes>
            <WhiteListRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/youtube-claim-request",
        element: (
          <PrivateRoutes>
            <YoutubeClaimRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/youtube-manual-claim",
        element: (
          <PrivateRoutes>
            <YoutubeManualClaim />
          </PrivateRoutes>
        ),
      },
      {
        path: "/claims/youtube-take-down",
        element: (
          <PrivateRoutes>
            <YoutubeTakeDown />
          </PrivateRoutes>
        ),
      },
      {
        path: "/help",
        element: (
          <IsVerifiedRoutes>
            <HelpPage />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-account/add-account",
        element: (
          <IsVerifiedRoutes>
            <ManageAccount />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/transaction-history",
        element: (
          <IsVerifiedRoutes>
            <TransactionHistory />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/manage-account/my-account",
        element: (
          <IsVerifiedRoutes>
            <AccountDetails />
          </IsVerifiedRoutes>
        ),
      },

      {
        path: "/financial/financial-reports",
        element: (
          <IsVerifiedRoutes>
            <FinancialReports />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/financial/financial-analytics",
        element: (
          <IsVerifiedRoutes>
            <FinancialAnalytics />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/financial/financial-operations",
        element: (
          <IsVerifiedRoutes>
            <PaymentOperations />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <IsVerifiedRoutes>
            <Settings />
          </IsVerifiedRoutes>
        ),
      },

      {
        path: "/settings/profile",
        element: (
          <IsVerifiedRoutes>
            <Profile />
          </IsVerifiedRoutes>
        ),
      },
      {
        path: "/settings/change-password",
        element: (
          <IsVerifiedRoutes>
            <ChangePassword />
          </IsVerifiedRoutes>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/terms-conditions",
        element: <TermsConditionsPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/verify",
        element: <Verify />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/set-new-password/:id",
        element: <SetNewPassword />,
      },
      {
        path: "/auth/set-password",
        element: <SetPassword />,
      },
    ],
  },
]);

export default router;
