import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MenuPageRoutingModule } from "./menu-routing.module";

import { MenuPage } from "./menu.page";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageModule } from "../login/login.module";
import { RegisterPageModule } from "../register/register.module";
const routes: Routes = [
  {
    path: "menu",
    component: MenuPage,
    children: [
      {
        path: "login",
        loadChildren: "../login/login.module#LoginPageModule"
      },
      {
        path: "register",
        loadChildren: "../register/register.module#RegisterPageModule"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/menu/login"
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MenuPageRoutingModule,
    LoginPageModule,
    RegisterPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
