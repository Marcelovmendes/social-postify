import { NotFoundException } from "@nestjs/common";

export class NotFoundPostError extends NotFoundException {

    private _id : number
    constructor(id : number) {
        super(`Post not found on id: ${id}`);
        this._id = id
    }

    get id(){
        return this._id
    }
}