import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardSelectionRoutingModule } from './card-selection-routing.module';
import { CardSelectionPanelComponent } from './card-selection-panel/card-selection-panel.component';
import { CardComponent } from './card/card.component';
import { CardService } from '../../services/card.service';
import { FlexLayoutModule } from '@angular/flex-layout';

/** This is a lazy loaded module which wraps all card related components and
 * services. We load this module with the app module together. 
 */
@NgModule({
  declarations: [CardSelectionPanelComponent, CardComponent,],
  providers: [CardService],
  imports: [
    CommonModule,
    CardSelectionRoutingModule,
    FlexLayoutModule,
  ]
})
export class CardSelectionModule { }