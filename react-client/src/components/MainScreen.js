import NumberPicker from "./GuessInput";
import Background from '../images/1.png'
import Game from "./Game";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GameInstructions from "./GameInstructions";
import GuessInput from "./GuessInput";
import '../App.css';

function MainScreen() {
    const [number, setNumber] = useState('');

    function generateNumber() {
        setNumber(Game);
    }

    return (
        <div className="my-component">
        <Container>
            <Row className="justify-content-center align-items-center mb-3">
                <Col xs={12} md={6}>
                    <img src={Background} alt="Cow and Bull" className="img-fluid" />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="d-flex justify-content-center">
                    <GameInstructions />
                    <button type="button" className="btn btn-primary mx-2" onClick={generateNumber}>Start Game</button>
                </Col>
            </Row>
            <p></p>
            <GuessInput number={number} />
            </Container>
        </div>

    );
}

export default MainScreen;
