import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import HighScoresTable from "./HighScoresTable";

function HighScores(props) {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        fetchHighScores();
    }, []);

    const fetchHighScores = async () => {
        const response = await fetch("/api/highscores");
        const data = await response.json();
        data.forEach(score => {
            console.log(score.username, score.score);
        });
        setHighScores(data);
    };

    async function handleResponse(response) {
        if (response.ok) {
            await fetchHighScores();
        } else {
            console.log("Error adding score");
        }
    }

    function handleAddScore(e) {
        const form = e.target;
        const formData = new FormData(form);
        const enteredUsername = formData.get("username");

        const URL = "api/highscores";
        e.preventDefault();
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
            .catch(() => {});
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

            <HighScoresTable highScores={highScores} />
        </>
    );
}

export default HighScores;
