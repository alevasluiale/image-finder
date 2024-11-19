import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";

enum PreferredTopic {
  TRAVEL = "TRAVEL",
  CARS = "CARS",
  WILDLIFE = "WILDLIFE",
  TECHNOLOGY = "TECHNOLOGY",
  OTHER = "OTHER",
}

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
  return (
    <PageContainer>
      <FormContainer>
        <StyledHeading>Image finder</StyledHeading>

        <TextField
          label="Name"
          variant="filled"
          color="primary"
          sx={{ mb: 3 }}
          fullWidth
        />

        <TextField
          label="Surname"
          variant="filled"
          color="primary"
          fullWidth
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth>
          <InputLabel id="topic-select-label">Preferred Topic</InputLabel>
          <Select
            labelId="topic-select-label"
            id="topic-select"
            label="Preferred Topic"
            variant="filled"
          >
            {Object.values(PreferredTopic).map((topic) => (
              <MenuItem key={topic} value={topic}>
                {TopicLabels[topic]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormContainer>
    </PageContainer>
  );
}

export default SearchPage;
