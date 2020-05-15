import Option from './Options';

export default class OptionRegression implements Option {
    private order = 2;
    private precision = 2;
    private toPredict = 0;

    fromJSON(json: { order: number; precision: number; toPredict: number }) {
        this.order = json.order;
        this.precision = json.precision;
        this.toPredict = json.toPredict || 0;
        return this;
    }

    setValueFile(config: string): void {
        try {
            let predictor = JSON.parse(config);
            this.order = predictor.opt.order;
            this.precision = predictor.opt.precision;
        } catch (e) {
            throw new Error('Predictor bad formatted');
        }
    }

    getOrder() {
        return this.order;
    }

    getPrecision() {
        return this.precision;
    }

    getToPredict() {
        return this.toPredict;
    }

    setPrecision(p: number): void {
        this.precision = p;
    }

    setToPredict(toPredict: number): void {
        this.toPredict = toPredict;
    }
}
