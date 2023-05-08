import React, { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";

function HighScores(props) {
    const [username, setUsername] = useState("");
    // const [score, setScore] = useState("");
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        fetchHighScores().then(r =>
        {

        });
    }, []);

    const fetchHighScores = async () => {
        const response = await fetch("/api/highscores");
        const data = await response.json();
        setHighScores(data);
    };

    function handleResponse(response) {


        console.log(response);
    }
    function handleAddScore(e){
        const form = e.target;
        const formData = new FormData(form);
        const enteredUsername = formData.get("username");

        console.log("in handleResponse username:" +enteredUsername);
        const URL = "api/highscores";
        e.preventDefault();
        let params = {
            username: enteredUsername,
            score: props.score
        };

        console.log("in handleAddScore")
        fetch(URL,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'datatype': 'json'
            },
            body: new URLSearchParams(params).toString()
        })
            .then(handleResponse)
            .catch(() => {

            });
    };
        // const response = await fetch("/java_react_war/api/highscores", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'datatype': 'json'
        //     },
        //     body: new URLSearchParams(params).toString()
        //
        // });
        // if (response.ok) {
        //     setUsername("");
        //     setScore("");
        //     await fetchHighScores();
        // } else {
        //     console.log("Error adding score");
        // }



    return (
        <>
            {/*<form onSubmit={handleAddScore}>*/}
            {/*   */}
            {/*    <label>*/}
            {/*        Username:*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={username}*/}
            {/*            onChange={(e) => setUsername(e.target.value)}*/}
            {/*        />*/}
            {/*    </label>*/}
            {/*    <button className="btn btn-outline-primary" type="submit">Add Score</button>*/}
            {/*</form>*/}
            <Form onSubmit={handleAddScore}>
                <h2> You won! your score is: {props.score}  </h2>
                <Form.Group className="mb-3" >
                    <Form.Label> You may enter your name below to record your score</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="username"/>

                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
    </>
    );
}

export default HighScores;
