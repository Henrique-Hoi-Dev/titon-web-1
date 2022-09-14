import React from "react";
import { Box } from "@mui/material";
import Text from "components/atoms/text/text";
import {
  IconTextFormatIcon,
  IconColorLensIcon,
} from "components/atoms/icons/icons";
import { SketchPicker } from "react-color";

const ColorPicker = ({
  label,
  color,
  setColor,
  showColorPicker,
  setShowColorPicker,
  fontColor,
  setFontColor,
  showColorPickerFont,
  setShowColorPickerFont,
  children,
  ...props
}) => {

  const handleChangeColor = (color) => {
    setColor(color.hex);
    setShowColorPicker(false)
  };

  const handleChangeColorFont = (color) => {
    setFontColor(color.hex);
    setShowColorPickerFont(false)
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <Text center fontSize={"14px"}>{label}</Text>
      <Box
        sx={{
          display: 'flex',
          ml: 1,
          cursor: 'default',
          width: "80px",
          height: "40px",
          fontWeight: "bold",
          borderRadius: "4px 4px 0px 0px",
          border: "0.2px solid #cccccc",
          background: color,
          color: fontColor,
          borderBottomWidth: "0px",
          alignItems: 'center',
          justifyContent: 'center',
          "&:hover": { background: color },
        }}
      >
        {children}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <IconTextFormatIcon
           onClick={() => {
            setShowColorPickerFont(!showColorPickerFont);
          }}
          sx={{
            ml: 1,
            cursor: 'pointer',
            width: "40px",
            height: "25px",
            color: fontColor,
            background: color,
            borderLeft: "0.2px solid #cccccc",
            borderBottom: "0.2px solid #cccccc",
            borderRadius: "0px 0px 0px 4px",
            "&:hover": { background: color, opacity: 0.8 },
          }}
        />
        <IconColorLensIcon
          onClick={() => {
            setShowColorPicker(!showColorPicker);
          }}
          sx={{
            mr: 1,
            mb: 2,
            cursor: 'pointer',
            width: "40px",
            height: "25px",
            color: fontColor,
            background: color,
            borderRight: "0.2px solid #cccccc",
            borderBottom: "0.2px solid #cccccc",
            borderRadius: "0px 0px 4px 0px",
            "&:hover": { background: color, opacity: 0.8 },
          }}
        />
      </Box>
      
      {showColorPicker && (
        <Box
          sx={{ position: "absolute", zIndex: "1400",  bottom: "140px" }}
        >
          <SketchPicker
            styles={{ position: "fixed" }}
            color={color}
            onChangeComplete={handleChangeColor}
          />
        </Box>
      )}

      {showColorPickerFont && (
        <Box
          sx={{ position: "absolute", zIndex: "1400", bottom: "140px" }}
        >
          <SketchPicker
            styles={{ position: "fixed" }}
            color={fontColor}
            onChangeComplete={handleChangeColorFont}
          />
        </Box>
      )}
    </Box>
  );
};

export default ColorPicker;
