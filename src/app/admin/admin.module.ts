import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

//export const routes: Routes = [
//   {path: 'admin', component: AdminComponent}
//  ];


@NgModule({
    declarations: [ AdminComponent ],
    imports: [ AdminRoutingModule, CommonModule ],
})

export class AdminModule { }