import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Avatar,
  Stack,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";

export const AccountStyle = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  padding: theme.spacing(2, 2, 2, 1.5),
  height: "62px",
  borderRadius: "31px",
  backgroundColor: theme.palette.grey[200],
  textShadow: "none",
}));

const UsernameTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    marginTop: "0 !important",
    fontSize: 13,
    borderRadius: 4,
  },
}));

UserAvatar.propTypes = {
  handleDisconnect: () => {},
};

export default function UserAvatar({ handleDisconnect }) {
  const [account] = useState(localStorage.getItem("BG_ACCOUNT"));
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <AccountStyle direction="row" spacing={1} justifyContent="center">
      <Avatar src="" alt="photoURL" />
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ color: "black" }}
      >
        <UsernameTooltip title={account} placement="bottom-end">
          <Typography
            variant="subtitle1"
            sx={{
              width: "120px",
              color: "#FF931E",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {account}
          </Typography>
        </UsernameTooltip>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem
                    onClick={(event) => {
                      handleDisconnect();
                      handleClose(event);
                    }}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </AccountStyle>
  );
}
