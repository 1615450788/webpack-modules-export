var assert = require('assert');
var filterObject = require('../lib/filterObject');

describe('filterObject',function () {
    it('es6',function () {
        let input=`
            import a from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            import * as {b,c,d} from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            export default [
                {
                    name:'a',
                    vue:a,
                    data:["a",a]
                },
                {
                    name:'b',
                    vue:b,
                    data:c
                }
            ]
            `;
        let result=`[{"name":"a"},{"name":"b"}]`;
        assert.equal(JSON.stringify(filterObject(input)),result);
    })
    it('require',function () {
        let input=`
            let a = require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue');
            var b =require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue');
            const c=require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue');
            const ModuleRender=require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue');
            const moduleData=require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue');
            const {d,e,f}=r => require.ensure([], () => r(require('../pages/Breadcrumb.vue')), 'home');
            export default [
                {
                    name:'a',
                    vue:a,
                    data:["a",a]
                },
                {
                    name:require('../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'),
                    vue:b,
                    data:c
                },
                {
                    name:'c',
                    aa:c.a,
                    vue: ModuleRender,
                    data: moduleData.authorizationResourceList
                    c: moduleData.authorizationResourceList
                }
            ]
            `;
        let result=`[{"name":"a"},{"name":""},{"name":"c"}]`;
        assert.equal(JSON.stringify(filterObject(input)),result);
    })
})