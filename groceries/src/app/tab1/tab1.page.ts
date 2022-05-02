import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {GroceriesServiceService} from '../services/groceries-service.service';
import {InputDialogServiceService} from '../services/input-dialog-service.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {File} from '@ionic-native/file/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = 'Grocery';

  items: any =[];
  errorMessage: string;


  constructor(
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public dataService: GroceriesServiceService,
              public inputDialogService: InputDialogServiceService,
              public socialSharing: SocialSharing){
                dataService.dataChanged$.subscribe((dataChanged: boolean) => {
                this.loadItems();
              });


}

  ionViewDidload(){
    this.loadItems();
}

  loadItems(): any {
    this.dataService.getItems().subscribe(
      items => this.items = items,
      error => this.errorMessage = error);


    return this.dataService.getItems();
  }


async removeItem(id) {
    this.dataService.removeItem(id);
}

  async shareItem(item, index) {

    console.log('Sharing Item - ', item, 'index: ', index);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item - '  + 'index: ' + index + ' ...',
      duration: 3000,
      position: 'bottom',
    //  closeButtonText: 'YES',
    });


    await  toast.onDidDismiss().then((value) => {
      console.log(value);
    });

    await toast.present();
    const message = 'Grocery Item-Name: ' + item.name + 'Quantity: ' + item.quantity;
    const subject = 'Shared via Griceries app';

    this.socialSharing.share(message, subject).then(() =>{
      console.log('Shared successfully!');
    }).catch((error) => {
      console.error('Error while sharing ', error);

    });
  }


  async editItem(item, index) {
    console.log('Edit Item - ', item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item -' + index + '...',
      duration: 3000
    });
    // this.items = this.items.filter( itm => itm.name !== item.name);
    await toast.present();
    await this.inputDialogService.showPrompt(item, index);
  }

  async addItem() {
    console.log('Adding Item');
    await this.inputDialogService.showPrompt();
  }

}



