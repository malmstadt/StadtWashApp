import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	lat: any;
	lng: any;
	
	url: string;

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser, private geolocation: Geolocation, public loadingCtrl: LoadingController) {
  }
  
  openWebpage(url: string){
	  //show a loader for bringing up the webpage
	  let loader = this.loadingCtrl.create({
		  spinner:"bubbles",
		  content:"Loading...",
		  duration:2000
	  });
	loader.present();
	
	  //set up options
	  const options: InAppBrowserOptions = {
		  zoom: 'no',
		  location: 'no',
		  toolbar: 'no',
		  presentationstyle: 'formsheet',
		  hardwareback: 'no',
		  disallowoverscroll: 'yes'
	  }
	  
	  //opening a url and returing an InAppBrowserObject
	  const browser = this.inAppBrowser.create(url, '_blank', options);
	  
  }
  
  //waits until the page is ready
  ionViewDidLoad(){
	  this.geolocation.getCurrentPosition().then( pos => {
		  this.lat = pos.coords.latitude;
		  this.lng = pos.coords.longitude;
	  }).catch( err => console.log(err));
  }
}

