import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MapboxService, Feature } from "src/services/mapbox.service";

@Component({
  selector: "app-add-address",
  templateUrl: "./add-address.page.html",
  styleUrls: ["./add-address.page.scss"],
})
export class AddAddressPage {
  uid = "";
  selectedFinalAddress = "";
  possibleAddresses = [];
  addresses = [];
  defaultAddress = 0;
  source = "";

  constructor(
    private mapboxService: MapboxService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ionViewDidEnter() {
    this.uid = localStorage.getItem("uid");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.source = params["from"];
    });
    this.getAllAddresses();
  }

  getAllAddresses() {
    if (
      localStorage.getItem(this.uid + "addresses") === null ||
      localStorage.getItem(this.uid + "addresses") === undefined
    ) {
      this.addresses = [];
    } else {
      this.addresses = JSON.parse(
        localStorage.getItem(this.uid + "addresses")
      ).items;
      this.defaultAddress = JSON.parse(
        localStorage.getItem(this.uid + "addresses")
      ).selected;
    }
  }

  searchAddress(event) {
    this.mapboxService
      .searchWord(event.target.value)
      .subscribe((features: Feature[]) => {
        const results = features.map((feat) => feat.place_name);
        this.mapPossibleAddresses(features);
      });
  }

  mapPossibleAddresses(results) {
    let tempAddresses = [];
    results.forEach((item) => {
      const address: any = {};
      const zipcode = item.context.filter((val) => val.id.includes("postcode"));
      if (zipcode !== undefined && zipcode[0] !== undefined) {
        if (zipcode[0].text !== undefined) {
          address.zipcode = zipcode[0].text;
        } else {
          address.zipcode = "";
        }
      }

      const state = item.context.filter((val) => val.id.includes("region"));
      if (state !== undefined && state[0] !== undefined) {
        if (state[0].text !== undefined) {
          address.state = state[0].text;
        } else {
          address.state = "";
        }
      }

      const city = item.context.filter((val) => val.id.includes("place"));
      if (city !== undefined && city[0] !== undefined) {
        if (city[0].text !== undefined) {
          address.city = city[0].text;
        } else {
          address.city = "";
        }
      }

      const country = item.context.filter((val) => val.id.includes("country"));
      if (country !== undefined && country[0] !== undefined) {
        if (country[0].text !== undefined) {
          address.country = country[0].text;
        } else {
          address.country = "";
        }
      }

      if (item.address === undefined) {
        if (item.text !== undefined) {
          address.streetaddress = item.text;
        } else {
          address.streetaddress = "";
        }
      } else {
        if (item.text !== undefined) {
          address.streetaddress = item.address + " " + item.text;
        } else {
          address.streetaddress = item.address;
        }
      }
      tempAddresses.push(address);
    });
    this.possibleAddresses = tempAddresses;
  }

  addressSelect(address) {
    if (address.streetaddress !== undefined) {
      this.selectedFinalAddress = address.streetaddress;
    }
    if (address.city !== undefined) {
      this.selectedFinalAddress =
        this.selectedFinalAddress + ", " + address.city;
    }
    if (address.state !== undefined) {
      this.selectedFinalAddress =
        this.selectedFinalAddress + ", " + address.state;
    }
    if (address.country !== undefined) {
      this.selectedFinalAddress =
        this.selectedFinalAddress + ", " + address.country;
    }
    if (address.zipcode !== undefined) {
      this.selectedFinalAddress =
        this.selectedFinalAddress + " - " + address.zipcode;
    }
    if (
      this.selectedFinalAddress !== undefined &&
      this.selectedFinalAddress !== null &&
      this.selectedFinalAddress !== ""
    ) {
      this.addresses.push({ fullAddress: this.selectedFinalAddress });
    }
    localStorage.setItem(
      this.uid + "addresses",
      JSON.stringify({ items: this.addresses, selected: this.defaultAddress })
    );
    this.selectedFinalAddress = "";
    this.possibleAddresses = [];
    if (this.source === "profile") {
      this.route.navigate(["my-profile"]);
    } else {
      this.route.navigate(["select-address"]);
    }
  }
}
