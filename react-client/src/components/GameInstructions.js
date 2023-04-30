import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function InstructionsModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Game Instructions
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'white' }}>
                    <p>Here are the game instructions:</p>
                    <ul>
                        <li>Choose 4 digits between 0 and 9</li>
                        <li>The digits must be unique (no repeats)</li>
                        <li>Click "Check" to see how many bulls and cows you have</li>
                        <li>Bulls are correct digits in the correct position</li>
                        <li>Cows are correct digits in the wrong position</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'lightblue' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InstructionsModal;
