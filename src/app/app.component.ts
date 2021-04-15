import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface Token {
  token: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private tokensCollection: AngularFirestoreCollection<any>;

  constructor(
    private swUpdate:SwUpdate,
    private messaging: AngularFireMessaging,
    private database: AngularFirestore 
  ) {
    this.tokensCollection = this.database.collection<Token>('tokens');
  }

  ngOnInit(): void {
    this.updatePWA();
    this.resquestPermission();
    this.listenNotification();
  }

  updatePWA(){
    this.swUpdate.available.subscribe(value => {
      console.log('update', value);
      window.location.reload();
    })
  }

  resquestPermission() {
    this.messaging.requestToken
        .subscribe(token => {
          console.log(token);
          this.tokensCollection.add({token});
        })
  }

  listenNotification() {
    this.messaging.messages
        .subscribe(message => {
          console.log(message);
        })
  }


}