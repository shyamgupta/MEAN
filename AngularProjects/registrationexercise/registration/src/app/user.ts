export class User {
    constructor(
        public first_name:string='',
        public last_name:string = '',
        public email:string = '',
        public password:string = '',
        public cpassword:string = '',
        public street:string = '',
        public unit:string = '',
        public city:string = '',
        public state:string = '',
        public lucky: string = ''
    ){}
}
