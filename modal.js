let modal = document.getElementsByClassName('bg-modal')[0];
let closeModal = document.getElementsByClassName('close');

for (var i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', (event) => {
        modal.style.display = 'none';
    });
}