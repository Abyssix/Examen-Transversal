import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifPage } from './verif.page';

describe('VerifPage', () => {
  let component: VerifPage;
  let fixture: ComponentFixture<VerifPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
