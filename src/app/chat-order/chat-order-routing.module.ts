import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatOrderPage } from './chat-order.page';

const routes: Routes = [
  {
    path: '',
    component: ChatOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatOrderPageRoutingModule {}
