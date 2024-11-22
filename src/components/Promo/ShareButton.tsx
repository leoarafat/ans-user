/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/ShareButton.jsx

import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ShareButton = ({ url, title }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Share">
        <IconButton onClick={handleClick} color="primary">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton
            url={url}
            //@ts-ignore
            quote={title}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FacebookIcon sx={{ marginRight: 1 }} /> Facebook
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton
            url={url}
            title={title}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TwitterIcon sx={{ marginRight: 1 }} /> Twitter
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkedinShareButton
            url={url}
            title={title}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LinkedInIcon sx={{ marginRight: 1 }} /> LinkedIn
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton
            url={url}
            title={title}
            style={{ display: "flex", alignItems: "center" }}
          >
            <WhatsAppIcon sx={{ marginRight: 1 }} /> WhatsApp
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ShareButton;
