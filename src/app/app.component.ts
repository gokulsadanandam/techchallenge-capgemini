import { Component } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "TechChallenge";

  drop(e) {
    e.preventDefault();
    console.log("dropped!");
  }

  allowDrop(ev) {
    console.log("hey");
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
