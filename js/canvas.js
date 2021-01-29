const scale = 1.2;
window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');
    const save = document.getElementById('savebtn');
    const clear = document.getElementById('clearbtn');
    const link = document.getElementById('link-to-pic')

    // resizing
    canvas.height = window.innerHeight / scale;
    canvas.width = window.innerWidth - 20;

    //variables
    let painting = false;
    let istouch = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if(!painting)
            return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        let bounds = e.target.getBoundingClientRect();
        let x = e.pageX - bounds.left - scrollX;
        let y = e.pageY - bounds.top - scrollY;
        if(istouch) {
            x = e.touches[0].pageX - bounds.left - scrollX;
            y = e.touches[0].pageY - bounds.top - scrollY;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // event listeners
    canvas.addEventListener('mousedown', startPosition, false);
    canvas.addEventListener('mouseup', finishedPosition, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('touchstart', (e) => {istouch = true; startPosition(e); istouch = false;}, false);
    canvas.addEventListener('touchend', finishedPosition, false);
    canvas.addEventListener('touchmove', (e) => {istouch = true; draw(e); istouch = false;}, false);
    clear.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    save.addEventListener('click', function() {
        link.value = canvas.toDataURL();
    });
    document.getElementById('btn-black').addEventListener('click', function() {
        ctx.strokeStyle = 'black';
    });
    document.getElementById('btn-red').addEventListener('click', function() {
        ctx.strokeStyle = 'red';
    });
    document.getElementById('btn-green').addEventListener('click', function() {
        ctx.strokeStyle = 'green';
    });
    document.getElementById('btn-blue').addEventListener('click', function() {
        ctx.strokeStyle = 'blue';
    });
});
