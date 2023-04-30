import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

function NumberPicker(props) {
    const { onChange } = props;
    const [selectedValue, setSelectedValue] = useState("");

    function handleSelect(eventKey) {
        setSelectedValue(eventKey);
        onChange(eventKey);
    }

    return (
        <>
            <DropdownButton title={selectedValue || "Select a number"}
                            variant="btn btn-outline-primary"
                            onSelect={handleSelect}>

                {[...Array(10).keys()].map((number) => (
                    <Dropdown.Item key={number} eventKey={number}>
                        {number}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </>
    );
}
export default NumberPicker;
