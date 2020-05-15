import 'jest';
import { Model } from '../panels/PredictionPanel/Model';
import { Data } from '../panels/PredictionPanel/utils/Data';
import Predictor from '../common/Predictor';
import OptionRL from '../common/OptionsRegression';
import OptionSVM from '../common/OptionsSVM';

let model: Model;
let data: Data;

beforeEach(() => {
    model = new Model();
    data = new Data();
});

/* RL */
test('modelPredictionRlToBe0', () => {
    data.addValues({ a: 1, b: 1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('RL', [0, 0], '', new OptionRL()));
    expect(model.predict()).toBe(0);
});

test('modelPredictionRlToBe1', () => {
    data.addValues({ a: 1, b: 1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('RL', [1, 0], '', new OptionRL()));
    expect(model.predict()).toBe(1);
});

test('modelPredictionRlToBe2', () => {
    data.addValues({ a: 1, b: 1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('RL', [1, 1], '', new OptionRL()));
    expect(model.predict()).toBe(2);
});

/* SVM */
test('modelPredictionSvmToBe0', () => {
    data.addValues({ a: 1, b: 1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('SVM', [0, 0, 0], '', new OptionSVM()));
    expect(model.predict()).toBe(0);
});

test('modelPredictionSvmToBe1', () => {
    data.addValues({ a: 1, b: 1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('SVM', [1, 1, 0], '', new OptionSVM()));
    expect(model.predict()).toBe(1);
});

test('modelPredictionSvmToBe-1', () => {
    data.addValues({ a: -1, b: -1, time: 0 });
    model.setData(data);
    model.setPredictor(new Predictor('SVM', [1, 1, 0], '', new OptionSVM()));
    expect(model.predict()).toBe(-1);
});

/* Empty Array */
test('modelPredictionRlWithEmptyArray', () => {
    model.setData(data);
    model.setPredictor(new Predictor('RL', [1, 1], '', new OptionRL()));
    try {
        model.predict();
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
    }
});

test('modelPredictionSvmWithEmptyArray', () => {
    model.setData(data);
    model.setPredictor(new Predictor('SVM', [1, 1, 0], '', new OptionSVM()));
    try {
        model.predict();
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toEqual(Error('Data not predicted'));
    }
});

/* Exceptions */
test('modelPredictionWrongAlgorithm', () => {
    data.addValues({ a: 1, b: 2, time: 0 });
    model.setData(data);
    try {
        model.setPredictor(new Predictor('', [0, 0], '', new OptionRL()));
        model.predict();
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toEqual(Error('Wrong algorithm'));
    }
});

test('modelPredictionNoData', () => {
    try {
        model.setPredictor(new Predictor('RL', [0, 0], '', new OptionRL()));
        model.predict();
    } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toEqual(Error('Predictor not found'));
    }
});

test('modelPredictionNoData', () => {
    model.saveToInflux().catch(e => {
        expect(e).toBeInstanceOf(Error);
        expect(e).toEqual(Error('Predicted data not found'));
    });
});

test('predictorFromJSON', () => {
    let s = Predictor.fromJSON('{"algorithm": "RL", "coefficients": [1,1]}');
    expect(s.getAlgorithm()).toStrictEqual('RL');
    expect(s.getCoefficients()).toStrictEqual([1, 1]);
    expect(() => {
        Predictor.fromJSON(undefined);
    }).toThrowError(new Error('No file found'));
});
