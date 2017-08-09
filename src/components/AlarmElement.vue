<template lang="html">
    <div id="root" class="callout" v-bind:class="triggered ? 'alert' : 'primary'">

    <button class="close-button" aria-label="Close alert" type="button" v-on:click="cancel()">
        <span id="close-icon" aria-hidden="true">×</span>
    </button>

    <div class="grid-x grid-padding-x">
        <div class="cell small-2">
            <h3><strong>{{ displayedTime }}</strong></h3>
        </div>
        <div class="cell auto">
            <h3 v-if="!triggered"><em>{{ displayedDuration }}</em></h3>
        </div>
    </div>

    </div>
</template>

<script>
import moment from 'moment/min/moment.min.js';
import Beeper, {CycleBeeper} from 'AlarmSound.js';

export default {
    props: {
        // The alarm time in ms
        timestamp: {
            type: Number,
            default: moment().add(5, 'seconds').valueOf(),
        },
    },
    data() {
        return {
            currentTime: moment().valueOf(),
            alarm: new Beeper(),
            harshAlarm: new CycleBeeper(),
            triggered: false,
        }
    },
    computed: {
        displayedTime() {
            return moment(this.timestamp).format('h:mm A');
        },
        displayedDuration() {
            let d = moment.duration(this.timestamp - this.currentTime);
            let simplePad = (input) => (input < 10 ? '0' : '') + input.toString();
            return [d.hours(), d.minutes(), d.seconds()].map(simplePad).join(' : ');
        },
    },
    methods: {
        periodicUpdate() {
            // Called every second

            this.currentTime = moment().valueOf();
            let diff = this.currentTime - this.timestamp;

            // Set off alarm if we've passed the time
            if (diff >= 0) this.triggered = true;

            if (diff >= 0 && diff < 300000) {
                // For the first 5 minutes, just beep every second
                this.alarm.beep();
            } else if (diff >= 300000) {
                // After 5 minutes, set off the harsh alarm (don't need to call this periodically anymore)
                this.harshAlarm.start();
                clearInterval(this.updateInterval);
            }
        },
        cancel() {
            clearInterval(this.updateInterval);
            this.harshAlarm.stop();

            // Tell listening parent to dismiss this alarm
            this.$emit('dismiss-alarm');
        }
    },

    created() {
        this.updateInterval = setInterval(this.periodicUpdate, 1000);
    },
}
</script>

<style lang="css" scoped>
#root {
    margin-top: 10px;
    margin-bottom: 10px;
}
#close-icon {
    font-size: 2em;
}
</style>
