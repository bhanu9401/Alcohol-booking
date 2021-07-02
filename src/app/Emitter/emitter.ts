import { EventEmitter } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
export class Emitter{
    static emitter=new EventEmitter<boolean>();
    static admin = new EventEmitter<boolean>();
}