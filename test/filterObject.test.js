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
})