import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSelectionPanelComponent } from './card-selection-panel/card-selection-panel.component';

const routes: Routes = [
  {
    path: '',
    component: CardSelectionPanelComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardSelectionRoutingModule { }
