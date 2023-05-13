
import { Col, Row } from "react-bootstrap";
import NumberPicker from "./NumberPicker";
import { useState } from "react";
import GuessResultTable from "./GuessResultTable";

/**
 * This component create 4 dropdown labels that the user should choose in any of them a number between 0-9
 * then when the
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function GuessInput(props) {
    const [guess, setGuess] = useState(["", "", "", ""]);
    const [dupError, setDupError] = useState(false);
    const [selectError, setSelectError] = useState(false);
    const [result, setResult] = useState("");

    const duplicateError = "Error: You must select 4 different digits"
    const wrongInput = "Please select 4 different digits"

    /**
     * This function checks if there is dupliacation in the numbers
     * @param guess
     * @returns {boolean}
     */
    function checkDuplicates(guess) {
        const uniqueDigits = new Set(guess);
        return uniqueDigits.size !== guess.length;
    }

    /**
     * This function update the current guess and checks if all the numbers where pieced and if there is duplication
     * @param index the index os the current guess
     * @param value the value that the user choose
     */
    function handleGuessChange(index, value) {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        // Check for duplicates only if all digits are selected
        const DigitsSelected = allDigitsSelected(newGuess)
        // const allDigitsSelected = newGuess.every((val) => val !== "");
        if (DigitsSelected) {
            if(selectError)
                setSelectError(false);
            setDupError(checkDuplicates(newGuess));
        }
    }

    /**
     * This function returns true or false if the all guess attempted
     * @param newGuess newGuess is the curr guesses
     * @returns true or false if the all guess attempted
     */
    function allDigitsSelected(newGuess)
    {
        return newGuess.every((val) => val !== "");
    }

    /**
     *
     */
    function handleGuessCheck() {
        const DigitsSelected = allDigitsSelected(guess);
        if(!DigitsSelected)
            setSelectError(true);
        else
            setSelectError(false);

        if (!props.number || checkDuplicates(guess) || selectError) return;

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

        if (bulls === 4) {
            setResult(`You won!`);
            props.setGuessAttempts([]);
            props.onWin(true);
            props.score(props.guessAttempts.length + 1);
        } else if (guessArray.length === 4) {
            const existingGuess = props.guessAttempts.find(
                (attempt) => attempt.guess.join("") === guessArray.join("")
            );

            if (!existingGuess) {
                const updatedGuessAttempts = [
                    ...props.guessAttempts,
                    { guess: guessArray, result: `Bulls: ${bulls}, Cows: ${cows}` },
                ];
                props.setGuessAttempts(updatedGuessAttempts);
            }
        }
    }

    return (
        <div>
            <div className="text-center">
                {
                    dupError ? (
                        <p style={{ color: "red" }}>{duplicateError}</p>
                    ) : selectError ? (
                        <p style={{ color: "red" }}>{wrongInput}</p>
                    ) : null
                }
            </div>
            <Row className="justify-content-center">
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(0, value)} />
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(1, value)} />
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(2, value)} />
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(3, value)} />
                </Col>
            </Row>
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleGuessCheck}
                >
                    Check
                </button>
            </div>
            {(!(guess.some((val) => val === "")) && result) && <GuessResultTable guessAttempts={props.guessAttempts} />}
        </div>
    );
}

export default GuessInput;
