export var hannWindow = function (length) {
  let window = new Float32Array(length);
    for (var i = 0; i < length; i++) {
      window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
    }
  return window;
};

export var interpolator = function (a, b, t) {
  // return a + (b - a) * t; // Linear interpolation - clickier but quicker
  var t2 = (1-Math.cos(t*Math.PI))/2;
  return (a*(1-t2)+b*t2);
};

export var pitchShifter = function (pr, event) {

    let grainSize = 256;
    let overlapRatio = 0.5;
    let pitchRatio = Number(pr);
    var inputData = event.inputBuffer.getChannelData(0);
    var outputData = event.outputBuffer.getChannelData(0);

    if (pitchRatio === 1) {
      for (i = 0; i < inputData.length; i++) {
        outputData[i] = inputData[i];//this.buffer[i];
      }
      return;
    }

    for (i = 0; i < inputData.length; i++) {
        inputData[i] *= this.grainWindow[i];
        this.buffer[i] = this.buffer[i + grainSize];
        this.buffer[i + grainSize] = 0;
    }

    var grainData = new Float32Array(grainSize * 2);
    for (var i = 0, j = 0; i < grainSize; i++, j += pitchRatio) {
        var index = Math.floor(j) % grainSize;
        var a = inputData[index];
        var b = inputData[(index + 1) % grainSize];
        grainData[i] += interpolator(a, b, j % 1.0) * this.grainWindow[i];
    }

    for (i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
        for (j = 0; j <= grainSize; j++) {
            this.buffer[i + j] += grainData[j];
        }
    }

    // Output the first half of the buffer
    for (i = 0; i < grainSize; i++) {
        outputData[i] = this.buffer[i];
    }
};
