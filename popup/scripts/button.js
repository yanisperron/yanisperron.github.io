const buttons = document.querySelectorAll('[id^="navra-button-"]');
const buttonData = {'navra-button-maps': maps,'navra-button-website': website};

buttons.forEach(button => {
    const buttonId = button.id;
    const data = buttonData[buttonId];

    if (!data) {
        button.disabled = true;
        button.style.backgroundColor = '#d4d4d4';
        button.style.color = '#999';
        button.style.cursor = 'not-allowed';
        button.classList.add('disabled');
    } else {
        button.addEventListener('click', function () {
            window.open(decodeURIComponent(data), '_blank');
        });
    }
});
