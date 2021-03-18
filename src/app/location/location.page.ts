import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocationService } from "src/services/location.service";
import { UtilityService } from "src/services/utility.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.page.html",
  styleUrls: ["./location.page.scss"],
})
export class LocationPage implements OnInit {
  cities = [];
  localities = [];
  selectedCity = "";
  selectedLocality = "";

  constructor(
    private locationService: LocationService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.locationService.getCities().subscribe((locations) => {
      this.cities = locations.map((location) => {
        return location["city"];
      });
      this.cities.sort();
      if (
        localStorage.getItem("city") !== undefined &&
        localStorage.getItem("city") !== null
      ) {
        this.selectedCity = localStorage.getItem("city");
      }
      if (
        this.selectedCity !== undefined &&
        this.selectedCity !== null &&
        this.selectedCity !== ""
      ) {
        this.getLocalities(0);
      }
    });
  }

  getLocalities(type) {
    this.locationService
      .getLocalities(this.selectedCity)
      .subscribe((locations) => {
        this.localities = locations.map((location) => {
          return location["locality"];
        });
        this.localities.sort();
        if (
          type === 0 &&
          localStorage.getItem("locality") !== undefined &&
          localStorage.getItem("locality") !== null
        ) {
          this.selectedLocality = localStorage.getItem("locality");
        }
      });
  }

  setCity() {
    this.selectedLocality = "";
    this.getLocalities(1);
  }

  confirmLocation() {
    if (
      this.selectedCity !== undefined &&
      this.selectedCity !== null &&
      this.selectedCity !== "" &&
      this.selectedLocality !== undefined &&
      this.selectedLocality !== null &&
      this.selectedLocality !== ""
    ) {
      localStorage.setItem("city", this.selectedCity);
      localStorage.setItem("locality", this.selectedLocality);
      this.router.navigate(["./home"]);
    } else {
      this.utilityService.showToast("Please select City and Locality");
    }
  }
}
