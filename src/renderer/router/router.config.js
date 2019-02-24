// const LandingPage = () => import('@components/LandingPage');
const config = {
    groups: [{
        groupId: 1,
        groupName: '数据日志'
    }, {
        groupId: 2,
        groupName: '数据分析'
    }],
    routes: [{
        path: 'exchange-record',
        name: 'exchange-record',
        component: require('@/components/LandingPage').default
    }]
};
export default config.routes;
