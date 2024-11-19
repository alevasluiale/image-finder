import { Box, Typography } from "@mui/material";
import { useGlobalContext } from "../context.tsx";

function AcceptedImagePage() {
  const {
    data: { selectedImageThumb, name, surname },
  } = useGlobalContext();
  return (
    <Box
      sx={{
        paddingTop: "20px",
        height: "100vh",
        bgcolor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          p: 1,
          bgcolor: "#1a1a1a",
        }}
      >
        <Typography variant="h5" color="error">
          {name}
        </Typography>

        <Typography variant="h5" color="error">
          {surname}
        </Typography>
      </Box>
      <Box sx={{ position: "relative" }}>
        <img
          src={selectedImageThumb}
          alt={"Unsplash photo"}
          style={{
            width: "100%",
            height: "calc(100vh - 240px)", // Accounting for buttons and credits
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}
export default AcceptedImagePage;
