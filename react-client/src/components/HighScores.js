import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import HighScoresTable from "./HighScoresTable";

/**
 * HighScores component displays the high scores table and allows the user to submit their score.
 *
 * @param {Object} props - Component props
 * @param {number} props.score - The score of the player
 * @returns {JSX.Element} - The rendered HighScores component
 */
function HighScores(props) {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState("");
    const [scoreSubmitted, setScoreSubmitted] = useState(false);

    const errorMessage = "HO HO looks like we can't connect to the server. Please try again.";
    /**
     * Fetches the high scores from the server.
     */
    const fetchHighScores = async () => {
        try {
            const response = await fetch("/api/highscores");
            if (response.ok) {
                setError("");
                const data = await response.json();
                setHighScores(data);
            } else {
                setError(errorMessage);
            }
        } catch (error) {
            setError(errorMessage);
        }
    };

    /**
     * Handles the response from the server after adding a score.
     * If the response is successful, fetches the updated high scores.
     *
     * @param {Response} response - The response from the server
     */
    async function handleResponse(response) {
        if (response.ok) {
                await fetchHighScores();
                setError("");
                setScoreSubmitted(true);
            }

        else
        {
            setError(errorMessage);
        }
    }

    /**
     * Handles the form submission to add the player's score.
     *
     * @param {Event} e - The form submission event
     */
    function handleAddScore(e) {
        e.preventDefault();
        if (scoreSubmitted) {
            return; // Score already submitted, do nothing
        }

        const form = e.target;
        const formData = new FormData(form);
        const enteredUsername = formData.get("username");
        if (!enteredUsername) {
            setError("Please enter a username.");
            return;
        }

        const URL = "api/highscores";
        let params = {
            username: enteredUsername,
            score: props.score
        };

        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                datatype: "json"
            },
            body: new URLSearchParams(params).toString()
        })
            .then(handleResponse)
            .catch(() => setError(errorMessage));
    }

    return (
        <>
        {!scoreSubmitted && (
            <Form onSubmit={handleAddScore}>
                <h2>You won! Your score is: {props.score}</h2>
                <Form.Group className="mb-3">
                    <Form.Label>
                        You may enter your name below to record your score
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="username" />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

            </Form>
        )}
            {error && <p style={{color: "red"}}>{error}</p>}

            {!error && scoreSubmitted && <HighScoresTable highScores={highScores} />}
        </>
    );
}

export default HighScores;
