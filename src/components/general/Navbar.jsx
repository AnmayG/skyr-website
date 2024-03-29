import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Settings, Logout, SwitchAccount } from "@mui/icons-material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  // const [word, setWord] = useState("")
  const [image, setImage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let navigate = useNavigate();

  // Avatar button click code
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // When logged in hide the login and signup buttons in favor of the avatar and dashboard buttons
  useEffect(() => {
    let isAuthed = true;

    onAuthStateChanged(auth, (user) => {
      if (isAuthed) {
        if (user) {
          const image = user.photoURL;
          setImage(image);
          setIsAuthenticated(true);
        } else {
          // User is signed out
          setIsAuthenticated(false);
        }
      }
    });

    return () => {
      isAuthed = false;
    };
  }, []);

  return (
    <div className="flex w-full justify-between items-center lg:px-4 md:px-3 sm:px-2 h-[7vh] bg-white">
      <div className="flex justify-center items-center whitespace-nowrap">
        <img
          src="../../skyr-logo.svg"
          className="h-10 mr-2"
          onClick={() => {
            navigate("/");
          }}
          alt=""
        ></img>
        <Link
          className="text-xl text-center font-bold cursor-pointer shrink-0 mr-8"
          style={{ textDecoration: "none" }}
          to="/"
        >
          SkyRobotics
        </Link>
      </div>
      <div className="flex justify-evenly items-center whitespace-nowrap">
        <div
          className={
            "flex justify-evenly items-center whitespace-nowrap " +
            (isAuthenticated ? "hidden" : "not-hidden")
          }
        >
          <div className="items-end text-center mr-8">
            <Link
              style={{ textDecoration: "none" }}
              className="text-base font-bold"
              to="/login"
            >
              Log In
            </Link>
          </div>
          <div className="items-end text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="text-base bg-blue-400 font-bold text-white rounded-3xl p-2 px-4"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div
          className={
            "flex justify-evenly items-center whitespace-nowrap " +
            (isAuthenticated ? "not-hidden" : "hidden")
          }
        >
          <div className="items-center text-center mr-8">
            <Link
              style={{ textDecoration: "none" }}
              className="border-2 border-black touch-manipulation rounded-3xl p-2 text-base text-center font-semibold"
              to="/newproject"
            >
              + NEW PROJECT
            </Link>
          </div>
          <div className="items-end text-center">
            <Link
              style={{ textDecoration: "none" }}
              className="text-base font-bold"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>
          <div>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ m: 0, bgcolor: "secondary.main" }} src={image} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
                <Avatar /> Your Account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  // console.log("here")
                  signOut(auth)
                    .then(() => {
                      navigate("/");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <span>Log Out</span>
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  // console.log("here")
                  signOut(auth)
                    .then(() => {
                      navigate("/login");
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <ListItemIcon>
                  <SwitchAccount fontSize="small" />
                </ListItemIcon>
                <span>Switch Account</span>
              </MenuItem> */}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
