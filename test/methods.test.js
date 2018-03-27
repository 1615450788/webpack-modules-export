var assert = require('assert');
var methods = require('../lib/methods');
describe('methods', function() {
    describe('.match',function () {
        it('import package', function() {
            let input=`
            import mangerHome1 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import mangerHome1 from ',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import * as package',function () {
            let input=`
            import * as mangerHome2 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import * as mangerHome2 from ',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import {package}',function () {
            let input=`
                import {mangerHome3} from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import {mangerHome3} from ',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import {package , package }',function () {
            let input=`
                import { mangerHome4,mangerHome5 } from '../custom/amp/monitorAlarm/alarmEventStage/alarmEventStageListSettings.js'
            `;
            let result=[
                'import { mangerHome4,mangerHome5 } from ',
            ];
            assert.deepEqual(methods.match(input),result);
        });
        it('import "package"',function () {
            let input=`
                import '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=null;
            assert.deepEqual(methods.match(input),result);
        });
        it('[]',function () {
            let input=[];
            let result=undefined;
            assert.deepEqual(methods.match(input),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(methods.match(input),result);
        });
        it('{}',function () {
            let input={};
            let result=undefined;
            assert.deepEqual(methods.match(input),result);
        });
    });
    describe('.variableReg',function () {
        it('["import package from "]', function() {
            let input=[
                'import mangerHome1 from ',
            ];
            let result=/.+(mangerHome1)[^"': a-zA-Z0-9]+/g;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('["import * as package from "]',function () {
            let input=[
                'import * as mangerHome2 from ',
            ];
            let result=/.+(mangerHome2)[^"': a-zA-Z0-9]+/g;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('["import {package} from "]',function () {
            let input=[
                'import {mangerHome3} from ',
            ];
            let result=/.+(mangerHome3)[^"': a-zA-Z0-9]+/g;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('["import { package,package } from "]',function () {
            let input=[
                'import { mangerHome4,mangerHome5,mangerHome6 } from ',
            ];
            let result=/.+(mangerHome4|mangerHome5|mangerHome6)[^"': a-zA-Z0-9]+/g;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('[]',function () {
            let input=[];
            let result=undefined;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(methods.variableReg(input),result);
        });
        it('{}',function () {
            let input={};
            let result=undefined;
            assert.deepEqual(methods.variableReg(input),result);
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