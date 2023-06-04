import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { DeadlineDirective } from './shared/deadline.directive';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskFormComponent,
    ConfirmModalComponent,
    DeadlineDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    DragDropModule,
    DialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,

    MatExpansionModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
