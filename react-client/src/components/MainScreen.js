import NumberPicker from "./GuessInput";
import Background from '../images/1.png'
import Game from "./Game";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

function MainScreen() {
    const [number, setNumber] = useState('');
    const [guess, setGuess] = useState(['', '', '', '']);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState('');

    function generateNumber() {
        setNumber(Game);
    }

    function checkDuplicates(guess) {
        const uniqueDigits = new Set(guess);
        return uniqueDigits.size !== guess.length;
    }
    function handleGuessChange(index, value) {
        const newGuess = [...guess];
        newGuess[index] = value;
        setGuess(newGuess);

        // Check for duplicates only if all digits are selected
        const allDigitsSelected = newGuess.every(val => val !== '');
        if (allDigitsSelected) {
            setIsError(checkDuplicates(newGuess));
        }
    }

    function handleGuessCheck() {
        let bulls = 0;
        let cows = 0;
        const numberArray = number.split('');
        const guessArray = guess;
        for (let i = 0; i < 4; i++) {
            if (numberArray[i] === guessArray[i]) {
                bulls++;
            } else if (numberArray.includes(guessArray[i])) {
                cows++;
            }
        }
        setResult(`Bulls: ${bulls}, Cows: ${cows}`);
    }

    return (
        <Container>
            <img src={Background} alt="Cow and Bull" />
            <h1>Bulls and Cows</h1>
            <button onClick={generateNumber}>Start Game</button>
            {number && (
                <div>
                    <p>Random number: {number}</p>
                    {isError && <p style={{ color: 'red' }}>Error: cannot select the same number twice</p>}
                    <Row className="justify-content-md-center">
                        <NumberPicker onChange={value => handleGuessChange(0, value)} className="col-3" />
                        <NumberPicker onChange={value => handleGuessChange(1, value)} className="col-3" />
                        <NumberPicker onChange={value => handleGuessChange(2, value)} className="col-3" />
                        <NumberPicker onChange={value => handleGuessChange(3, value)} className="col-3" />
                    </Row>
                    <button onClick={handleGuessCheck}>I selected</button>
                    {result && <p>{result}</p>}
                </div>
            )}
        </Container>
    );
}

export default MainScreen;
