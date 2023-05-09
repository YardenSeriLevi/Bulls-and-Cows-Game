import React from "react";
import {Table} from "react-bootstrap";

function HighScoresTable({ highScores }) {
    return (
        <Table striped bordered hover className="table-blue">
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {highScores.map((score, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default HighScoresTable;
