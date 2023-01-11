var canvas = document.querySelector('#screen');

// Initialise webgl
var gl = canvas.getContext("webgl");

if (!gl) {
  console.error("No WebGL context");
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}


// Get text source
var vertexShaderSource = document.querySelector("#vertex-shader").text;
var fragmentShaderSource = document.querySelector("#fragment-shader").text;

// Create shaders
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

// Lookup location for position attribute
var positionAttributeLocation = gl.getAttribute(program, "aPosition");

// Buffer to retrieve attribute data
var positionBuffer = gl.createBuffer();

// Create bind point for buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

var positions = [
  0, 0,
  0, 0.5,
  0.7, 0
];

// Static draw implies that position data will not be changing much
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

