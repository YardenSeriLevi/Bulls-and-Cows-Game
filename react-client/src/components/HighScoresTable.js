import React from "react";
import { Table } from "react-bootstrap";

/**
 * HighScoresTable component displays a table of high scores.
 *
 * @param {Object} props - Component props
 * @param {Array} props.highScores - An array of high score objects
 * @returns {JSX.Element} - The rendered HighScoresTable component
 */
function HighScoresTable({ highScores }) {
    // Sort the highScores array in ascending order based on the score
    const sortedScores = highScores.sort((a, b) => a.score - b.score);

    return (<>
        <div>

        <h2>High Scores </h2>
        <Table striped bordered hover className="table-blue">
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {sortedScores.map((score, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </div>
    </>
    );
}

export default HighScoresTable;
