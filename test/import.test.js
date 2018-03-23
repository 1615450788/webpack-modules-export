var assert = require('assert');
var Import = require('../lib/import');
describe('Import', function() {
    describe('.match',function () {
        it('import package', function() {
            let input=`
            import mangerHome1 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import mangerHome1 from ',
            ];
            assert.deepEqual(Import.match(input),result);
        });
        it('import * as package',function () {
            let input=`
            import * as mangerHome2 from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import * as mangerHome2 from ',
            ];
            assert.deepEqual(Import.match(input),result);
        });
        it('import {package}',function () {
            let input=`
                import {mangerHome3} from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=[
                'import {mangerHome3} from ',
            ];
            assert.deepEqual(Import.match(input),result);
        });
        it('import {package , package }',function () {
            let input=`
                import { mangerHome4,mangerHome5 } from '../custom/amp/monitorAlarm/alarmEventStage/alarmEventStageListSettings.js'
            `;
            let result=[
                'import { mangerHome4,mangerHome5 } from ',
            ];
            assert.deepEqual(Import.match(input),result);
        });
        it('import "package"',function () {
            let input=`
                import '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
            `;
            let result=null;
            assert.deepEqual(Import.match(input),result);
        });
        it('[]',function () {
            let input=[];
            let result=undefined;
            assert.deepEqual(Import.match(input),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(Import.match(input),result);
        });
        it('{}',function () {
            let input={};
            let result=undefined;
            assert.deepEqual(Import.match(input),result);
        });
    });
    describe('.variableReg',function () {
        it('["import package from "]', function() {
            let input=[
                'import mangerHome1 from ',
            ];
            let result=/mangerHome1/g;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('["import * as package from "]',function () {
            let input=[
                'import * as mangerHome2 from ',
            ];
            let result=/mangerHome2/g;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('["import {package} from "]',function () {
            let input=[
                'import {mangerHome3} from ',
            ];
            let result=/mangerHome3/g;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('["import { package,package } from "]',function () {
            let input=[
                'import { mangerHome4,mangerHome5 } from ',
            ];
            let result=/mangerHome4|mangerHome5/g;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('[]',function () {
            let input=[];
            let result=undefined;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(Import.variableReg(input),result);
        });
        it('{}',function () {
            let input={};
            let result=undefined;
            assert.deepEqual(Import.variableReg(input),result);
        });
    });
    describe('.replace',function () {
        it('export default', function() {
            let input=`export default[{a:123,b:12312}]export default{a:123,b:12312}`;
            let result='[{a:123,b:12312}]{a:123,b:12312}';
            assert.deepEqual(Import.replace(input),result);
        });
        it('import',function () {
            let input=`
                import mangerHome from '../custom/amp/monitorAlarm/homeIndex/mangerHome.vue'
                import { pendingListSettings } from '../custom/amp/monitorAlarm/alarmEventStage/alarmEventStageListSettings.js'
            `;
            let result='';
            assert.deepEqual(Import.replace(input).replace(/\s|\n/g,''),result);
        });
        it('undefined',function () {
            let input=undefined;
            let result=undefined;
            assert.deepEqual(Import.replace(input),result);
        });
    });
});