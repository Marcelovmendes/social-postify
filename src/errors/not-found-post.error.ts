import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundPostError extends HttpException {

    private _id : number
    constructor(id : number) {
        super(`Post not found on id: ${id}` , HttpStatus.NOT_FOUND);
        this._id = id
    }

    get id(){
        return this._id
    }
}