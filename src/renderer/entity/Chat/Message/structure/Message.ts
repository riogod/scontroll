import { singleton } from 'tsyringe';
import { makeAutoObservable } from 'mobx';
import { IMessage } from './interface';

@singleton()
export class Message implements IMessage {
  message = '';

  author = '';

  constructor() {
    makeAutoObservable(this);
  }

  init(): void {
    this.message = 'Blalblabla!';
  }
}
