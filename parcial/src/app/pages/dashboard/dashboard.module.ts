import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { NewsModalComponent } from './news-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { ProfileModalComponent } from './profile-modal.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardPage,
    NewsModalComponent,
    ProfileModalComponent,
    UserFormComponent
    ]
})
export class DashboardPageModule {}
