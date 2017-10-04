export default class Applicant {
    constructor(params) {
        let _details = {};
        Object.assign(_details, params);

        this.proxy = new Proxy(this, {
            get: (target, name) => {
                return _details[name];
            },
            set: (target, name, value) => {
                _details[name] = value;
                return true;
            }
        });

        /*for(let prop in _details) {
            if(!_details.hasOwnProperty(prop)) {
                continue;
            }

            this[`get${prop}`] = () => {
                return p[prop];
            };

            this[`set${prop}`] = newValue => {
                _details[prop] = newValue;
            };*/

            this.getFullDetails = () => {
                return _details;
            };
        //}
    }
}
