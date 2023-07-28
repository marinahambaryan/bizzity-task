import React from "react";
import { Typography, Box } from "@mui/material";

const CustomGridItem = ({
  item,
  handleItemClick,
  isClicked,
  handleItemSelection,
  isSelected,
  isDragging,
  delta,
}) => {
  const manageElementClick = (e) => {
    if (e.shiftKey) {
      handleItemSelection(item);
    }
  };
  return (
    <Box
      style={{
        backgroundColor: isClicked
          ? "#757ce8"
          : isSelected
          ? "#ff7961"
          : "#f0f0f0",
        borderRadius: 1,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "100%",
      }}
      key={item.i}
      onContextMenu={(e) => {
        e.preventDefault();
        handleItemClick(e, item);
      }}
      onClick={(e) => manageElementClick(e)}
    >
      <Typography style={{ padding: 10 }}>{item.i}</Typography>
    </Box>
  );
};

export default CustomGridItem;
