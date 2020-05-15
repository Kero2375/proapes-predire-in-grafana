import { StrategyRL } from '../panels/PredictionPanel/strategies/Regression/RL/StrategyRL';
import { Strategy } from '../panels/PredictionPanel/strategies/Strategy';
import { StrategySVM } from '../panels/PredictionPanel/strategies/SVM/StrategySVM';
import { Data } from '../panels/PredictionPanel/utils/Data';
import Predictor from '../common/Predictor';
import { StrategyRegLog } from '../panels/PredictionPanel/strategies/Regression/RLOG/StrategyRegLog';
import { StrategyRegExp } from '../panels/PredictionPanel/strategies/Regression/REXP/StrategyRegExp';
import OptionRegression from '../common/OptionsRegression';
import OptionSVM from '../common/OptionsSVM';

let rl: Strategy;
let rlog: Strategy;
let re: Strategy;
let svm: Strategy;

beforeEach(() => {
    rl = new StrategyRL();
    rlog = new StrategyRegLog();
    re = new StrategyRegExp();
    svm = new StrategySVM();
});

test('strategyRlEmptyOpts', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = rl.predict(data, new Predictor('RL', [1, 1], '', new OptionRegression()));
    expect(res.getAt(0)).toEqual({ value: 2, time: 1 });
});

test('strategyRlNullOpts', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = rl.predict(data, new Predictor('RL', [1, 1], '', new OptionRegression()));
    expect(res.getAt(0)).toEqual({ value: 2, time: 1 });
});

test('strategyRlRandomOpts', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = rl.predict(
        data,
        new Predictor('RL', [1, 1], '', new OptionRegression().fromJSON({ order: 1, precision: 23, toPredict: 0 }))
    );
    expect(res.getAt(0)).toEqual({ value: 2, time: 1 });
});

test('strategyRegExpPredict', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = re.predict(
        data,
        new Predictor('REXP', [1, 1], '', new OptionRegression().fromJSON({ order: 1, precision: 23, toPredict: 0 }))
    );
    expect(res.getAt(0)).toEqual({ value: Math.E, time: 1 });
});

test('strategyRegLogPredict', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = rlog.predict(
        data,
        new Predictor('RLOG', [1, 1], '', new OptionRegression().fromJSON({ order: 1, precision: 23, toPredict: 0 }))
    );
    expect(res.getAt(0)).toEqual({ value: 1, time: 1 });
});

test('strategySvm', () => {
    let data = new Data();
    data.addValues({ a: 1, b: 1, time: 1 });
    const res = svm.predict(data, new Predictor('SVM', [1, 1, 1], '', new OptionSVM()));
    expect(res.getAt(0)).toEqual({ value: 1, time: 1 });
});
