import { useState } from "react";
import styles from "./ColorPicker.module.css";

export const ColorPicker = () => {
  // palette of colors for selection
  const palette = [
    "#ffffff",
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
  ];

  const [inputColor, setInputColor] = useState("");
  const [inputError, setInputError] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setInputColor(color);
    setInputError(false);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputColor(input);

    if (isValidColor(input)) {
      setSelectedColor(input);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const isValidColor = (color) => {
    const regex = /^#([0-9A-Fa-f]{3}){1,2}$/i;
    return regex.test(color);
  };

  const colorPaletteNode = (
    <>
      <span className={styles.title}>Select a color from the palette: </span>
      <div className={styles.colorPalette}>
        {palette.map((color) => (
          <div
            className={`${styles.colorItem} ${
              selectedColor === color && styles.active
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleSelectColor(color)}
          ></div>
        ))}
      </div>
    </>
  );

  const colorPreviewNode = (
    <div className={styles.colorPreview}>
      <span>Selected color: </span>
      <div
        className={styles.selectedColor}
        style={{ backgroundColor: selectedColor }}
      ></div>
      <span>{selectedColor}</span>
    </div>
  );

  const inputNode = (
    <div className={styles.colorInput}>
      <label>Enter a color: </label>
      <input
        placeholder="#000000"
        value={inputColor}
        onChange={handleInputChange}
        className={inputError ? styles.error : ""}
      />
      {inputError && (
        <span className={styles.errorMessage}>
          Invalid color code.
        </span>
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {colorPaletteNode}
      {colorPreviewNode}
      {inputNode}
    </div>
  );
};
