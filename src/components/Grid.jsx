import React, { useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import { Box } from "@mui/material";

import "../css/styles.css";
import ContextMenu from "./ContextMenu";
import CustomGridItem from "./CustomGridItem";

const ReactGridLayout = WidthProvider(RGL);
const Grid = ({ layout, handleMoveToBack, handleMoveToFront, setLayout }) => {
  const [clickedItem, setClickedItem] = useState(null);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);

  const handleItemClick = (e, item) => {
    setClickedItem(item);
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
  };

  const handleContextMenuReset = () => {
    if (clickedItem) setClickedItem(null);
  };

  const handleItemSelection = (item) => {
    if (!selectedElements.includes(item.i)) {
      setSelectedElements([...selectedElements, item.i]);
    } else {
      setSelectedElements(selectedElements.filter((el) => el !== item.i));
    }
  };

  const handleOnDragStop = (newLayout, oldItem, newItem) => {
    const delta = { x: newItem.x - oldItem.x, y: newItem.y - oldItem.y };
    const layoutCopy = newLayout.map((el) => ({ ...el }));

    if (selectedElements.length > 0 && selectedElements.includes(newItem.i)) {
      // const selectedObj = {}
      // selectedElements.forEach((element) => {
      //   selectedObj[element] = true
      // })
      // layoutCopy.map(card => {
      //   if(card.i !== newItem.i) {
      //     const newXValue = elementInNewLayout.x + delta.x;
      //     const newYValue = elementInNewLayout.y + delta.y;
      //     card
      //   }
      // })
      selectedElements.forEach((elementIdx) => {
        const layoutElementIndex = layoutCopy.findIndex(
          (e) => e.i === elementIdx,
        );
        const elementInNewLayout = layoutCopy[layoutElementIndex];
        if (elementIdx !== newItem.i) {
          const newXValue = elementInNewLayout.x + delta.x;
          const newYValue = elementInNewLayout.y + delta.y;
          layoutCopy[layoutElementIndex] = {
            ...layoutCopy[layoutElementIndex],
            x: newXValue > 0 ? newXValue : 0,
            y: newYValue > 0 ? newYValue : 0,
          };
        }
      });
    }
    setLayout(layoutCopy);
  };

  return (
    <Box onClick={handleContextMenuReset}>
      <ReactGridLayout
        layout={layout}
        useCSSTransforms={true}
        allowOverlap={true}
        onDragStop={handleOnDragStop}
        rowHeight={30}
        isResizable={false}
      >
        {_.map(layout, (item) => {
          const isSelected = selectedElements.includes(item.i);
          return (
            <Box key={item.i}>
              <CustomGridItem
                isClicked={clickedItem && clickedItem.i === item.i}
                item={item}
                handleItemClick={handleItemClick}
                handleItemSelection={handleItemSelection}
                isSelected={isSelected}
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
          coordinates={contextMenuCoordinates}
        />
      )}
    </Box>
  );
};

export default Grid;
