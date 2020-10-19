import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatCardModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatProgressSpinnerModule,
   MatSelectModule,
   MatTableModule,
   MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
