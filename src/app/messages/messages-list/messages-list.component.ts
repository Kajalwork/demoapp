import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Message Submitted:', result);
      }
    });
  }
}
