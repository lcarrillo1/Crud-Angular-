import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';  // Corrected import

import User from '../../types/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);

  // Initializing the form group
  userForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    age: [''],
    address: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  userService = inject(UserService);
  router = inject(Router);  // Corrected here
  route=inject(ActivatedRoute);
  editUserId!: string;
  ngOnInit (){
    this.editUserId = this.route.snapshot.params["id"];
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe(result=>{
        this.userForm.patchValue(result);
      });
    }
  }

  // Add user method that logs form data to the console
  addUser() {
    if (this.userForm.invalid) {
      alert('Please provide all fields with valid data');
      return;
    } 

    const model: User = this.userForm.value;
    this.userService.addUser(model).subscribe(result => {
      alert('User added successfully');
      this.router.navigateByUrl('/');
    });
  }
  updateUser(){
    if (this.userForm.invalid) {
      alert('Please provide all fields with valid data');
      return;
    } 
    const model: User = this.userForm.value;
    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
      alert('User updated successfully');
      this.router.navigateByUrl('/');
    })
  }
}
