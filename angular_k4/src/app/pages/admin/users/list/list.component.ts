import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../types/User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  userService = inject(UserService); // inject vao bien
  totalPage = 1;
  searchText = '';
  userList: User[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    // Lay searchText From Url
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['search'];
      return this.userService
        .getUserListAdmin(this.searchText)
        .subscribe((res) => {
          this.userList = res.data;
          this.totalPage = res.total;
        });
    });
  }

  handleDeleteUser(id: string) {
    console.log(id);
    if (window.confirm('Do you really remove user?')) {
      this.userService
        .deleteUser(id)
        .subscribe(
          () =>
            (this.userList = this.userList.filter((user) => user._id !== id))
        );
    }
  }

  handleSearch() {
    if (!this.searchText) return;

    return this.userService
      .getUserListAdmin(this.searchText)
      .subscribe((res) => {
        this.userList = res.data;
        this.totalPage = res.total;
      });
  }
}
