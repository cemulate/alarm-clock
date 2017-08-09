<template lang="html">
    <div id="root">

    <!-- Alarm input box -->
    <div class="callout hollow">
        <p>Enter any number of times or durations from now, separated by commas</p>
        <form v-on:submit.prevent="newAlarm($event)">
            <div class="grid-x">
                <div class="cell small-12">
                    <input id="alarm-input" type="text" placeholder="8, 2:30, 17 minutes, 3 hours">
                </div>
            </div>
        </form>
    </div>

    <!-- List of alarms -->
    <alarm-element v-for="(timestamp, index) in alarmTimestamps" v-bind:key="timestamp" v-bind:timestamp="timestamp" v-on:dismiss-alarm="dismissAlarmAtIndex(index)"></alarm-element>

    </div>
</template>

<script>
import moment from 'moment/min/moment.min.js';

const units = ['years', 'quarters', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

export default {
    data() {
        return {
            alarmTimestamps: [],
        }
    },
    methods: {
        dismissAlarmAtIndex(i) {
            this.alarmTimestamps.splice(i, 1);
        },
        newAlarm(event) {
            // Try to parse the input and add (possibly several alarms)

            let parts = document.getElementById('alarm-input').value.split(',').map(x => x.trim());
            let now = moment();

            for (let p of parts) {
                let chosenTime = null;

                if (units.some(u => p.includes(u))) {
                    let [numStr, units] = p.split(' ').map(x => x.trim());
                    let num = parseInt(numStr);
                    if (!isNaN(num)) {
                        let duration = moment.duration(num, units);
                        chosenTime = now.add(duration);
                    }
                } else {
                    let m = moment(p, 'HH:mm');
                    chosenTime = moment().startOf('day').add({hours: m.hours(), minutes: m.minutes()})
                }

                if (chosenTime == null || !chosenTime.isValid()) {
                    alert('Could not parse a time or duration from the input');
                    return;
                }

                let actualTime = moment(chosenTime);
                while (actualTime.isBefore(now)) actualTime = actualTime.add(12, 'hours');

                this.alarmTimestamps.push(actualTime.valueOf());
            }
        }
    },
}
</script>

<style lang="css" scoped>
#root {
    margin-top: 10px;
}
#alarm-input {
    margin-bottom: 0px;
}
</style>
