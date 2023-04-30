import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

function GuessResultTable({ guessAttempts }) {
    return (
        <Table striped bordered hover className="table-blue">
            <thead>
            <tr>
                <th>#</th>
                <th>Guess</th>
                <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {guessAttempts.map((attempt, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{attempt.guess.join(', ')}</td>
                    <td>{attempt.result}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default GuessResultTable;
