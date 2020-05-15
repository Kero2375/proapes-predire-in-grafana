import 'jest';
import Predictor from '../common/Predictor';
import Model from '../Training/Model';
import StrategyRL from '../Training/strategies/Regression/RL/StrategyRL';
import StrategySVM from '../Training/strategies/SVM/StrategySVM';
import ViewModel from '../Training/ViewModel';
import OptionRegression from '../common/OptionsRegression';
import OptionSVM from '../common/OptionsSVM';
import DataSVM from '../Training/strategies/SVM/DataSVM';
import StrategyRegLog from '../Training/strategies/Regression/RLOG/StrategyRegLog';
import StrategyRegExp from '../Training/strategies/Regression/REXP/StrategyRegExp';
import DataRegression from '../Training/strategies/Regression/DataRegression';

let model: Model;
let vm: ViewModel;
beforeAll(() => {
    model = new Model();
    vm = new ViewModel({});
    window.alert = jest.fn(() => {});
    jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
});

//TEST PREDICTOR

test('setPredictor', () => {
    let pred = new Predictor('RL', [1, 2], 'y = 2x +4', new OptionRegression(), 0.3);
    pred.setOpt(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"order":2,"precision":2}
    }`);
    expect(pred.getAlgorithm()).toBe('RL');
    expect(pred.getCoefficients()).toEqual([1, 2]);
    expect(pred.getPredFun()).toBe('y = 2x +4');
    expect(pred.getOpt()).toEqual(new OptionRegression());
});

test('parseStringtoJSONPredictor', () => {
    let pred = new Predictor('RL', [1, 2], 'y=2x+1', new OptionRegression(), 0.3);
    expect(pred.toJSON()).toEqual(
        JSON.stringify(
            {
                GroupName: 'ProApes',
                Version: '3.0.0-1.9',
                PluginName: 'PredireInGrafana',
                algorithm: 'RL',
                coefficients: [1, 2],
                predFun: 'y=2x+1',
                opt: new OptionRegression(),
                accuracy: 0.3,
            },
            null,
            2
        )
    );
});

//TEST MODEL

test('setPredictorAlgorithm', () => {
    model.setAlgorithm('RL');
    expect(model.getPredictor()?.getAlgorithm()).toBe('RL');
});

test('setPredictorOptions', () => {
    model.setPredictorOptions(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"order":2,"precision":2,"toPredict":0}
    }`);
    let p = model.getPredictor();
    if (p) {
        expect(p.getOpt()).toEqual(new OptionRegression());
    }
    let mod = new Model();
    mod.setPredictorOptions('{}');
});

test('setData', () => {
    let mod = new Model();
    mod.setData([[1, 2]]);
    model.setData([
        [1, 1],
        [2, 2],
    ]);
    let dat = new DataRegression();
    dat.setValue([
        [1, 1],
        [2, 2],
    ]);
    expect(model.getData()).toEqual(dat);
});

test('trainOnModel', () => {
    let mod = new Model();
    mod.train();
    model.train();
    expect(model.getPredictor()).toEqual(new Predictor('RL', [1, 0], 'y = 1x', new OptionRegression(), 1));
});

test('downloadPredictor', () => {
    model.downloadPredictor();
    let mod = new Model();
    mod.downloadPredictor();
});

// TEST DATARegression
test('getDataRL', () => {
    let dat = new DataRegression();
    dat.setValue([
        [1, 1],
        [2, 2],
    ]);
    expect(dat.getPoints()).toEqual([
        [1, 1],
        [2, 2],
    ]);
});

// TEST OPTIONRL

test('setAndgetPrecRL', () => {
    let op = new OptionRegression();
    op.setPrecision(3);
    expect(op.getPrecision()).toBe(3);
    expect(op.getOrder()).toBe(2);
});

test('importJSONErrorRL', () => {
    let op = new OptionRegression();
    expect(() => {
        op.setValueFile('{"opt}');
    }).toThrowError(new Error('Predictor bad formatted'));
});

// TEST OPTIONSVM

test('setAndgetPrecSVM', () => {
    let op = new OptionSVM();
    op.setC(2);
    op.setMaxIter(10100);
    op.setNumPass(14);
    expect(op.getC()).toBe(2);
    expect(op.getMaxIter()).toBe(10100);
    expect(op.getNumPass()).toBe(14);
});

test('importJSONSVM', () => {
    let op = new OptionSVM();
    expect(() => {
        op.setValueFile('{"opt}');
    }).toThrowError(new Error('Predictor bad formatted'));
    op.setValueFile(`{
        "algorithm": "RL",
        "coefficients": [1.3691,1.3827],
        "predFun": "y = 1.3691x + 1.3827",
        "opt": {"C":2,"maxiter":10100,"numpass":12}
    }`);
    expect(op.getC()).toBe(2);
    expect(op.getMaxIter()).toBe(10100);
    expect(op.getNumPass()).toBe(12);
});

test('fromJSON', () => {
    let op = new OptionSVM();
    op.fromJSON({ C: 2, maxiter: 10010, numpass: 11, firstQuery: 0 });
    expect(op.getC()).toBe(2);
    expect(op.getMaxIter()).toBe(10010);
    expect(op.getNumPass()).toBe(11);
    expect(op.getFirstQuery()).toBe(0);
});

//TEST STRATEGYRL

test('trainOnStrategyRL', () => {
    let rl = new StrategyRL();
    let dat = new DataRegression();
    dat.setValue([
        [1, 1],
        [2, 2],
    ]);
    expect(rl.train(dat, new OptionRegression())).toEqual(
        new Predictor('RL', [1, 0], 'y = 1x', new OptionRegression(), 1)
    );
});

//TEST STRATEGYRLOG

test('trainOnStrategyRLOG', () => {
    let rl = new StrategyRegLog();
    let dat = new DataRegression();
    dat.setValue([
        [1, 0],
        [2, Math.log(2)],
    ]);
    expect(rl.train(dat, new OptionRegression())).toEqual(
        new Predictor('RLOG', [0, 1], 'y = 0 + 1 ln(x)', new OptionRegression(), 1)
    );
});

//TEST STRATEGYREXP

test('trainOnStrategyREXP', () => {
    let rl = new StrategyRegExp();
    let dat = new DataRegression();
    dat.setValue([
        [0, 1],
        [1, Math.E],
    ]);
    expect(rl.train(dat, new OptionRegression())).toEqual(
        new Predictor('REXP', [1, 1], 'y = 1e^(1x)', new OptionRegression(), 1)
    );
});

//TEST STRATEGYSVM

test('trainOnStrategySVM', () => {
    let svm = new StrategySVM();
    let dat0 = new DataSVM();
    let dat1 = new DataSVM();
    let dat2 = new DataSVM();
    dat0.setValue([
        [0, 1, 1],
        [1, 0, -1],
    ]);
    expect(svm.train(dat0, new OptionSVM())).toEqual(
        new Predictor('SVM', [0, -1, 1], 'y = 1x + 0', new OptionSVM(), 1)
    );
    dat1.setValue([
        [0, 1, -1],
        [1, 2, 1],
        [2, 1, -1],
        [-1, 0, 1],
        [0, -1, -1],
        [1, 0, 1],
    ]);
    let option = new OptionSVM();
    option.setNumPass(15);
    // expect(svm.train(dat1, option)).toEqual(new Predictor('SVM', [0, -1, 1], 'y = 1x + 0', option, 2 / 3));
    dat2.setValue([
        [0, 1, -1],
        [1, 2, -1],
        [2, 1, -1],
        [-1, 0, -1],
        [0, -1, -1],
        [1, 0, -1],
        [0, 0, -1],
        [1, 1, -1],
        [2, 2, -1],
        [10, -10, -1],
    ]);
    expect(svm.train(dat2, new OptionSVM())).toEqual(
        new Predictor('SVM', [0, 0, 0], 'y = NaNx + NaN', new OptionSVM(), 0)
    );
});

//TEST VIEWMODEL

test('validateFile', () => {
    ViewModel.validateFile('1,2\n3,4');
    expect(() => {
        ViewModel.validateFile('dass');
    }).toThrowError(new Error('Data has wrong formattation!'));
});

test('parseCSVtoData', () => {
    expect(ViewModel.parseCSVtoData('1,2\n3,4')).toEqual([
        [1, 2],
        [3, 4],
    ]);
});

test('loadDataOnViewMOdel', () => {
    const blob: any = new Blob(['1,2\n3,4'], { type: 'text/html' });
    blob.lastModifiedDate = new Date();
    blob.name = 'filename';
    const file = blob as File;
    const blob1: any = new Blob(['asas'], { type: 'text/html' });
    blob1.lastModifiedDate = new Date();
    blob1.name = 'filename';
    const file1 = blob1 as File;
    vm.loadData(file);
    vm.loadData(null);
    vm.loadData(file1);
});

test('setAlgorithm', () => {
    vm.setAlgorithm('RL');
});

test('selecttAlgorithm', () => {
    vm.selectAlgorithm();
});

test('loadOptOnViewMOdel', () => {
    const blob: any = new Blob(['{ "opt": 2 }'], { type: 'text/html' });
    const blob2: any = new Blob(['{ "opt": 2 }'], { type: 'text/html' });
    blob.lastModifiedDate = new Date();
    blob.name = 'training.json';
    blob2.lastModifiedDate = new Date();
    blob2.name = 'training.txt';
    const file = blob as File;
    const file2 = blob2 as File;
    vm.loadOpt(null);
    vm.loadOpt(file2);
    vm.loadOpt(file);
});

test('Render', () => {
    vm.render();
});

test('trainOnViewModel', () => {
    const blob: any = new Blob(['1,2\n3,4'], { type: 'text/html' });
    blob.lastModifiedDate = new Date();
    blob.name = 'filename';
    const file = blob as File;
    const blob1: any = new Blob(['0.2,-5\n0.3,-4\n0.4,-3\n0.6,-2\n1,0\n2,0.6\n3,1.2\n4,1.8\n6,2.6'], {
        type: 'text/html',
    });
    blob1.lastModifiedDate = new Date();
    blob1.name = 'filename';
    const file1 = blob as File;
    vm.setAlgorithm('RL');
    vm.selectAlgorithm();
    vm.loadData(file1);
    vm.train();
    vm.loadData(file);
    vm.train();
});
