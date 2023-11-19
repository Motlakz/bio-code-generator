document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const modeButton = document.querySelector('.mode');
    const moonIcon = document.querySelector('.moon');
    const modeIcon = document.querySelector('.mode');
    const qrImage = document.getElementById('qr-img');
    const downloadButton = document.querySelector('.download');
    const shareButton = document.querySelector('.share');
    const modal = document.querySelector('.share-modal');
    const urlInput = document.getElementById('url-input');

    modeButton.addEventListener('click', function () {
        body.classList.toggle('light');
        moonIcon.classList.toggle('sun');
        modeIcon.classList.toggle('day');
    });

    function isValidUrl(url) {
        // Simple URL validation, soon to use a more robust library
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const text = urlInput.value.trim();

        if (!text) {
            alert('Please enter a URL.');
            return;
        }

        if (!isValidUrl(text)) {
            alert('Please enter a valid URL.');
            return;
        }

        const qrSrc = `http://api.qrserver.com/v1/create-qr-code/?data=${text}`;
        qrImage.src = qrSrc;
        qrImage.classList.add('animate');
        qrImage.style.display = 'block';
        qrImage.style.width = '150px';
        qrImage.style.height = '150px';

        downloadButton.disabled = false;
        shareButton.disabled = false;
    }

    function downloadQRCode() {
        const dataUrl = qrImage.src;
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'qrcode.png';

        downloadLink.click();
    }

    function showModal() {
        modal.style.display = 'flex';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function shareQRCode(platform) {
        const qrCodeSrc = qrImage.src;
        const shareableUrl = platform + '?qr=' + encodeURIComponent(qrCodeSrc);

        window.open(shareableUrl, '_blank');
    }

    downloadButton.addEventListener('click', downloadQRCode);
    document.getElementById('form').addEventListener('submit', handleSubmit);
    shareButton.addEventListener('click', showModal);
    document.querySelector('.close').addEventListener('click', hideModal);

    const socialMediaButtons = ['instagram', 'facebook', 'twitter', 'linkedin'];

    socialMediaButtons.forEach(function (platform) {
        document.getElementById(platform).addEventListener('click', function () {
            shareQRCode(`https://www.${platform}.com/`);
        });
    });
});
