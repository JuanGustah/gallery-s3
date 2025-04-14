export default class Exception extends Error{
    constructor(public status:number, public errorMessage: string){
        super(errorMessage);
    }
}