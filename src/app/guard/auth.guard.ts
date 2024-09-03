import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (route.url) {
    let menu = route.url[0].path;
    // console.log(menu);
    if (menu === 'about') {
      // alert("you don't  have access");
      // router.navigate(['customer']);
      router.navigateByUrl('/customer');
      return false;
    } else {
      return true;
    }
  }
  return true;
};
