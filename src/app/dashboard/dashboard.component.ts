import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginMessage = 'Login succeed';

  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastname', 'age', 'birthdate', 'email', 'nickname', 'phone'];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const token = this.userService.getToken();
    if (!token) {
      this.router.navigate(['/']);
    }
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  logout(): void {
    this.userService.logoutUser().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }
}
