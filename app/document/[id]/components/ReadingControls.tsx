interface ReadingControlsProps {
  readingSettings: {
    font: "serif" | "sans-serif";
    width: "narrow" | "normal" | "wide";
    fontSize: number;
  };
  onUpdateFont: (newFont: "sans-serif" | "serif") => void;
  onUpdateWidth: (newSize: "narrow" | "normal" | "wide") => void;
  onUpdateFontSize: (increment: number) => void;
}

const ReadingControls = ({
  readingSettings,
  onUpdateFont,
  onUpdateWidth,
  onUpdateFontSize,
}: ReadingControlsProps) => {
  return (
    <div className="actions-bar">
      <div className="change-font">
        <h3>Change Font Type</h3>
        <button onClick={() => onUpdateFont("serif")}>Serif</button>
        <button onClick={() => onUpdateFont("sans-serif")}>Sans-Serif</button>
      </div>
      <div className="change-font-size">
        <h3>Change Font Size</h3>
        <button onClick={() => onUpdateFontSize(-2)}>A-</button>
        <button onClick={() => onUpdateFontSize(2)}>A+</button>
      </div>
      <div className="change-width-size">
        <h3>Change Screen Width</h3>
        <button onClick={() => onUpdateWidth("narrow")}>Narrow</button>
        <button onClick={() => onUpdateWidth("normal")}>Normal</button>
        <button onClick={() => onUpdateWidth("wide")}>Wide</button>
      </div>
    </div>
  );
};

export default ReadingControls;
