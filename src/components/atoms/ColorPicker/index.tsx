import React, { useState, useEffect, useRef } from "react";
import { SketchPicker, ColorResult } from "react-color";
import ColorPickerIcon from "~/assets/icons/color_picker_icon.svg";

export interface IInputProps {
  value: string | undefined;
  onChange: (newColor: string) => void;
}

const ColorPicker : React.FC<IInputProps> = ({ value, onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (newColor: ColorResult) => {
    onChange(newColor.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  return (
    <div className="border-2 w-full rounded-lg p-2 relative" ref={colorPickerRef}>
      <div
        style={{ cursor: "pointer" }}
        className="flex items-center"
        onClick={toggleColorPicker}
      >
        <img
          alt="color picker"
          src={ColorPickerIcon}
          style={{ width: 20, height: 20, alignSelf: "center" }}
        />
        <span className="ml-2">
          {value || "Select a color"}
        </span>
      </div>

      {showColorPicker && (
        <div className="absolute z-1001">
          <SketchPicker color={value} onChange={handleColorChange} />
          <input
            hidden
            placeholder="Select a color"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "100%",
              marginTop: "8px" 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
