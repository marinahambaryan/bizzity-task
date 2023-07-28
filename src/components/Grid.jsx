import React, { useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { Box } from "@mui/material";

import "../css/styles.css";
import ContextMenu from "./ContextMenu";
import CustomGridItem from "./CustomGridItem";

const ReactGridLayout = WidthProvider(RGL);
const AllowOverlap = ({
  layout,
  handleDragStop,
  handleMoveToBack,
  handleMoveToFront,
  handleMultipleDragging,
}) => {
  const [clickedItem, setClickedItem] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const [selectedElements, setSelectedElements] = useState({});
  const [delta, setDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleItemClick = (e, item) => {
    setClickedItem(item);
    setCoordinates({ x: e.pageX, y: e.pageY });
  };

  const handleContextMenuReset = () => {
    if (clickedItem) setClickedItem(null);
  };

  const handleItemSelection = (item) => {
    const newSelectedElements = { ...selectedElements };
    if (selectedElements?.[item.i]) {
      delete newSelectedElements[item.i];
    } else {
      newSelectedElements[item.i] = item;
    }
    setSelectedElements(newSelectedElements);
  };

  const handleDrag = (layout, oldItem, newItem) => {
    setDelta({ x: newItem.x - oldItem.x, y: newItem.y - oldItem.y });
    // const newLayout = [...layout];
    // if (Object.keys(selectedElements).length > 0) {
    //   // newLayout?.forEach((item, index) => {
    //   //   if (selectedElements?.[item.i]) {
    //   //     newLayout[index] = { ...item, x: item.x + dx, y: item.y + dy };
    //   //   }
    //   // });
    //   Object.values(selectedElements).forEach((element) => {
    //     newLayout[element.i] = {
    //       ...newLayout[element.i],
    //       x: newItem.x,
    //       y: newItem.y,
    //     };
    //   });
    // }
    // // console.log({newLayout})
    // handleMultipleDragging(newLayout);
  };
  const handleCLick = () => {
    const newLayout = [...layout];
    newLayout[0] = {
      ...newLayout[0],
      x: newLayout[0].x + 3,
      y: newLayout[0].y + 3,
    };
    newLayout[1] = {
      ...newLayout[1],
      x: newLayout[1].x + 3,
      y: newLayout[1].y + 3,
    };
    handleMultipleDragging(newLayout);
  };

  return (
    <Box onClick={handleContextMenuReset}>
      <ReactGridLayout
        layout={layout}
        useCSSTransforms={true}
        allowOverlap={true}
        onDragStop={(...args) => {
          setIsDragging(false);
          handleDragStop(...args);
        }}
        rowHeight={30}
        isResizable={false}
        onDrag={(...args) => handleDrag(...args)}
        onDragStart={() => setIsDragging(true)}
      >
        {_.map(layout, (item) => {
          return (
            <Box key={item.i}>
              <CustomGridItem
                isClicked={clickedItem && clickedItem.i === item.i}
                item={item}
                handleItemClick={handleItemClick}
                handleItemSelection={handleItemSelection}
                isSelected={!!selectedElements?.[item.i]}
                isDragging={isDragging}
                delta={delta}
              />
            </Box>
          );
        })}
      </ReactGridLayout>
      {clickedItem && (
        <ContextMenu
          handleMoveToFront={() => handleMoveToFront(clickedItem.i)}
          handleMoveToBack={() => handleMoveToBack(clickedItem.i)}
          item={clickedItem}
          coordinates={coordinates}
          delta={delta}
        />
      )}
    </Box>
  );
};

export default AllowOverlap;
