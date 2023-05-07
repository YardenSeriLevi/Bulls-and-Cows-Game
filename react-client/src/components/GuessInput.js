import { Col, Row } from "react-bootstrap";
import NumberPicker from "./NumberPicker";
import { useState } from "react";
import GuessResultTable from "./GuessResultTable";

function GuessInput(props) {
    const [guess, setGuess] = useState(["", "", "", ""]);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState("");
    const [guessAttempts, setGuessAttempts] = useState([]);
    const [numGuesses, setNumGuesses] = useState(0);

    function checkDuplicates(guess) {
        const uniqueDigits = new Set(guess);
        return uniqueDigits.size !== guess.length;
    }

    function handleGuessChange(index, value) {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        // Check for duplicates only if all digits are selected
        const allDigitsSelected = newGuess.every((val) => val !== "");
        if (allDigitsSelected) {
            setIsError(checkDuplicates(newGuess));
        }
    }

    function handleGuessCheck() {
        if(!props.number || checkDuplicates(guess))
            return
        let bulls = 0;
        let cows = 0;
        const numberArray = props.number.split("");
        const guessArray = guess;
        for (let i = 0; i < 4; i++) {
            if (numberArray[i] === guessArray[i]) {
                bulls++;
            } else if (numberArray.includes(guessArray[i])) {
                cows++;
            }
        }
        setResult(`Bulls: ${bulls}, Cows: ${cows}`);
        setNumGuesses(numGuesses + 1);

        if (bulls === 4) {
            setResult(`You won! your score is: ${numGuesses + 1} `);
            setGuessAttempts([]);
            setNumGuesses(0);
            props.onWin(true);
            props.score(numGuesses + 1)
        } else if(guessArray.length === 4) {
            setGuessAttempts([
                ...guessAttempts,
                { guess: guessArray, result: `Bulls: ${bulls}, Cows: ${cows}` },
            ])
        }
    }

    return (
        <div>
            {/*<p>Random number: {number}</p>*/}
            {isError && (
                <p style={{ color: "red" }}>Error: You must select 4 different digits</p>
            )}
            <Row className="justify-content-md-center">
                <Col className="col-auto">
                    <NumberPicker onChange={(value) => handleGuessChange(0, value)} />
                </Col>
                <Col className="col-auto">
                    <NumberPicker onChange={(value) => handleGuessChange(1, value)} />
                </Col>
                {/*<p></p>*/}
                <Col className="col-auto">
                    <NumberPicker onChange={(value) => handleGuessChange(2, value)} />
                </Col>
                <Col className="col-auto">
                    <NumberPicker onChange={(value) => handleGuessChange(3, value)} />
                </Col>
            </Row>
            <p></p>
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleGuessCheck}
            >
                Check
            </button>
            {(!(guess.some((val) => val === ""))&& result ) && <GuessResultTable guessAttempts={guessAttempts} />}

        </div>
    );
}

export default GuessInput;
