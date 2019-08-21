import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/services/user';
import {UserService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';
import {DataService} from '../../shared/services/data.service';
import {Snippet} from '../../shared/services/snippet';

@Component({
  selector: 'csscs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  user$: Observable<User>;

  likes$: Observable<Snippet[]>;

  constructor(public authService: AuthService,
              public dataService: DataService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.user = this.authService.userData;
    this.likes$ = this.dataService.getUserLikes();
  }

}
