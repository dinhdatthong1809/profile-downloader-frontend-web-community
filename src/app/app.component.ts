import {Component, OnInit} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public token: string | null | undefined;

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {

  }

  subcribe(): void {
    this.angularFireMessaging.requestToken.subscribe({
      next: (token) => {
        this.token = token;
        const subscribeToTopicRequest = {
          topicId: 'test',
          registrationTokens: [token]
        };

        this.httpClient
          .post('http://localhost:8080/notifications/topics/subscribe', subscribeToTopicRequest)
          .subscribe({error: console.error});
      },
      error: console.error
    });
  }
}
