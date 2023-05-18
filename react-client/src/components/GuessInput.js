import {Col, Row} from "react-bootstrap";
import NumberPicker from "./NumberPicker";
import {useState} from "react";
import GuessResultTable from "./GuessResultTable";

/**
 * GuessInput component renders the input section for the player to make guesses.
 * It allows the player to select four digits between 0-9 and provides feedback on the correctness of the guesses.
 *
 * @param {Object} props - The component props
 * @param {string} props.number - The secret number to be guessed
 * @param {Function} props.setGuessAttempts - A function to update the guess attempts
 * @param {Array} props.guessAttempts - An array of previous guess attempts
 * @param {Function} props.onWin - A function to handle the winning condition
 * @param {Function} props.score - A function to update the player's score
 * @returns {JSX.Element} The rendered GuessInput component
 */
function GuessInput(props) {
    const [guess, setGuess] = useState(["", "", "", ""]);
    const [dupError, setDupError] = useState(false);
    const [selectError, setSelectError] = useState(false);
    const [result, setResult] = useState("");

    const duplicateError = "Error: You must select 4 different digits";
    const wrongInput = "Please select 4 different digits";

    /**
     * Checks if there are duplicates in the guess.
     *
     * @param {string[]} guess - The guess array
     * @returns {boolean} - `true` if duplicates exist, `false` otherwise
     */
    function checkDuplicates(guess) {
        const uniqueDigits = new Set(guess);
        return uniqueDigits.size !== guess.length;
    }

    /**
     * Updates the current guess and checks for duplication and completion.
     *
     * @param {number} index - The index of the current guess
     * @param {string} value - The value selected by the user
     */
    function handleGuessChange(index, value) {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        // Check for duplicates only if all digits are selected
        const digitsSelected = allDigitsSelected(newGuess);
        if (digitsSelected) {
            if (selectError) setSelectError(false);
            setDupError(checkDuplicates(newGuess));
        }
    }

    /**
     * Checks if all digits have been selected.
     *
     * @param {string[]} newGuess - The current guess array
     * @returns {boolean} - `true` if all digits are selected, `false` otherwise
     */
    function allDigitsSelected(newGuess) {
        return newGuess.every((val) => val !== "");
    }

    /**
     * Handles the guess checking event.
     * Validates the guess, updates the result, and handles win and new guess attempts.
     */
    function handleGuessCheck() {
        const digitsSelected = allDigitsSelected(guess);
        if (!digitsSelected) {
            setSelectError(true);
        } else {
            setSelectError(false);
        }

        if (!props.number || checkDuplicates(guess) || selectError) {
            return;
        }

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
            setResult("You won!");
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
                    {guess: guessArray, result: `Bulls: ${bulls}, Cows: ${cows}`},
                ];
                props.setGuessAttempts(updatedGuessAttempts);
            }
        }
    }

    return (
        <div>
            <div className="text-center">
                {dupError ? (
                    <p style={{color: "red"}}>{duplicateError}</p>
                ) : selectError ? (
                    <p style={{color: "red"}}>{wrongInput}</p>
                ) : null}
            </div>
            <Row className="justify-content-center">
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(0, value)}/>
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(1, value)}/>
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(2, value)}/>
                </Col>
                <Col xs="auto" className="mb-3">
                    <NumberPicker onChange={(value) => handleGuessChange(3, value)}/>
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
            {!(guess.some((val) => val === "")) && result && (
                <GuessResultTable guessAttempts={props.guessAttempts}/>
            )}
        </div>
    );
}

export default GuessInput;