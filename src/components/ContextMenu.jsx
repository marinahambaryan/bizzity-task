import React from "react";
import { Paper, MenuList, MenuItem, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const menuWidth = 200;
const windowWidth = window.innerWidth;

const ContextMenu = ({
  handleMoveToFront,
  handleMoveToBack,
  item,
  coordinates,
}) => {
  const getLeft = (x) => {
    if (windowWidth - x < menuWidth) {
      return x - menuWidth;
    }
    return x;
  };

  return (
    <Paper
      id={`item-${item.i}`}
      sx={{
        width: menuWidth,
        position: "absolute",
        left: getLeft(coordinates.x),
        top: coordinates.y,
        tranform: "translateX(-50%)",
        transform: "translateY(-50%)",
      }}
    >
      <MenuList>
        <MenuItem onClick={handleMoveToFront}>
          <ListItemIcon>
            <KeyboardArrowUpIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Move Up</Typography>
        </MenuItem>
        <MenuItem onClick={handleMoveToBack}>
          <ListItemIcon>
            <KeyboardArrowDownIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Move Down</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default ContextMenu;
