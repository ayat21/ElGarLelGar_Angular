import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LayoutService } from 'src/app/services/layout.service';
import { Role } from 'src/app/Models/role';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

    /**
     * 
  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

     */
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: LayoutService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/index']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['/index'] || '/'; 
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
    
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        //if(this.f.email.value=="ayathosam20@gmail.com", this.f.password.value=="123456")
//{
         this.authenticationService.login(this.f.email.value, this.f.password.value )
         .pipe(first())
         .subscribe(
             _data => {
               if(this.authenticationService.currentUserValue.Role==Role.Admin)
               {
                 this.router.navigate(['/admin']);
                 }
                 else
                 {
                  this.router.navigate(['/index']);
                 }
             },
             error => {
                 this.error = error;
                 this.loading = false;
             });
           
         

         
        
         
        this.authenticationService.login(this.f.email.value, this.f.password.value )
            .pipe(first())
            .subscribe(
                _data => {           
                    this.router.navigate(['/index']); 
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
              
            

            }
    

          }