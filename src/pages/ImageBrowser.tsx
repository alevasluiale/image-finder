import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { useGlobalContext } from "../context";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PreferredTopic } from "../constants.ts";

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    thumb: string;
    small: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
  alt_description: string;
}

const createUnsplashApi = () =>
  createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  });

function ImageBrowser({ unsplashApi = createUnsplashApi() }) {
  const {
    data: { topic, otherTopic },
    updateField,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<UnsplashImage>();
  const [error, setError] = useState(false);

  const loadImage = async (topic: string) => {
    setLoading(true);
    try {
      const result = await unsplashApi.photos.getRandom({
        query: topic === PreferredTopic.OTHER ? otherTopic : topic,
      });
      const photo = result.response as UnsplashImage;
      setPhoto(photo);
      updateField("selectedImageThumb", photo?.urls.small);
    } catch (error) {
      setError(true);
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic) {
      loadImage(topic);
    }
  }, [topic, otherTopic]);

  const acceptImage = () => {
    navigate("/accepted-image");
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#1a1a1a",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#1a1a1a",
        }}
      >
        <Typography variant="h5" color="error">
          There was an error loading the image...
        </Typography>
      </Box>
    );
  }

  if (photo) {
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
        <Box sx={{ position: "relative" }}>
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || "Unsplash photo"}
            style={{
              width: "100%",
              height: "calc(100vh - 240px)", // Accounting for buttons and credits
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            p: 1,
            bgcolor: "#1a1a1a",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => loadImage(topic || "")}
            sx={{
              minWidth: "100px",
              textTransform: "uppercase",
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={acceptImage}
            sx={{
              minWidth: "100px",
              textTransform: "uppercase",
            }}
          >
            Accept
          </Button>
        </Box>
      </Box>
    );
  }
  return null;
}

export default ImageBrowser;
