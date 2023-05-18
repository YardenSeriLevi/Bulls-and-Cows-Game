import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Background from '../images/4.png';
import GameInstructions from './GameInstructions';
import GuessInput from './GuessInput';
import HighScores from './HighScores';
import Game from './RandomNumber';
import '../App.css';

/**
 * MainScreen component represents the main screen of the game.
 * It displays the game instructions, allows starting the game,
 * handles the game logic, and displays the high scores.
 *
 * @returns {JSX.Element} The rendered MainScreen component
 */
function MainScreen() {
    const [number, setNumber] = useState('');
    const [score, setScore] = useState('');
    const [hasWon, setHasWon] = useState(false);
    const [guessAttempts, setGuessAttempts] = useState([]);

    /**
     * Generates a new random number and resets the game state.
     */
    function generateNumber() {
        handleWin(false);
        setNumber(Game);
        setGuessAttempts([]);
    }

    /**
     * Handles the win event when the player wins the game.
     * @param {boolean} res - Indicates whether the player has won or not
     */
    const handleWin = (res) => {
        setHasWon(res);
    };

    return (
        <Container>
            <Row className="justify-content-center align-items-center mb-3">
                <Col xs={12}>
                    <img src={Background} alt="Cow and Bull" className="img-fluid" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="d-flex justify-content-center">
                    <GameInstructions />
                    <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={generateNumber}
                    >
                        Start Game
                    </button>
                </Col>
            </Row>
            <p></p>
            {!hasWon && (
                <>
                    <GuessInput
                        number={number}
                        onWin={handleWin}
                        score={setScore}
                        guessAttempts={guessAttempts}
                        setGuessAttempts={setGuessAttempts}
                    />
                    <p>Random number: {number}</p>
                </>
            )}
            {hasWon && <HighScores score={score} />}
        </Container>
    );
}

export default MainScreen;
