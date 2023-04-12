<template>
  <h1>2152 SMASH Strategy</h1>
  <img :src="absoluteLogoPath" alt="Cannot load logo file" class="center" width="300" height="75">
  
  <br>
  <textarea name="notes" rows="4" cols="50" />
  <br>
  <br>
  <canvas id="canvas" width="800" height="500"></canvas>
  <input type="button" value="draw" onclick="use_tool('draw');" />
  <input type="button" value="erase" onclick="use_tool('erase');" />
  <div id="output"></div>
  <br>
  <br>
  <footer>
    <h5>Version 1.0.0</h5>
  </footer>
</template>

<script setup lang="ts">
//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Variables
var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';

//Mousedown
$(canvas).on('mousedown', function(e) {
    last_mousex = mousex = parseInt(e.clientX-canvasx);
	last_mousey = mousey = parseInt(e.clientY-canvasy);
    mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    mousedown = false;
});

//Mousemove
$(canvas).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 10;
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});

//Use draw|erase
use_tool = function(tool) {
    tooltype = tool; //update
}

// Fetch logo path
const absoluteLogoPath = $computed(() => `${import.meta.env.BASE_URL}assets/home_icon.png`);

// Fetch configurations list
const fetchResult = await fetch(`${import.meta.env.BASE_URL}assets/configurations.txt`);

if (!fetchResult.ok)
  throw new Error(`Configuration list fetch failed: HTTP ${fetchResult.status} (${fetchResult.statusText})`);

// Get text data, then convert to array
const textData = await fetchResult.text();
const list = $ref(textData.split("\n").map(value => value.trim()).filter(value => value.length > 0));
</script>

<style>
.custom-href {
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; }
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
}
.link-list {
  margin: 0;

  li {
    margin: 6px 0;
  }
}
hr-foot {
    border: 0;
    height: 1px;
}

canvas {
    cursor: crosshair;
    border: 1px solid #000000;
}
</style>
