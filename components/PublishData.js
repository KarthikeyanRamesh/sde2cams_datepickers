import React, { useState, useEffect } from "react";
import {
  Select,
  Box,
  MenuItem,
  Input,
  FormControl,
  Modal
} from "@mui/material";
import { DateField } from '@mui/x-date-pickers/DateField';

import {  LocalizationProvider, DatePicker
 } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function PublishData() {
  const options = [
    "last 3 months",
    "last 6 months",
    "last 1 year",
    "custom range",
  ];
  const optionsMap = {
    "last 3 months": ["2024-12-19", "2025-03-19"],
    "last 6 months": ["2024-9-19", "2025-03-19"],
  };

  const sampleData = [
    {
      published_date: "2025-01-01",
      title: "MF ER Rule",
    },
    {
      published_date: "2024-10-01",
      title: "SEBI rule in AMC",
    },
    {
      published_date: "2002-03-01",
      title: "TAR",
    },
    {
      published_date: "2010-05-05",
      title: "IPO",
    },
  ];

  const [result, setResult] = useState([])

  const [selectedRange, setSelectedRange] = useState(options[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState();
const today = new Date();
const formatted = today.toISOString().split("T")[0];

  useEffect(() => {
    if(selectedRange === options[0]) {
        const startdate = today.getMonth() - 3
        setStartDate(startDate.toISOString().split("T")[0])
        const start = new Date(optionsMap[selectedRange][0])
        const end = new Date(optionsMap[selectedRange][1])
        const temp = sampleData.filter((item) => {
            return new Date(item.published_date) >= start && new Date(item.published_date) <= end
        })
        console.log("calculated ans: ")
        console.log(temp)
        setResult(temp)
        // setResult(sampleData.filter((item) => item.published_date >= optionsMap[selectedRange][0] && item.published_date <= optionsMap[selectedRange[1]]))
    }
  }, [selectedRange]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "10px",
        margin: "20px",
      }}
    >
      <FormControl>
        <Select
          value={selectedRange}
          onChange={(e) => {
            let selectedOption = e.target.value;
            if (selectedOption === "custom range") {
              setIsModalOpen(true);
            }
            setSelectedRange(selectedOption);
          }}
        >
          {options.map((item) => {
            return (
              <MenuItem
                //   onSelect={(e) => {
                //     console.log(e.target.value);
                //     setSelectedRange(e.target.value);
                //   }}
                value={item}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
       <Modal open={isModalOpen}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={new Date()} label="from date" onChange={() => {}} />
        <DatePicker value={new Date()} label="to date" onChange={() => {}} />
            </LocalizationProvider>
      </Modal> 
      <Input  type="date" value={startDate} disabled/>
      <Input type="data" value={formatted} />
      <ul> 
      {result.map((res) => {
        return <li>{res.title}({res.published_date})</li>
      })}
      </ul>
    </Box>
  );
}
