import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from "@microsoft/signalr";
import { Message } from 'src/app/models/message';
import { Guid } from 'guid-typescript';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private connection!: signalR.HubConnection
  public messages!: Message[];
  public activeUsers!: User[];
  public userInfo!: User;
  ngOnInit(): void {
    this.messages = [];
    this.activeUsers = [];
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') ?? "{}");
    this.initWebSocket();
    this.connection.start();
  }

  initWebSocket() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/chat`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return localStorage.getItem('token') ?? "";
        }
      })
      .build();

    this.connection
      .start()
      .then(res => console.log("Connection Started!", res))
      .catch(err => console.log("Error while establishing a connection :( ", err));


    this.connection.on('newMessage', (from: string, body) => {
      console.log('messageReceived', from, body);
      this.messages.push(body);
    });

    this.connection.on('userJoined', (user: User) => {
      // if (user === this.userName) {
      //   this.hideJoin = true;
      // }
      // this.messages.push({ from: '> ', body: user + ' joined' });
      console.log('userJoined', user);
      if (user.username != this.userInfo.username)
        this.activeUsers.push(user);

    });

    this.connection.on('userLeft', user => {
      this.activeUsers = this.activeUsers.filter(x => x.connectionId != user.connectionId);
      console.log('userLeft', user);
    });
  }

  sendMessage() {

    this.connection.invoke('SendMessage',
      { clientuniqueid: Guid.create().toString(), FromUserName: '', ToUserName: '', type: '', message: 'Message from unknown', date: new Date() }
    );
  }
}
