const textArea = document.querySelectorAll('[data-autoresize]');

textArea.forEach(text => {
    let textAreaH =text.offsetHeight;
    text.addEventListener('input', e => {

        //console.log('Input text');
        let target = e.target;
        target.style.height = textAreaH + 'px';
        target.style.height = target.scrollHeight + 'px';

    });
});