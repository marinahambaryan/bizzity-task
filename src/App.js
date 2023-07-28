import { useState, useEffect } from "react";
import _ from "lodash";
import { Box } from "@mui/material";

import Grid from "./components/Grid";
import Layers from "./components/Layers";

function App() {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    const newLayout = generateLayout();
    setLayout(newLayout);
  }, []);

  const generateLayout = () => {
    const numberOfItems = 10;
    return _.map(new Array(numberOfItems), function (item, i) {
      const y =
        _.result(numberOfItems, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
      };
    });
  };

  const handleMoveToFront = (itemId) => {
    const newLayout = [...layout];
    const itemIndex = newLayout.findIndex((item) => item.i === itemId);
    if (itemIndex === layout.length - 1) return;
    let isChanged = false;
    if (itemIndex >= 0) {
      const item = newLayout.splice(itemIndex, 1)[0];
      newLayout.push(item);
      isChanged = true;
    }
    if (isChanged) {
      setLayout(newLayout);
    }
  };

  const handleMoveToBack = (itemId) => {
    const newLayout = [...layout];
    const itemIndex = newLayout.findIndex((item) => item.i === itemId);
    if (itemIndex <= 0) return;
    let isChanged = false;
    if (itemIndex < newLayout.length) {
      const item = newLayout.splice(itemIndex, 1)[0];
      newLayout.unshift(item);
      isChanged = true;
    }
    if (isChanged) {
      setLayout(newLayout);
    }
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    console.log({ oldItem, newItem });
    if (newItem.y === oldItem.y && newItem.x === oldItem.x) return;
    const newLayout = [...layout].map((item) => {
      if (item.i === newItem.i) {
        item.x = newItem.x;
        item.y = newItem.y;
      }
      return item;
    });
    console.log("aaaaaaaaaa", newLayout);
    setLayout(newLayout);
  };

  const handleLayoutLayering = (newIndex, oldIndex) => {
    let changingItem = layout[oldIndex];
    const newLayout = [...layout];
    newLayout.splice(oldIndex, 1);
    newLayout.splice(newIndex, 0, changingItem);
    setLayout(newLayout);
  };

  const handleMultipleDragging = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <Box className="App">
      <Grid
        layout={layout}
        handleMoveToFront={handleMoveToFront}
        handleMoveToBack={handleMoveToBack}
        handleDragStop={handleDragStop}
        handleMultipleDragging={handleMultipleDragging}
      />
      <Layers layout={layout} handleLayoutLayering={handleLayoutLayering} />
    </Box>
  );
}

export default App;
