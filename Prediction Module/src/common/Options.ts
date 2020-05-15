export default interface Option {
    fromJSON(json: any): Option;
    setValueFile(conf: string): void;
}
