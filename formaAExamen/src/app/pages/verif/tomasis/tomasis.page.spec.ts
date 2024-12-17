import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomasisPage } from './tomasis.page';

describe('TomasisPage', () => {
  let component: TomasisPage;
  let fixture: ComponentFixture<TomasisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TomasisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
