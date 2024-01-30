import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useState } from "react";

const Line = () => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);

  const handleButtonClick = (yearIndex) => {
    setSelectedYearIndex(yearIndex);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Line Chart" subtitle="Simple Line Chart" />
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick(0)}
          >
            2023
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick(1)}
          >
            2024
          </Button>
        </Box>
      </Box>
      <Box height="75vh">
        <LineChart selectedYearIndex={selectedYearIndex} />
      </Box>
    </Box>
  );
};

export default Line;
