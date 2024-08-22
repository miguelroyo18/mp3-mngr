import React from "react";
import { Box, Avatar } from "@mui/material";
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

export default function CoverArt({ src, sx }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: src ? "transparent" : "#333",
        width: "100%",
        height: "100%",
        ...sx,
      }}
    >
      {src ? (
        <img
          src={src}
          alt="Cover Art"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Avatar
          sx={{
            backgroundColor: "#333",
            color: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MusicNoteRoundedIcon />
        </Avatar>
      )}
    </Box>
  );
}

