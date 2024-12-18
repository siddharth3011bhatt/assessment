import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios"


const GridComponent = () => {
    const rows = 20
    const columns = 20
    const [selectedCells, setSelectedCells] = useState([]);

    const handleCellClick = (rowIndex, colIndex) => {
        console.log('inside the handle click =>', rowIndex, colIndex)
        if (selectedCells.length < 2) {
            setSelectedCells([...selectedCells, { rowIndex, colIndex }]);
        }
    };

    const sendCoordinates = async() => {
        console.log('inside the api call function')
        if (selectedCells.length < 2) {
            console.log('Select atleast two boxes')
        } else {
            const payload = {
                cell1: selectedCells[0],
                cell2: selectedCells[1]
            }
            console.log("payload", payload)
            const response = await axios.post("http://localhost:8000/find-path", {
                cell1: selectedCells[0],
                cell2: selectedCells[1]
            })
        }
    }

    console.log('inside the render =>', selectedCells)
    return (
        <>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <Grid item xs={12} key={rowIndex}>
                        <Grid container spacing={1}>
                            {Array.from({ length: columns }).map((_, colIndex) => {
                                const isSelected = selectedCells.some(
                                    (cell) => cell.rowIndex === rowIndex && cell.colIndex === colIndex
                                );

                                return (
                                    <Grid item xs key={`${rowIndex}-${colIndex}`}>
                                        <Paper
                                            elevation={2}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: isSelected ? "#4caf50" : "#f5f5f5",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {rowIndex},{colIndex}
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <button  onClick={sendCoordinates}>Get path</button>
        </>
    )
}

export default GridComponent