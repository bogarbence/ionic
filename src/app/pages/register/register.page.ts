import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    public toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: [
          "",
          Validators.compose([Validators.required, Validators.minLength(5)])
        ],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        passwordagain: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ]
      },
      { validator: this.checkPasswords }
    );
  }
  loginForm: any;
  async presentToast() {
    const toast = await this.toastController.create({
      message: "User already exists.",
      duration: 2000,
      position: "top",
      animated: true,
      color: "danger"
    });
    toast.present();
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get("password").value;
    const confirmPass = group.get("passwordagain").value;

    return pass === confirmPass ? null : { notSame: true };
  }
  ngOnInit() {}
  onSubmit() {
    this.httpClient
      .post("https://localhost:44302/api/Auth/register", {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
          this.presentToast();
        }
      );
  }
}
