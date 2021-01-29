import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: "app-action-dialog",
  templateUrl: "action-dialog.component.html",
  styleUrls: ['action-dialog.component.scss']

})
export class ActionDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {

  }

}
