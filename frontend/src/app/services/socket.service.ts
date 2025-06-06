import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket = io('http://localhost:3000');
  constructor() { }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(room: string, message: string) {
    this.socket.emit('chatMessage', { room, message });
  }

  onMessage(callback: (data: any) => void) {
    this.socket.on('chatMessage', callback);
  }

  onUserJoined(callback: (msg: string) => void) {
    this.socket.on('userJoined', callback);
  }
}
