import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loggedInUser!: IUser;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getLoggedInUser().subscribe({
        next: (userRes) => {
          if (userRes) {
            this.loggedInUser = userRes;
          }
        },
        error: (error) => {
          console.log('LoggedIn User APi Failed', error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
