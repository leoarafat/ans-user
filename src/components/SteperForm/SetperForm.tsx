/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
  DialogActions,
} from "@material-ui/core";
import ProfileVerification from "../Verification/ProfileVerification";
import AddressInformation from "../Verification/AddressInformation";
import LabelVerification from "../Verification/LabelVerification";
import ReviewConfirm from "../Verification/ReviewConfirm";

import {
  useAddressVerifyMutation,
  useAgreementVerifyMutation,
  useLabelVerifyMutation,
  useProfileVerifyMutation,
  useVerifyUserMutation,
} from "@/redux/slices/admin/userApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AgreementPage from "../Verification/Agreement";
import { Divider } from "@mui/material";

const steps = [
  {
    title: "Profile Verification",
    component: ProfileVerification,
  },
  {
    title: "Address Information",
    component: AddressInformation,
  },
  {
    title: "Label Verification",
    component: LabelVerification,
  },
  {
    title: "Agreement",
    component: AgreementPage,
  },
  {
    title: "Review & Confirm",
    component: ReviewConfirm,
  },
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    profile: {},
    address: {},
    label: {},
    agreement: {},
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [copyRightImage, setCopyRightImage] = useState(null);
  const [dashboardImage, setDashboardImage] = useState(null);
  const [signature, setSignature] = useState(null);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState({
    condition1: false,
    condition2: false,
    condition3: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (formData.profile) {
      //@ts-ignore
      setSelectedProfileImage(formData.profile.profileImage);
      //@ts-ignore
      setNidFront(formData.profile.nidFront);
      //@ts-ignore
      setNidBack(formData.profile.nidBack);
      //@ts-ignore
      setUserName(formData.profile.name);
      //@ts-ignore
      setPhone(formData.profile.phoneNumber);
      //@ts-ignore
      setNidNumber(formData?.profile?.nidNumber);
    }

    if (formData.label) {
      //@ts-ignore
      setCopyRightImage(formData.label.copyRightImage);
      //@ts-ignore
      setDashboardImage(formData.label.dashboardImage);
    }
    if (formData?.agreement) {
      //@ts-ignore
      setSignature(formData?.agreement?.signature);
    }
  }, [formData]);

  const [verifyProfile, { isLoading: profileLoading }] =
    useProfileVerifyMutation();
  const [labelVerify, { isLoading: labelLoading }] = useLabelVerifyMutation();
  const [addressVerify, { isLoading: addressLoading }] =
    useAddressVerifyMutation();
  const [verifyUser, { isLoading: verifyLoading }] = useVerifyUserMutation();
  const [agreementVerify, { isLoading: agreementLoading }] =
    useAgreementVerifyMutation();

  const handleNext = async () => {
    if (
      activeStep === 0 &&
      selectedProfileImage &&
      nidFront &&
      userName &&
      phoneNumber &&
      nidNumber
    ) {
      try {
        const profileFormData = new FormData();
        profileFormData.append("image", selectedProfileImage);
        profileFormData.append("nidFront", nidFront);
        //@ts-ignore
        profileFormData.append("nidBack", nidBack);
        profileFormData.append("name", userName);
        profileFormData.append("phoneNumber", phoneNumber);
        profileFormData.append("nidNumber", nidNumber);

        const result = await verifyProfile(profileFormData).unwrap();
        console.log(result, "Result");
        if (result?.success === true) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("Please update required fields", result?.message);
        }
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }

    if (
      activeStep === 1 &&
      //@ts-ignore
      formData.address?.city &&
      //@ts-ignore
      formData.address?.country
      // &&
      // //@ts-ignore
      // formData.address?.address
    ) {
      try {
        const result = await addressVerify(formData.address);

        if (result?.data?.success === true) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("Failed to update address");
        }
      } catch (error: any) {
        toast.error("Error updating address:", error?.message);
      }
    }

    if (
      activeStep === 2 &&
      //@ts-ignore
      formData.label?.channelUrl &&
      //@ts-ignore
      formData.label?.channelName &&
      //@ts-ignore
      // formData.label?.subscribeCount
      // &&
      // //@ts-ignore
      // formData.label?.videosCount
      formData?.label?.currentDistributor &&
      dashboardImage
    ) {
      try {
        const labelFormData = new FormData();
        //@ts-ignore
        // labelFormData.append("subscribeCount", formData.label.subscribeCount);
        //@ts-ignore
        labelFormData.append(
          "currentDistributor",
          //@ts-ignore
          formData.label.currentDistributor
        );
        //@ts-ignore
        labelFormData.append("channelName", formData.label.channelName);
        //@ts-ignore
        labelFormData.append("channelUrl", formData.label.channelUrl);
        //@ts-ignore
        labelFormData.append("copyrightNoticeImage", copyRightImage);
        //@ts-ignore
        labelFormData.append("dashboardScreenShot", dashboardImage);

        const result = await labelVerify(labelFormData).unwrap();

        if (result?.success === true) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("Please provide required fields");
        }
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }

    //@ts-ignore
    if (activeStep === 3 && formData?.agreement) {
      try {
        const agreementFormData = new FormData();
        //@ts-ignore
        agreementFormData.append("signature", formData.agreement.signature);

        const result = await agreementVerify(agreementFormData).unwrap();

        if (result?.success === true) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("Please provide Signature");
        }
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDataChange = (step: any, data: any) => {
    const updatedFormData = { ...formData, [step]: data };
    setFormData(updatedFormData);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleAcceptCondition = (condition: string) => (event: any) => {
    setConditionsAccepted({
      ...conditionsAccepted,
      [condition]: event.target.checked,
    });
  };
  const handleSubmit = async () => {
    setOpenModal(false);
    try {
      const result = await verifyUser({});
      if (result?.data?.success) {
        toast.success("Congratulations. Verify Successful");
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Verification failed. Please try again later.");
      }
    } catch (error: any) {
      toast.error("An error occurred while verifying. Please try again later.");
      console.error("Error during verification:", error.message);
    }
  };

  const StepComponent = steps[activeStep].component;

  return (
    <Grid container direction="column">
      <Typography variant="h4" align="center" gutterBottom>
        Verification Process
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ flexGrow: 1, marginBottom: 20 }}>
        <StepComponent data={formData} onChange={handleDataChange} />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{ marginLeft: 10 }}
          >
            {profileLoading ||
            labelLoading ||
            addressLoading ||
            agreementLoading
              ? "Saving.."
              : "Save & Go Next"}
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSubmit}
            onClick={handleOpenModal}
            style={{ marginLeft: 10 }}
          >
            {verifyLoading ? "Verifying..." : "Let's Verify"}
          </Button>
        )}
      </div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Terms & Conditions</Typography>
          <Typography variant="subtitle1">
            Please confirm that you have understood and that you agree to the
            following Terms & Conditions, and delivery guidelines.
          </Typography>
        </DialogTitle>
        <Divider sx={{ marginY: 2 }} />
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition1}
                onChange={handleAcceptCondition("condition1")}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I own or have legally licensed all copyrights to the sound
                recordings, compositions and artwork embodied in this release,
                and furthermore abide and agree to all terms as set forth in our
                distribution agreement. (Distribution Agreement PDF)
              </Typography>
            }
          />
          <Divider sx={{ marginY: 2 }} />

          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition2}
                onChange={handleAcceptCondition("condition2")}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                I confirm that I have truthfully indicated the Track Origin and
                Track Properties that apply for each of my tracks in order to
                ensure compliance with the various DSPs' requirements. I
                understand that there are serious consequences to
                misrepresenting my tracks and/or not declaring all the
                appropriate Track Properties.
              </Typography>
            }
          />
          <Divider sx={{ marginY: 2 }} />
          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition3}
                onChange={handleAcceptCondition("condition3")}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                I acknowledge and understand that playlisting services
                guaranteeing "increased streams" use techniques that result in
                artificial streaming, which violates music services' terms of
                use.
              </Typography>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={
              !conditionsAccepted.condition1 ||
              !conditionsAccepted.condition2 ||
              !conditionsAccepted.condition3 ||
              verifyLoading
            }
          >
            {verifyLoading ? "Uploading..." : "Agree and Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default StepperForm;
