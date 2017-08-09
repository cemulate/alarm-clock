import Tone from 'tone';

// Beep on command
class Beeper {
    constructor(freq=440, length=0.5) {
        this.freq = freq;
        this.length = length;

        this._synth = new Tone.Synth().toMaster();
    }

    beep() {
        this._synth.triggerAttackRelease(this.freq, this.length);
    }
}

// A start/stoppable constant horrible noise
class CycleBeeper {
    constructor(baseFreq=440, cycleFreq=3) {
        this.baseFreq = baseFreq;
        this.cycleFreq = cycleFreq;

        this._main = new Tone.Oscillator(this.baseFreq).toMaster();

        this._lfo = new Tone.LFO(this.cycleFreq, 0, 1000);
        this._lfo.type = 'square';

        this._lfo.connect(this._main.detune);

        this._sources = [this._lfo, this._main];
    }

    start() {
        this._sources.map(x => x.start());
    }

    stop() {
        this._sources.map(x => x.stop());
    }
}

export {Beeper as default, CycleBeeper};
