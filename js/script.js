// Copyright (c) 2021, Ahmed Alaa-Eldin Zakaria Ali Khfagy 
// All rights reserved.
const scale = 1.1;
const hexRegex = /^#[0-9A-Fa-f]{6}$/gi;

const defaultColors = [
    {
        id: 'link-chalk',
        color: '#e0dbd1',
        text: 'chalk'
    },
    {
        id: 'link-red',
        color: 'red',
        text: 'red'
    },
    {
        id: 'link-blue',
        color: 'blue',
        text: 'blue'
    },
    {
        id: 'link-green',
        color: 'green',
        text: 'green'
    },
    {
        id: 'link-erase',
        color: '#31343a',
        text: 'Errasing'
    }
];

window.addEventListener('load', () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext('2d');
    const clear = document.getElementById('clearlink');
    const slider = document.getElementById('stroke-size');
    var sliderStyle = document.querySelector('[data="slider-data"]');
    let color_of_stroke = defaultColors[0].color;
    // resizing
    canvas.height = window.innerHeight - 10;
    canvas.width = window.innerWidth - 8;
    
    //variables
    let painting = false;
    let istouch = false;
    setSliderStyle(slider.value);
    
    function startPosition(e) {
        painting = true;
        document.getElementById("open-sidebar").style.display = 'none';
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        document.getElementById("open-sidebar").style.display = 'block';
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting)
            return;
        ctx.lineWidth = slider.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color_of_stroke;
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
    function setSliderStyle(value){
        sliderStyle.innerHTML =
             ".slider::-webkit-slider-thumb {"+
             " background:" + color_of_stroke + "; width: " + value + 
             "px !important; height: "+ value + "px !important; } "+
             ".slider::-moz-range-thumb{"+
             " background:" + color_of_stroke + "; width: " + value + 
             "px !important; height: "+ value + "px !important; } ";
    }

    slider.oninput = function() {
        setSliderStyle(slider.value);
    };

    // event listeners
    canvas.addEventListener('mousedown', startPosition, false);
    canvas.addEventListener('mouseup', finishedPosition, false);
    canvas.addEventListener('mouseout', finishedPosition, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('touchstart', (e) => { istouch = true; e.preventDefault(); startPosition(e); istouch = false; }, false);
    canvas.addEventListener('touchend', finishedPosition, false);
    canvas.addEventListener('touchmove', (e) => { istouch = true; e.preventDefault(); draw(e); istouch = false; }, false);
    
    clear.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    for (let i = 0; i < defaultColors.length; ++i) {
        document.getElementById(defaultColors[i].id).addEventListener('click', function () {
            color_of_stroke= defaultColors[i].color;
            setSliderStyle();
        });
    }
    document.getElementById('link-custom').addEventListener('click', function () {
        let style = prompt("Please hex code for color (Format must be #XXXXXX where X is the hex digit):", color_of_stroke);
        if (style != null) {
            if(hexRegex.exec(style)) {
                color_of_stroke = style;
                setSliderStyle();
            }
            else {
                alert("Wrong hex code format!!");
            }
        }
    });
    document.getElementById('link-download').addEventListener('click', function() {
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL()
        link.click();
        link.delete;
    });
});

function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0px";
}
