import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroListBullet,
  heroPencilSquare,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { User } from '../../models/User';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [provideIcons({ heroTrash, heroPencilSquare, heroListBullet })],
})
export class TableComponent {
  @Input() columnNames!: string[];
  @Input() data!: any[];
  @Input() title!: string;
  @Input() propertiesName!: string[];

  @Output() sendItemId: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemSelected: EventEmitter<User> = new EventEmitter<User>();

  itemId(id: number) {
    this.sendItemId.emit(id);
  }
  selectedItem(item: any) {
    this.itemSelected.emit(item);
  }
}
