import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  selectedImages: any;

  constructor() { }

  checkPlatformForWeb() {
    if (Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() === 'android') return true
    return false
  }

  ngOnInit() { }

  async GetPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image', image);
    this.selectedImages = image;
    if (this.checkPlatformForWeb()) this.selectedImages.webPath = image.dataUrl;
  }

  async Share() {
    await Share.share({
      title: 'Share picture via whatsapp',
      text: 'Sharing an image',
      url: this.selectedImages.path,
      dialogTitle: 'Share with Whatsapp',
    });
  }

  ionViewWillLeave() {
    this.selectedImages = null;
  }
}
