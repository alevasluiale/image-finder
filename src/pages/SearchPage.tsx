import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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

function SearchPage() {
  return (
    <>
      <h2>Image finder</h2>
      <TextField
        label="Name"
        // onChange={(e) => setEmail(e.target.value)}
        variant="filled"
        color="primary"
        sx={{ mb: 3 }}
        fullWidth
        // value={email}
        // error={emailError}
      />
      <TextField
        label="Surname"
        // onChange={(e) => setPassword(e.target.value)}
        variant="filled"
        color="primary"
        // value={password}
        // error={passwordError}
        fullWidth
        sx={{ mb: 3 }}
      />
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="topic-select-label">Preferred Topic</InputLabel>
        <Select
          labelId="topic-select-label"
          id="topic-select"
          // value={age}
          label="Preferred Topic"
          // onChange={handleChange}
          variant="filled"
        >
          {Object.values(PreferredTopic).map((topic) => (
            <MenuItem key={topic} value={topic}>
              {TopicLabels[topic]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SearchPage;
