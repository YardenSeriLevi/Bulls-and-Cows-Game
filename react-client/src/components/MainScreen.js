import {useState} from 'react';
import NumberPicker from './GuessInput';
import Background from '../images/4.png';
import Game from './RandomNumber';
import {Col, Container, Row} from 'react-bootstrap';
import GameInstructions from './GameInstructions';
import GuessInput from './GuessInput';
import GuessResultTable from './GuessResultTable';
import '../App.css';
import HighScores from "./HighScores";

function MainScreen() {
    const [number, setNumber] = useState('');
    const [score, setScore] = useState('');
    const [hasWon, setHasWon] = useState(false);
    const [guessAttempts, setGuessAttempts] = useState([]);


    function generateNumber() {
        handleWin(false);
        setNumber(Game);
        setGuessAttempts([]);
    }

    const handleWin = (res) => {
        setHasWon(res);
    };

    return (
        <Container>
            <Row className="justify-content-center align-items-center mb-3">
                <Col xs={12}>
                    <img src={Background} alt="Cow and Bull" className="img-fluid"/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="d-flex justify-content-center">
                    <GameInstructions/>
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
            {!hasWon && <>
                <GuessInput number={number} onWin={handleWin} score={setScore} guessAttempts={guessAttempts}
                            setGuessAttempts={setGuessAttempts}/>
                <p>Random number: {number}</p>
            </>}
            {hasWon &&
                <HighScores score={score}/>}
            {/*<GuessResultTable guessAttempts={guessAttempts} />*/}
        </Container>
    )
}

export default MainScreen;
