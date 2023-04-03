const photo = document.querySelector('.photo')

photo.addEventListener('dragstart', dragStart);

function dragStart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

const boxes = document.querySelectorAll('.dropbox');

boxes.forEach(dropbox => {
    dropbox.addEventListener('dragenter', dragEnter)
    dropbox.addEventListener('dragover', dragOver);
    dropbox.addEventListener('dragleave', dragLeave);
    dropbox.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        e.target.appendChild(draggable);
        draggable.classList.remove('hide');
    }