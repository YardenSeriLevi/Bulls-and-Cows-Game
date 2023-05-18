import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

/**
 * GuessResultTable component displays the table of guess attempts and their results.
 *
 * @param {Array} guessAttempts - Array of guess attempts
 * @returns {JSX.Element} - The rendered GuessResultTable component
 */
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
