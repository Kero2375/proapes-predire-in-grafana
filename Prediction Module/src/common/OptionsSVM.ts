import Option from './Options';

export default class OptionSVM implements Option {
    private C = 1;
    private maxiter = 10000;
    private numpass = 10;
    private firstQuery = 0;

    fromJSON(json: { C: number; maxiter: number; numpass: number; firstQuery: number }) {
        this.C = json.C;
        this.maxiter = json.maxiter;
        this.numpass = json.numpass;
        this.firstQuery = json.firstQuery || 0;
        return this;
    }

    setValueFile(config: string): void {
        try {
            let predictor = JSON.parse(config);
            this.C = predictor.opt.C;
            this.maxiter = predictor.opt.maxiter;
            this.numpass = predictor.opt.numpass;
        } catch (e) {
            throw new Error('Predictor bad formatted');
        }
    }

    getC(): number {
        return this.C;
    }

    getMaxIter(): number {
        return this.maxiter;
    }

    getNumPass(): number {
        return this.numpass;
    }

    getFirstQuery(): number {
        return this.firstQuery;
    }

    setC(c: number): void {
        this.C = c;
    }

    setMaxIter(m: number): void {
        this.maxiter = m;
    }

    setNumPass(n: number): void {
        this.numpass = n;
    }

    setFirstQuery(firstQuery: number): void {
        this.firstQuery = firstQuery;
    }
}
