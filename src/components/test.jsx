const canvasSize = { width: "600", height: "400" };

function DraggableItem({ id, selected, delta, onDrag, onSelect, children }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const isSelected = selected && selected.indexOf(id) >= 0;
  const transform =
    !isDragging && isSelected && delta
      ? { transform: `translate(${delta.x}px, ${delta.y}px)` }
      : {};

  function handleClick(e, idx) {
    if (e.shiftKey) {
      onSelect(idx);
    }
  }

  return (
    <ReactDraggable
      onStart={() => setIsDragging(true)}
      onDrag={(e, data) => {
        onDrag({ x: data.x, y: data.y }, id);
      }}
      onStop={() => {
        setIsDragging(false);
      }}
      disabled={!isSelected}
    >
      <g style={transform}>
        <g
          className={`item ${isSelected ? "selected" : ""} ${
            isDragging ? "dragging" : ""
          }`}
          onClick={(e) => handleClick(e, id)}
        >
          {children}
        </g>
      </g>
    </ReactDraggable>
  );
}

function DraggableElements(props) {
  const { children, ...restProps } = props;
  const draggable = children.map((child, idx) => (
    <DraggableItem key={idx} id={idx} {...restProps}>
      {child}
    </DraggableItem>
  ));
  return <>{draggable}</>;
}

function Canvas(props) {
  const [selected, setSelected] = React.useState([]);
  const [delta, setDelta] = React.useState(null);
  function handleDrag(delta) {
    setDelta(delta);
  }
  function select(idx) {
    const newSelection =
      selected.indexOf(idx) >= 0
        ? selected.filter((item) => item != idx)
        : [...selected, idx];
    setSelected(newSelection);
  }

  return (
    <svg className="canvas" {...canvasSize} xmlns="http://www.w3.org/2000/svg">
      <DraggableElements
        selected={selected}
        onSelect={select}
        delta={delta}
        onDrag={handleDrag}
      >
        <rect x="120" y="250" width="100" height="100" fill="lightgrey" />
        <circle cx="400" cy="100" r="75" fill="lightblue" />
        <polygon points="160,300 200,100 350,230" fill="grey" />
        <rect x="50" y="50" width="200" height="100" fill="lightgreen" />
        <rect x="465" y="70" width="100" height="150" rx="25" fill="pink" />
        <ellipse cx="400" cy="260" rx="130" ry="75" fill="lightyellow" />
      </DraggableElements>
    </svg>
  );
}

function App() {
  return (
    <div className="App">
      <Canvas />
      <div> Hold SHIFT key to select multiple figures, than drag </div>
    </div>
  );
}

let mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
