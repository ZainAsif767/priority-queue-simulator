"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Button, FormGroup, Stack, TextField, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const mainPrimary = `#04A5FF`
const secondary = `#0AFF05`

const CssTextField = styled(TextField)({
  // "& label": { color: "#000000" },
  // "& helperText": { color: "#000000" },
  // "& .MuiInputBase-input": { color: "#000000" },

  // label color  after click
  "& label.Mui-focused": {
    transition: "all 0.3s ease-in-out",
    color: mainPrimary,
  },

  "& .MuiOutlinedInput-root": {
    // border before click
    "& fieldset": {
      transition: "all 0.3s ease-in-out",
      borderColor: "#000000",
    },

    // border after click
    "&.Mui-focused fieldset": {
      transition: "all 0.3s ease-in-out",
      color: mainPrimary,
      border: "1px solid",
    },
  },
})

export default function Home() {
  const [lambda, setLambda] = useState(0)
  const [mu, setMu] = useState(0)

  return (
    <div className=" flex flex-col  justify-center items-center space-y-8 mt-4">
      <div className=" justify-center">
        <h1 className="text-3xl font-bold text-[]">M/M/2 Priority Simulator</h1>
      </div>

      {/* Inputs */}
      <div className=" flex font-medium space-x-12 ">
        <div className=" flex-col ">
          <CssTextField
            label="lambda λ"
            variant="outlined"
            type="number"
            value={lambda}
            onChange={e => setLambda(parseFloat(e.target.value))}
          />
          <p>Arrival Rate</p>
        </div>

        <div className=" flex-col ">
          <CssTextField
            label="mu µ"
            variant="outlined"
            type="number"
            value={mu}
            onChange={e => setMu(parseFloat(e.target.value))}
          />
          <p>Service Rate</p>
        </div>
      </div>
    </div>
  )
}
