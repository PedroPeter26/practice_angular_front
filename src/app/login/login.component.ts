import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      uid: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      
      this.userService.loginUser(formData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      console.log('Invalid Form');
    }
  }
  
}
