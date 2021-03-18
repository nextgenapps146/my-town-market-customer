import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem("city") === null ||
      localStorage.getItem("locality") === null
    ) {
      this._router.navigate(["./location"]);
      return false;
    }
    return true;
  }
}
