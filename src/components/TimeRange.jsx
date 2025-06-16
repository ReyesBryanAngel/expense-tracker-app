import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const TimeRange = ({ filter, handleFilterChange }) => {
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      position="relative"
    >
      <Typography variant="h6" color="textSecondary" sx={{ position: "absolute", top: -30, left: 0 }}>
        Spending Overview
      </Typography>
      <FormControl size="small">
        <InputLabel>Range</InputLabel>
        <Select value={filter} label="Range" onChange={handleFilterChange}>
          <MenuItem value="30d">Last 30 Days</MenuItem>
          <MenuItem value="3m">Last 3 Months</MenuItem>
          <MenuItem value="6m">Last 6 Months</MenuItem>
          <MenuItem value="year">This Year</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TimeRange;
