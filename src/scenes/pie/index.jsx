import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useState } from "react";

const Pie = () => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // Inicialize com o índice 0 (2023)

  const handleButtonClick = (yearIndex) => {
    setSelectedYearIndex(yearIndex); // Atualize o índice quando um botão for clicado
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Pie Chart" subtitle="Simple Pie Chart" />
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick(0)} // Passa o índice 0 (2023)
          >
            2023
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick(1)} // Passa o índice 1 (2024)
          >
            2024
          </Button>
        </Box>
      </Box>
      <Box height="75vh">
        <PieChart selectedYearIndex={selectedYearIndex} />{" "}
        {/* Passa o índice selecionado */}
      </Box>
    </Box>
  );
};

export default Pie;
