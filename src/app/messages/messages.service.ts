import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messagesCollection;

  constructor(private firestore: AngularFirestore) {
    this.messagesCollection = this.firestore.collection<Message>('messages');
  }

  getMessages(): Observable<Message[]> {
    return this.messagesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Message;
        })
      )
    );
  }

  addMessage(message: Message): Observable<Message> {
    const id = this.firestore.createId();
    const newMessage = { id, ...message };
    return new Observable((observer) => {
      this.messagesCollection
        .doc(id)
        .set(newMessage)
        .then(() => {
          observer.next(newMessage);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
