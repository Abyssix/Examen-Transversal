import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuPassPage } from './recu-pass.page';

describe('RecuPassPage', () => {
  let component: RecuPassPage;
  let fixture: ComponentFixture<RecuPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
