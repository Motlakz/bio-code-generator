// handle mode change
document.querySelector('.mode').addEventListener('click', function () {
    document.body.classList.toggle('light');
    document.querySelector('.moon').classList.toggle('sun');
    document.querySelector('.mode').classList.toggle('day');
});

// handle QR code generator functionality
function handleSubmit(event) {
    event.preventDefault();

    let text = document.getElementById("url-input").value;
    let QR_SRC = 
        `http://api.qrserver.com/v1/create-qr-code/?data=${text}`;
    let QR_IMG = document.getElementById("qr-img");
    QR_IMG.src = QR_SRC;
    QR_IMG.classList.add('animate');
    QR_IMG.style.display = 'block';
    QR_IMG.style.width = '150px';
    QR_IMG.style.height = '150px';
}

