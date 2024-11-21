import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { InputData, PreferredTopic } from "../constants.ts";
import { useGlobalContext } from "../context.tsx";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";

const TopicLabels: Record<PreferredTopic, string> = {
  [PreferredTopic.TRAVEL]: "Travel",
  [PreferredTopic.CARS]: "Cars",
  [PreferredTopic.WILDLIFE]: "Wildlife",
  [PreferredTopic.TECHNOLOGY]: "Technology",
  [PreferredTopic.OTHER]: "Other",
};

// Styled container for the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  @media (max-width: 300px) {
    padding: 0;
  }
`;

// Styled form container
const FormContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  @media (max-width: 300px) {
    max-width: 100%;
  }
`;

// Styled heading
const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

function SearchPage() {
  const { data, updateField } = useGlobalContext();
  const navigate = useNavigate();
  // Wrap updateField to track user interactions
  const handleFieldUpdate = (
    field: keyof InputData,
    value?: string | PreferredTopic,
  ) => {
    if (field === "topic") {
      updateField("selectedImageThumb", undefined); //reset image on topic selection
    }
    updateField(field, value);
  };

  // Debounced navigation for other topic
  const debouncedNavigate = useMemo(
    () => _.debounce((path: string) => navigate(path), 500),
    [navigate],
  );

  useEffect(() => {
    //To prevent always going to searching even if we go back from it
    if (data.selectedImageThumb) {
      return;
    }

    if (data.topic === PreferredTopic.OTHER) {
      if (data.otherTopic?.trim()) {
        debouncedNavigate("/browse-images");
      }
    } else if (data.topic) {
      // Immediate navigation for predefined topics
      navigate("/browse-images");
    }

    // Cleanup debounced function
    return () => {
      debouncedNavigate.cancel();
    };
  }, [data, navigate, debouncedNavigate]);

  return (
    <PageContainer>
      <FormContainer>
        <StyledHeading>Image finder</StyledHeading>

        <TextField
          label="Name"
          variant="filled"
          color="primary"
          sx={{ mb: 3 }}
          value={data.name}
          onChange={(e) => handleFieldUpdate("name", e.target.value)}
          fullWidth
        />

        <TextField
          label="Surname"
          variant="filled"
          color="primary"
          fullWidth
          value={data.surname}
          onChange={(e) => handleFieldUpdate("surname", e.target.value)}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth>
          <InputLabel id="topic-select-label">Preferred Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            label="Preferred Topic"
            variant="filled"
            value={data.topic || ""}
            onChange={(e) =>
              handleFieldUpdate("topic", e.target.value as PreferredTopic)
            }
            sx={{ mb: 3 }}
            inputProps={{ "data-testid": "topic-select" }}
            endAdornment={
              <InputAdornment
                sx={{ position: "absolute", right: 32 }}
                position="end"
              >
                {data.topic && (
                  <IconButton
                    onClick={() => {
                      handleFieldUpdate("topic", undefined);
                    }}
                  >
                    <ClearIcon></ClearIcon>
                  </IconButton>
                )}
              </InputAdornment>
            }
          >
            {Object.values(PreferredTopic).map((topic) => (
              <MenuItem key={topic} value={topic}>
                {TopicLabels[topic]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {data.topic === PreferredTopic.OTHER && (
          <TextField
            label="Topic"
            variant="filled"
            color="primary"
            fullWidth
            value={data.otherTopic}
            onChange={(e) => updateField("otherTopic", e.target.value)}
            sx={{ mb: 3 }}
          />
        )}
      </FormContainer>
    </PageContainer>
  );
}

export default SearchPage;
