import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundMediaError extends HttpException {
    private _id : number
    constructor(id : number) {
        super(`Media not found on id: ${id}`, HttpStatus.NOT_FOUND);
        this._id = id
    }
    get id(){
        return this._id
    }
}