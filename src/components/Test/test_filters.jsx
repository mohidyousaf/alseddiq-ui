import React, { useState } from "react";
import {
  Autocomplete,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Data from "../../data/navigation/Data.json";
import "react-datepicker/dist/react-datepicker.css";
import Test_Table from "./test_table";

function TestFilters() {
  const [selectedSort, setSelectedSort] = useState("Ascending"); // State for sorting
  const [sortedData, setSortedData] = useState(Data); // State to hold the sorted data
  const [selectedValue, setSelectedValue] = useState("");


  const handleSortChange = (event) => {
    const sortOrder = event.target.value;
    setSelectedSort(sortOrder);

    // Sort data alphabetically by the first letter of `testName`
    const sorted = [...sortedData].sort((a, b) => {
      const nameA = a.testName?.charAt(0).toUpperCase(); // Get the first letter and make it uppercase
      const nameB = b.testName?.charAt(0).toUpperCase();

      if (nameA < nameB) return sortOrder === "Ascending" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "Ascending" ? 1 : -1;
      return 0; 
    });

    setSortedData(sorted); 
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <div
        className="custom-container"
        style={{
          minWidth: "450px",
          padding: "2px",
          marginBottom: "8px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 250,
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Autocomplete
            disablePortal
            options={Data.map((item) => item.group)}
            sx={{ width: 250 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Test Type"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
            )}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            minWidth: 200,
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Autocomplete
            disablePortal
            options={Data.map((item) => item.testName)}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Test Name"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
              />
            )}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={selectedSort}
            onChange={handleSortChange}
            label="Sort By"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
          >
            <MenuItem value="Ascending">Ascending</MenuItem>
            <MenuItem value="Descending">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Test_Table data={sortedData} />
    </>
  );
}

export default TestFilters;
