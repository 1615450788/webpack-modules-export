var assert = require('assert');
var methods = require('../lib/methods');
describe('methods', function() {
    describe('.match',function () {
        it('import package', function() {
            let input=`
            import mangerHome1 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'mangerHome1',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import * as package',function () {
            let input=`
            import * as mangerHome2 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'mangerHome2',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import {package}',function () {
            let input=`
                import {mangerHome3} from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'mangerHome3',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import {package , package }',function () {
            let input=`
                import { mangerHome4,mangerHome5 } from '../custom/amp/monitorAlarm/alarmEventStage/alarmEventStageListSettings.js'
            `;
            let result=[
                'mangerHome4',
                'mangerHome5',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import "package"',function () {
            let input=`
                import '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[''];
            assert.deepEqual(methods.match(input),result);
        });
        it('[]',function () {
            let input=[];
            let result=[];
            assert.deepEqual(methods.match(input),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=[];
            assert.deepEqual(methods.match(input),result);
        });
        it('{}',function () {
            let input={};
            let result=[];
            assert.deepEqual(methods.match(input),result);
        });
    });
    describe('.replace',function () {
        it('export default', function() {
            let input=`export default[{a:123,b:12312}]export default{a:123,b:12312}`;
            let result='[{a:123,b:12312}]{a:123,b:12312}';
            assert.deepEqual(methods.replace(input),result);
        });
        it('import',function () {
            let input=`
                import mangerHome from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
                import { pendingListSettings } from '../custom/amp/monitorAlarm/alarmEventStage/alarmEventStageListSettings.js'
            `;
            let result='';
            assert.deepEqual(methods.replace(input).replace(/\s|\n/g,''),result);
        });
        it('importName',function () {
            let input=`/resource/certificate/importCertificate`;
            let result='/resource/certificate/importCertificate';
            assert.deepEqual(methods.replace(input),result);
        });
        it('require("name")',function () {
            let input=`{
                name:require("name")
            }`;
            let result='{name:""}';
            assert.deepEqual(methods.replace(input).replace(/\s|\n/g,''),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(methods.replace(input),result);
        });
    });
});