let events = 0;
let playTime = 0;

// set up our samples grid - 5x5 boxes
let COLUMNS = 5;
let SAMPLES_PER_COLUMN = 5;

const sched = function() {
  var nextEvent = this.performance[events];
  if (!nextEvent) return;
  window.requestAnimationFrame(sched.bind(this));
  var when = Math.abs(nextEvent.timestamp - this.timeZero);
  var delta = playTime + when;
  if (this.audioContext.currentTime - delta >= 0) {
    // trigger the event
    reduce(this,nextEvent.action);
    events++;
  }
};

export default function reduce(state, action) {
  if (state === undefined) {
    let samples = [];
    for (var col = 0; col < COLUMNS; col++) {
      var column = [];
      for (var sample = 0; sample < SAMPLES_PER_COLUMN; sample++) {
        column.push({sampleUrl: col < 3 ? '/samples/100bpm_Hamir_Kick.wav' : '/samples/100bpm_Hamir_Clap.wav',
                    index: sample,
                    column: col,
                    sampleName: 'Drum Loop '+col+sample,
                    playing: false,
                    loaded: false,
                    buffer: null
                  });
      }
      samples.push(column);
    }
    return {
      performance: [],
      user: 'none',
      BPM: 120,
      minTempo: 60,
      maxTempo: 180,
      numColumns: COLUMNS,
      samples: samples
    };
  }

  switch (action.type) {
    case 'ADD_CLICK': {
      // clone the object! the state arg must not be mutated or your app will break
      return Object.assign({}, state, {clicks: state.clicks + 1});
    }
    case 'STORE_USER': {
      return Object.assign({}, state, {user: action.who});
    }
    case 'AUDIO_RECORD': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime, performance: []}); //INCOMPLETE, override push to push and fire to socket.io
    }
    case 'AUDIO_STOP': {
      console.log('stop music');
      return Object.assign({}, state); //INCOMPLETE
    }
    case 'TIME_ZERO': {
      return Object.assign({}, state, {timeZero: state.audioContext.currentTime, performance: []});
    }
    case 'KEY_UP': {
      console.log('key up', action);
      return Object.assign({}, state,
        // {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})}
      );
    }
    case 'KEY_DOWN': {
      console.log('key down', action);
      return Object.assign({}, state,
        // {performance: state.performance.push({action, timestamp: Date.now() - state.timeZero})}
      );
    }
    case 'CREATE_AUDIO_CONTEXT': {
      return Object.assign({}, state, {audioContext: new AudioContext()});
    }
    case 'FADER_CHANGE': {
      // TODO: do something with the data e.g. adjust volume
      console.log('a fader called '+action.id+' changed to '+ action.value);
      // replay the UI action (it wasn't necessarily caused by a UI change - could be synthetic)
      document.getElementById(action.id).value = action.value;
      let temp = Object.assign([], state.performance);
      temp.push({action: action, timestamp: state.audioContext.currentTime});
      let bpm = Object.assign({}, state.BPM);
      if (action.id === 'tempoFader') {
        bpm = Math.round((action.value * (state.maxTempo - state.minTempo) / 100) + state.minTempo);
        // i can't figure out why, but the state change is not being propagated down to the Tempo
        // text component as it changes. So instead, update the component here by brute force.
          document.getElementById('tempoDisplay').textContent = bpm + ' BPM';
      }
      return Object.assign({}, state, {BPM: bpm, performance: temp});
    }
    case 'PLAY': {
      events = 0;
      playTime = state.audioContext.currentTime;
      window.requestAnimationFrame(sched.bind(state));
      return Object.assign({}, state);
    }
    case 'KNOB_TWIDDLE': {
      console.log('a knob has been twiddled ',action);
      return Object.assign({}, state, {volume: action.volume});
    }
    case 'PLAY_SAMPLE': {
      let allSamples = state.samples.slice(); //clone to avoid mutation
      let theSample = allSamples[action.sample.column][action.sample.index]; //find relevant sample
      theSample.playing = !theSample.playing;
      if (theSample.playing) {
        theSample.source = state.audioContext.createBufferSource();
        //var g = audioContext.createGain();
        theSample.source.loop = true;
        theSample.source.buffer = action.buffer;
        theSample.source.connect(state.audioContext.destination);
        theSample.source.start();
      } else {
        console.log('stopping');
        theSample.source.stop();
        theSample.source = null;
      }
      return Object.assign({}, state, {samples: allSamples});
    }
    default: {
      console.error('Reducer Error: ', action);
      return Object.assign({}, state);
    }
  }
};
