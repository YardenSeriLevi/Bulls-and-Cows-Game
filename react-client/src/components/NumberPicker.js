import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

/**
 * NumberPicker component represents a dropdown menu to pick a number from 0 to 9.
 * It allows selecting a number and triggers the onChange callback with the selected value.
 *
 * @param {object} props - The component props
 * @param {function} props.onChange - The callback function triggered when a number is selected
 * @returns {JSX.Element} The rendered NumberPicker component
 */
function NumberPicker(props) {
    const { onChange } = props;
    const [selectedValue, setSelectedValue] = useState('');

    /**
     * Handles the number selection from the dropdown menu.
     * Updates the selected value state and triggers the onChange callback.
     * @param {string} eventKey - The selected number value
     */
    function handleSelect(eventKey) {
        setSelectedValue(eventKey);
        onChange(eventKey);
    }

    return (
        <>
            <DropdownButton
                title={selectedValue || 'Select a number'}
                variant="btn btn-outline-primary"
                onSelect={handleSelect}
                style={{ backgroundColor: 'white' }}
            >
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
