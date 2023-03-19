import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'my-docker-angular-app';
  private connection!: signalR.HubConnection
  
  ngOnInit():void{ 
   // this.initWebSocket();
    //this.connection.start();
  } 

  initWebSocket() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44340/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiIxODgyZjVhMi05MTcwLTQ4MGUtOWQ5Yy1hNDU5ZmQ4YzBiZTUiLCJpYXQiOiIzLzQvMjAyMyA5OjA4OjU1IEFNIiwidW5pcXVlX25hbWUiOiJhYmNAYWJjLmNvbSIsIm5hbWUiOiJhYmNAYWJjLmNvbSIsImVtYWlsIjoiYWJjQGFiYy5jb20iLCJleHAiOjE2Nzc5MjE1MzYsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSldUU2VydmljZVBvc3RtYW5DbGllbnQifQ.TvWf8Xi222m6DpGvcWjStxj17UDyfLz8rCtbyj9UPJ0";
        }
    })
      .build();

    this.connection.on('newMessage', (from: string, body: string) => {
      console.log('messageReceived',from, body);
      //this.messages.push({ from, body });
    });

    this.connection.on('userJoined', user => {
      // if (user === this.userName) {
      //   this.hideJoin = true;
      // }
      // this.messages.push({ from: '> ', body: user + ' joined' });

      console.log('userJoined',user);
    });

    this.connection.on('userLeft', user => {
      console.log('userLeft',user);
    });
  }
}
