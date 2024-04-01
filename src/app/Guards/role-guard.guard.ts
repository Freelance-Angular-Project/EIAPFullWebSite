import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/User/user.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  // const localstorage=inject(LocalstorageService);
  const requiredRole = route.data['role'];
  if (userService.getUsersInRole(requiredRole) && userService.isUserLogged) {
    // console.log('successssss');
    return true;
  } else {
    // console.log('error in guard');

    alert('You must login first');
    router.navigate(['/Home']);
    // router.navigate(['**']);
    return false;
  }
};
