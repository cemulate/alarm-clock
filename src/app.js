import './styles/theme.scss';

import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

// Register the custom elements and Vue takes it from there

import AlarmElement from 'components/AlarmElement.vue';
Vue.customElement('alarm-element', AlarmElement);

import AlarmManager from 'components/AlarmManager.vue';
Vue.customElement('alarm-manager', AlarmManager);
