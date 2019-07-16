import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/services/user';

@Component({
  selector: 'csscs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.userData;
  }

}
