export class User{
    constructor(
        public _id: string,
        public name: string,
        public lastname: string,
        public username: string,
        public password: string,
        public phone: string,
        public image: string,
        public role: string
    ){}
}