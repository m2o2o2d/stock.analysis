import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'exchange-record',
            component: require('@/pages/ExchangeRecord').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
