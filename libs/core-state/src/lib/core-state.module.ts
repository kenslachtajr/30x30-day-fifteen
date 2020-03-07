import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { CoreDataModule } from '@ngrx-projects/core-data';
import { reducers } from '.';

import { ProjectsEffect } from './projects-ngrx/projects.effects';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([ProjectsEffect]),
    StoreDevtoolsModule.instrument({ name: 'NGRX Sample Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
