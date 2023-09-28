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
  // const [lambda, setLambda] = useState(0)
  // const [mu, setMu] = useState(0)
  const [arrivalRate, setArrivalRate] = useState(0)
  const [serviceRate, setServiceRate] = useState(0)
  const [cpValues, setCpValues] = useState([])
  const [cpLookupTable, setCpLookupTable] = useState([])
  const [interArrivalTimes, setInterArrivalTimes] = useState([])
  const [arrivalTimes, setArrivalTimes] = useState([])
  const [serviceTimes, setServiceTimes] = useState([])
  const [tableGenerated, setTableGenerated] = useState(false)

  const saveValues = () => {}

  const generatePriorityTable = () => {
    const lambda = parseFloat(arrivalRate)
    if (isNaN(lambda) || lambda <= 0) {
      alert("Please enter a valid positive arrival rate (λ).")
      return
    }

    let x = 0
    let cumulativeProbability = 0
    const calculatedCpValues = []
    const calculatedCpLookupTable = []

    while (cumulativeProbability < 0.9999999) {
      const factorial = calculateFactorial(x)
      const probability = (Math.exp(-lambda) * Math.pow(lambda, x)) / factorial
      cumulativeProbability += probability
      calculatedCpValues.push({ x, cumulativeProbability })
      calculatedCpLookupTable.push(cumulativeProbability)
      x++
    }

    calculatedCpLookupTable.unshift(0)

    setCpValues(calculatedCpValues)
    setCpLookupTable(calculatedCpLookupTable)
    const iATime = []
    let previousArrivalTime = 0

    for (let i = 0; i < cpLookupTable.length; i++) {
      const randomIndex = Math.floor(Math.random() * cpLookupTable.length)
      iATime.push(randomIndex)
    }
    setInterArrivalTimes(iATime)

    const arrivalTimes = iATime.map(value => {
      const currentInterArrivalTime = value
      const arrivalTime = previousArrivalTime + currentInterArrivalTime
      previousArrivalTime = arrivalTime
      return arrivalTime
    })

    setArrivalTimes(arrivalTimes)

    const serTime = []
    for (let i = 0; i < cpLookupTable.length; i++) {
      const serviceTime = Math.ceil(-serviceRate * Math.log(Math.random()))
      serTime.push(serviceTime)
    }
    setServiceTimes(serTime)
    setTableGenerated(true)
  }

  const calculateFactorial = n => {
    if (n === 0) return 1
    let factorial = 1
    for (let i = 1; i <= n; i++) {
      factorial *= i
    }
    return factorial
  }
  // Calculate Utilization Factor (ρ)
  const utilizationFactor = parseFloat(arrivalRate) / parseFloat(serviceRate)

  // Calculate Average Time a Customer Spends in the System (W)
  const avgTimeInSystem =
    utilizationFactor > 0
      ? 1 / (parseFloat(serviceRate) - parseFloat(arrivalRate))
      : 0

  // Calculate Average Time a Customer Spends Waiting in the Queue (Wq)
  const avgTimeInQueue =
    utilizationFactor > 0 ? avgTimeInSystem - 1 / parseFloat(serviceRate) : 0

  // Calculate Average Number of Customers in the Queue (Lq)
  const avgCustomersInQueue = parseFloat(arrivalRate) * avgTimeInQueue

  // Calculate Average Number of Customers in the System (L)
  const avgCustomersInSystem = parseFloat(arrivalRate) * avgTimeInSystem

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
            value={arrivalRate}
            onChange={e => setArrivalRate(parseFloat(e.target.value))}
          />
          <p>Arrival Rate</p>
        </div>

        <div className=" flex-col ">
          <CssTextField
            label="mu µ"
            variant="outlined"
            type="number"
            value={serviceRate}
            onChange={e => setServiceRate(parseFloat(e.target.value))}
          />
          <p>Service Rate</p>
        </div>
      </div>

      <>
        <button onClick={generatePriorityTable}>Submit</button>
      </>

      {tableGenerated && (
        <div>
          <table className="  w-full mt-4 mb-7">
            <thead>
              <tr>
                <th className=" text-white  px-4 ">S.no#</th>
                <th className=" text-white  px-4">
                  Cumulative Probability (Cp)
                </th>
                <th className=" text-white  px-4">Cp Lookup</th>
                <th className=" text-white  px-4">Avg Time Between Arrivals</th>
                <th className=" text-white  px-4">Inter Arrival Time</th>
                <th className=" text-white  px-4">Arrival Time</th>
                <th className=" text-white  px-4">Service Time</th>
              </tr>
            </thead>
            <tbody>
              {cpValues.map((value, index) => (
                <tr key={index}>
                  <td className="  px-4">{value.x + 1}</td>
                  <td className="  px-4">
                    {value.cumulativeProbability.toFixed(6)}
                  </td>
                  <td className="  px-4">{cpLookupTable[index].toFixed(6)}</td>
                  <td className="  px-4">{value.x}</td>
                  <td className="  px-4">{interArrivalTimes[index] || 0}</td>
                  <td className="  px-4">{arrivalTimes[index] || 0}</td>
                  <td className="  px-4">{serviceTimes[index] || 1}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="  w-full mt-4 mb-7 text-left ">
            <tr>
              <th className=" text-white  px-4 ">Metric</th>
              <th className=" text-white  px-4">Value</th>
            </tr>
            <tr>
              <td className="text-left  px-4"> Utilization Factor (ρ)</td>
              <td className="   px-4"> {utilizationFactor.toFixed(6)} </td>
            </tr>

            <tr>
              <td className=" text-left px-4">
                {" "}
                Average Time a Customer Spends in the System (W){" "}
              </td>
              <td className="   px-4"> {avgTimeInSystem.toFixed(6)}</td>
            </tr>
            <tr>
              <td className=" text-left px-4">
                {" "}
                Average Time a Customer Spends Waiting in the Queue (Wq){" "}
              </td>
              <td className="   px-4"> {avgTimeInQueue.toFixed(6)}</td>
            </tr>

            <tr>
              <td className=" text-left px-4">
                {" "}
                Average Number of Customers in the Queue (Lq){" "}
              </td>
              <td className="   px-4"> {avgCustomersInQueue.toFixed(6)}</td>
            </tr>
            <tr>
              <td className=" text-left px-4">
                {" "}
                Average Number of Customers in the System (L){" "}
              </td>
              <td className="   px-4"> {avgCustomersInSystem.toFixed(6)}</td>
            </tr>
          </table>
        </div>
      )}
    </div>
  )
}
