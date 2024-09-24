import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const TermsConditions = ({
  openModal,
  handleCloseModal,
  conditionsAccepted,
  handleAcceptCondition,
  handleSubmit,
  handleSubmitWithConditions,
  uploadProgress,
}: any) => {
  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Terms & Conditions</Typography>
        <Typography variant="subtitle1">
          Please confirm that you have understood and that you agree to the
          following Terms & Conditions, and delivery guidelines.
        </Typography>
      </DialogTitle>
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
            <Typography variant="body1">
              I understand and agree to the ISRC Terms & Conditions.
              <Typography variant="body2">
                If you asked ANS Music to generate your ISRC codes, you hereby
                agree to{" "}
                <Link
                  className="text-blue-600 underline"
                  to="https://ansmusiclimited.com/"
                  target="_blank"
                >
                  ANS Music's conditions for generating ISRCs.
                </Link>
              </Typography>
            </Typography>
          }
        />
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
              I understand and agree to the Youtube Content Guidelines.
              <Typography variant="body2">
                Some content cannot be safely distributed and monetized on the
                platform. Please be sure you have read and follow the{" "}
                <Link
                  className="text-blue-600 underline"
                  to="https://ansmusiclimited.com/"
                  target="_blank"
                >
                  Youtube Content Guidelines.
                </Link>
              </Typography>
            </Typography>
          }
        />
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
              I understand and agree to the ANS Music Content Delivery
              Guidelines for Audio Stores.
              <Typography variant="body2">
                Some content is not eligible to be distributed on Apple Music,
                Spotify, and Youtube Audio Fingerprint. Please be sure you have
                read and understand the{" "}
                <Link
                  className="text-blue-600 underline"
                  to="https://ansmusiclimited.com/"
                  target="_blank"
                >
                  ANS Music Content Delivery Guidelines for Audio Stores.
                </Link>
              </Typography>
            </Typography>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleSubmitWithConditions)}
          color="primary"
          variant="contained"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          disabled={
            uploadProgress ||
            !conditionsAccepted.condition1 ||
            !conditionsAccepted.condition2 ||
            !conditionsAccepted.condition3 ||
            uploadProgress
          }
        >
          {uploadProgress ? "Uploading..." : "Agree and Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsConditions;
