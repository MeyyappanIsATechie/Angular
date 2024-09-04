import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '../service/master.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let service = inject(MasterService);
  // if (route.url) {
  //   let menu = route.url[0].path;
  //   // console.log(menu);
  //   if (menu === 'about') {
  //     // alert("you don't  have access");
  //     // router.navigate(['customer']);
  //     router.navigateByUrl('/customer');
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  // return true;
  if (service.isLoggedIn()) {
    return true;
  } else {
    alert("You don't have access");
    router.navigateByUrl('/login');
    return false;
  }
};
