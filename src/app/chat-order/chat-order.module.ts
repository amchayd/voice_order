import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatOrderPageRoutingModule } from './chat-order-routing.module';

import { ChatOrderPage } from './chat-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatOrderPageRoutingModule
  ],
  declarations: [ChatOrderPage]
})
export class ChatOrderPageModule {}
