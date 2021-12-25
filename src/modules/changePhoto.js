const changePhoto = () => {
    const command = document.getElementById('command');
    let attributeValue;

    command.addEventListener('mouseover', (event) => {
        const target = event.target;
        if (!target.matches('.command__photo')) return;
        else {
            attributeValue = target.getAttribute('src');
            target.setAttribute('src', target.getAttribute('data-img'));
        }
    });
    command.addEventListener('mouseout', (event) => {
        const target = event.target;
        if (!target.matches('.command__photo')) return;
        else {
            target.setAttribute('src', attributeValue);
        }
    });
};

export default changePhoto;