/**
 * Generates a random 4-digit number by shuffling and selecting the first 4 digits from the array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].
 *
 * @returns {string} A random 4-digit number
 */
function getRandomNumber() {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let number = '';

    // Shuffle digits array
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    // Take the first 4 digits of the shuffled array
    for (let i = 0; i < 4; i++) {
        number += digits[i];
    }

    return number;
}

export default getRandomNumber;
