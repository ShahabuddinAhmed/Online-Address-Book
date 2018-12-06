import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBook } from '../models/addressbook';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private _userService: UserService, private router: Router) { }

  public allAddressBook: AddressBook[];
  public userID: string;

  ngOnInit() {
    this.getUserID();
    this.GetAddressBook(this.userID);
  }

  private getUserID() {
    this.userID = localStorage.getItem('userID');
    console.log(this.userID);
  }

  private GetAddressBook(id) {
    this._userService.getAddressBook(id).subscribe(data => {
      this.allAddressBook = data;
      console.log(this.allAddressBook);
    },
    err => {
      console.log(err);
    }
      );
  }

  deleteAddress(id: string) {
    this._userService.deleteAddress(id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/user']);
    });
  }

  updateAddress(id: string) {
    this.router.navigate([`/addressbook/${id}`]);
  }

}
