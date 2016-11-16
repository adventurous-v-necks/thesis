export var hannWindow = function (length) {
  let window = new Float32Array(length);
    for (var i = 0; i < length; i++) {
      window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)));
    }
  return window;
};

export var linearInterpolation = function (a, b, t) {
  return a + (b - a) * t;
};

export var pitchShifter = function (pr, event) {

    let grainSize = 256;
    let overlapRatio = 0.5;
    let pitchRatio = pr;
    var inputData = event.inputBuffer.getChannelData(0);
    var outputData = event.outputBuffer.getChannelData(0);

    for (i = 0; i < inputData.length; i++) {

        // Apply the window to the input buffer
        inputData[i] *= this.grainWindow[i];

        // Shift half of the buffer
        this.buffer[i] = this.buffer[i + grainSize];

        // Empty the buffer tail
        this.buffer[i + grainSize] = 0.0;
    }

    // Calculate the pitch shifted grain re-sampling and looping the input
    var grainData = new Float32Array(grainSize * 2);
    for (var i = 0, j = 0.0;
         i < grainSize;
         i++, j += pitchRatio) {

        var index = Math.floor(j) % grainSize;
        var a = inputData[index];
        var b = inputData[(index + 1) % grainSize];
        grainData[i] += linearInterpolation(a, b, j % 1.0) * this.grainWindow[i];
    }

    // Copy the grain multiple times overlapping it
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
