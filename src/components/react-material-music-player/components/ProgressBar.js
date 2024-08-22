import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actionCreators.js";

import { Slider, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import secondsToString from "../utils/secondsToString.js";

export default function ProgressBar(props) {
  const sx = props.sx;
  const { timeLeft, currentTime } = useSelector(
    ({ timeLeft, currentTime }) => ({
      timeLeft,
      currentTime,
    }),
    shallowEqual
  );

  const progress = (currentTime / (timeLeft + currentTime)) * 100 || 0;

  const dispatch = useDispatch();
  const onSeek = (progress) => dispatch(actionCreators.seek(progress));

  const handleSliderChange = (event, newValue) => {
    onSeek(newValue);
  };

  return (
    <Box
      sx={{
        mr: 1.2,
        ml: 1.2,
        color: 'text.paper',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > .children": {
          mx: 1,
        },
        ...sx,
      }}
    >
      <Typography sx={{ fontSize: '0.9rem' }} className="children">
        {secondsToString(currentTime)}
      </Typography>
      <Slider
        className="children"
        aria-labelledby="continuous-slider"
        value={progress}
        onChange={handleSliderChange}
        sx={{
          color: "primary.main",
          height: 4,
          '& .MuiSlider-thumb': {
            display: 'none',
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#bfbfbf',
          },
        }}
      />
      <Typography sx={{ fontSize: '0.9rem' }} className="children">-{secondsToString(timeLeft)}</Typography>
    </Box>
  );
}
