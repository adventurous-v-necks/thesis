//getting started on FX

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioCtx.createOscillator();
let gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = 'sawtooth';
oscillator.frequency.value = 3000; 
oscillator.start();

