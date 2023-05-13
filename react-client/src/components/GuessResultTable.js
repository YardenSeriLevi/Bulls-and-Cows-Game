import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

function GuessResultTable({ guessAttempts }) {
    // Reverse the guessAttempts array to display the last guess first
    const reversedAttempts = guessAttempts.slice().reverse();

    return (
        <Table striped bordered hover className="table-blue">
            <thead>
            <tr>
                <th>Guess</th>
                <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {reversedAttempts.map((attempt, index) => (
                <tr key={index}>
                    <td>{attempt.guess.join(', ')}</td>
                    <td>{attempt.result}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default GuessResultTable;
