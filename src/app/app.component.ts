import { Component } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "TechChallenge";
  uploadedImage: string | ArrayBuffer;
  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    const fileList: object[] = e.dataTransfer.files;
    if (fileList.length < 2) {
      for (let i = 0; i < fileList.length; i++) {
        let currentFile: any = fileList[i];
        if (currentFile.type.match(/image.*/)) {
          var reader = new FileReader();
          reader.onload = fileReader => {
            this.uploadedImage = fileReader.target.result;
          };
          reader.readAsDataURL(currentFile);
        }
      }
    }
  }

  allowDrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }
}
