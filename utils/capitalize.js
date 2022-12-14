export default capitalize = (word) => {
    const loweredCase = word.toLowerCase();
    return word[0].toUpperCase() + loweredCase.slice(1);
}