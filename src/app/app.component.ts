import { HttpClient } from "@angular/common/http";
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
  s3UploadApi = "https://1wpmxrn2p9.execute-api.us-east-1.amazonaws.com/dev";
  fileType: string;
  loading = false;

  constructor(private http: HttpClient) {}

  drop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.captureImageFromFileReader(e.dataTransfer.files);
  }

  captureImageFromFileReader(fileList: object[]) {
    if (fileList.length < 2) {
      for (let i = 0; i < fileList.length; i++) {
        let currentFile: any = fileList[i];
        this.fileType = currentFile.type;
        if (currentFile.type.match(/image.*/)) {
          var reader = new FileReader();
          reader.onload = fileReader => {
            this.uploadedImage = fileReader.target.result;
          };
          reader.onloadend = fileReaderOnLoad => {
            this.upload();
          };
          reader.readAsDataURL(currentFile);
        }
      }
    }
  }

  toggleLoading() {
    this.loading = !this.loading;
  }

  upload() {
    if (this.uploadedImage) {
      this.toggleLoading();
      this.http
        .post(this.s3UploadApi, {
          file:
            typeof this.uploadedImage == "string"
              ? this.uploadedImage.replace(/^data:\w+\/\w+;base64,/, "")
              : this.uploadedImage,
          fileType: this.fileType
        })
        .subscribe(
          response => {
            this.toggleLoading();
            this.uploadedImage = null;
            alert("Uploaded to S3 Bucket.");
          },
          (error: any) => {
            alert(`Error Occured! - ${JSON.stringify(error)}`);
          }
        );
    } else {
      alert("Name and File are required fields!");
    }
  }

  allowDrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }
}
