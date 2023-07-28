import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import ReorderIcon from "@mui/icons-material/Reorder";
import IconButton from "@mui/material/IconButton";
import { ListItem, ListItemIcon, Paper, Box } from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

const ReactGridLayout = WidthProvider(RGL);

const Layers = ({ layout, handleLayoutLayering }) => {
  const [layers, setLayers] = useState([]);
  const [isLayerBarOpen, setIsLayerBarOpen] = useState(false);

  useEffect(() => {
    const newLayers = generateLayout();
    setLayers(newLayers);
  }, [layout]);

  const generateLayout = () => {
    return layout.map(function (item, i) {
      const y = i;
      return {
        x: 0,
        y,
        w: 20,
        h: 1,
        i: item.i,
      };
    });
  };

  const handleLayersRepositioning = (layers, oldItem, newItem) => {
    if (newItem.y === oldItem.y) return;
    let changingLayer = {
      x: oldItem.x,
      y: newItem.y,
      w: oldItem.w,
      h: oldItem.h,
      i: oldItem.i,
    };
    const newLayers = [...layers];
    newLayers.splice(oldItem.y, 1);
    newLayers.splice(newItem.y, 0, changingLayer);
    setLayers(newLayers);
    handleLayoutLayering(newItem.y, oldItem.y);
  };

  return (
    <Box
      style={{
        top: 0,
        position: "fixed",
        right: 0,
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <IconButton
        aria-label="reorder"
        onClick={() => setIsLayerBarOpen((prev) => !prev)}
      >
        <ReorderIcon />
      </IconButton>
      {isLayerBarOpen && (
        <Paper style={{ width: 200 }}>
          <ReactGridLayout
            rowHeight={30}
            layout={layers}
            isResizable={false}
            onDragStop={handleLayersRepositioning}
          >
            {layers?.map((layer) => {
              return (
                <Box key={layer.i}>
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <LabelIcon />
                    </ListItemIcon>
                    {layer.i}
                  </ListItem>
                </Box>
              );
            })}
          </ReactGridLayout>
        </Paper>
      )}
    </Box>
  );
};

export default Layers;
