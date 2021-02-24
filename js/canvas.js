const scale = 1.2;
const hexRegex = /^#[0-9A-Fa-f]{6}$/gi;

const defaultColors = [
    {
        id: 'btn-black',
        color: 'black',
        text: 'black'
    },
    {
        id: 'btn-red',
        color: 'red',
        text: 'red'
    },
    {
        id: 'btn-blue',
        color: 'blue',
        text: 'blue'
    },
    {
        id: 'btn-green',
        color: 'green',
        text: 'green'
    },
    {
        id: 'btn-erase',
        color: 'whitesmoke',
        text: 'Errasing'
    }
];

window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');
    const clear = document.getElementById('clearbtn');
    const displayStrokeMode = document.getElementById('mode-colour');
    let lineWidthvar = 5;

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
        if (!painting)
            return;
        ctx.lineWidth = lineWidthvar;
        ctx.lineCap = 'round';
        let bounds = e.target.getBoundingClientRect();
        let x = e.pageX - bounds.left - scrollX;
        let y = e.pageY - bounds.top - scrollY;
        if (istouch) {
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
    canvas.addEventListener('mouseout', finishedPosition, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('touchstart', (e) => { istouch = true; startPosition(e); istouch = false; }, false);
    canvas.addEventListener('touchend', finishedPosition, false);
    canvas.addEventListener('touchmove', (e) => { istouch = true; draw(e); istouch = false; }, false);
    clear.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    for (let i = 0; i < defaultColors.length; ++i) {
        document.getElementById(defaultColors[i].id).addEventListener('click', function () {
            ctx.strokeStyle = defaultColors[i].color;
            displayStrokeMode.textContent = defaultColors[i].text;
        });
    }
    document.getElementById('btn-resize').addEventListener('click', function () {
        let size = prompt("Please enter stroke size:", lineWidthvar);
        if (size != null && size != "") {
            lineWidthvar = parseInt(size);
        }
    });
    document.getElementById('btn-custom').addEventListener('click', function () {
        let style = prompt("Please hex code for color (Format must be #XXXXXX where X is the hex digit):", ctx.strokeStyle);
        if (style != null && style != "") {
            if(hexRegex.exec(style)) {
                ctx.strokeStyle = style;
                displayStrokeMode.textContent = style;
            }
            else {
                alert("Wrong hex code format!!");
            }
        }
    });
});
