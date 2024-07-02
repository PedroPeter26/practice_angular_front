import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';

interface User {
  name: String,
  lastname: String,
  age: number,
  birthdate: Date,
  email: String,
  nickname: String,
  phone: string,
  password: string
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const isSubmited = false
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmited))
  }
}

@Component({
  selector: 'app-form-reg',
  templateUrl: './form-reg.component.html',
  styleUrls: ['./form-reg.component.css']
})
export class FormRegComponent implements OnInit{

  formulario!: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: this.emailFormControl,
      nickname: ['@', [Validators.required, Validators.pattern(/^@[\w]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(10)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formData: User = this.formulario.value;
      console.log('Datos del formulario:', formData);

      this.userService.registerUser(formData).subscribe(response => {
        console.log('Datos enviados exitosamente: ', response);
      }, error => {
        console.error('Error al enviar los datos: ', error)
      })

    } else {
      console.log('Formulario inválido');
    }
  }

  validateNickname(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (!value.startsWith('@')) {
      value = '@' + value.replace(/^@*/, '');
    }

    value = value.replace(/[^@\w]/g, '');
    this.formulario.get('nickname')!.setValue(value, { emitEvent: false });
  }

  validatePhone(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    value = value.replace(/[^0-9]/g, '');
    this.formulario.get('phone')!.setValue(value, { emitEvent: false });
  }
}
