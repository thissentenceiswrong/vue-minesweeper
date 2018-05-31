import Vue from 'vue';
import App from './App';

Vue.config.devtools = true;

const app = new Vue({
    el: '#app',
    render: h => h(App),
});
