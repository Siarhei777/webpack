/************************************************************/
/* Displaying a modal window with information for the user. */
/************************************************************/
export default (text, func) => {    
    const acceptButton = document.getElementById('accept');    

    acceptButton.style.display = (!func) ? 'none' : 'block';
    acceptButton.setAttribute('data-func',func);

    document.querySelectorAll('.forms').forEach(el => el.classList.add('hidden'));
    
    console.log(func);

    switch (true) {
        case (func === 'findAllVariants' || func == 'countMaxValues'):
            document.getElementById('wipon').classList.remove('hidden');
            break;
        default:
            document.getElementById('control-info-message').innerHTML = text;
            document.getElementById('control-info-message').classList.remove('hidden');
    }    
}