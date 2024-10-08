import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './common/about/about.component';
import { ContactComponent } from './common/contact/contact.component';
import { SupportComponent } from './common/support/support.component';
import { CustomerComponent } from './common/customer/customer.component';
import { AddComponent } from './common/add/add.component';
import { StatusComponent } from './common/status/status.component';
import { authGuard } from './guard/auth.guard';
import { childauthGuard } from './guard/childauth.guard';
import { authdeactGuard } from './guard/authdeact.guard';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ProductComponent } from './common/product/product.component';
import { LearnComponent } from './common/learn/learn.component';
import { NewproductComponent } from './common/newproduct/newproduct.component';
import { MaskComponent } from './common/mask/mask.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about/:id',
    component: AboutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contact',
    loadComponent: () => {
      return import('./common/contact/contact.component').then(
        (m) => m.ContactComponent
      );
    }, //lazy loading
    canActivate: [authGuard],
  },
  {
    path: 'support',
    canActivate: [authGuard],
    component: SupportComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [authGuard],
    canActivateChild: [childauthGuard],
    canDeactivate: [authdeactGuard],
    children: [
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'edit/:id',
        component: AddComponent,
      },
    ],
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'learn',
    component: LearnComponent,
  },
  {
    path: 'newproduct',
    component: NewproductComponent,
  },
  {
    path: 'mask',
    component: MaskComponent,
  },
  { path: '**', component: StatusComponent },
];
