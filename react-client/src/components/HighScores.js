import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import HighScoresTable from "./HighScoresTable";

function HighScores(props) {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState("");

    const errorMessage = "HO HO looks like we can't connect to the server. Please try again.";

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

    async function handleResponse(response) {
        if (response.ok) {
            setError("");
            await fetchHighScores();
        } else {
            setError(errorMessage);
        }
    }

    function handleAddScore(e) {

        e.preventDefault();
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
            <Form onSubmit={handleAddScore}>
                <h2> You won! Your score is: {props.score} </h2>
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
            {error && <p> {error} </p>}
            {!error && <HighScoresTable highScores={highScores} />}
        </>
    );
}

export default HighScores;
