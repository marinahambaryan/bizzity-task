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
    console.log({ e }, e.shiftKey);
    if (e.shiftKey) {
      handleItemSelection(item);
    }
  };
  console.log({ isDragging, isSelected, x: delta.x, y: delta.y, item: item.i });
  const transform =
    (isSelected && !!delta?.x) || !!delta?.y
      ? { transform: `translate(${delta.x}px, ${delta.y}px)` }
      : {};
  console.log((isSelected && !!delta?.x) || !!delta?.y);
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
        transform,
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
