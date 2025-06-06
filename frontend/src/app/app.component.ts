import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Chat App';
  public room = '';
  public message = '';
  public messages: { sender: string, message: string } [] = [];

  constructor(private socketService: SocketService) {
    this.socketService.onMessage((data) => {
      this.messages.push(data);
    });

    this.socketService.onUserJoined((msg) => {
      this.messages.push({ sender: 'BOT', message: msg});
    });
  }

  joinRoom() {
    if(this.room) {
      this.socketService.joinRoom(this.room);
    }
  }

  sendMessage() {
    if(this.message && this.room) {
      this.socketService.sendMessage(this.room, this.message);
      this.messages.push({ sender: 'You', message: this.message});
      this.message = '';
    }
  }


}
