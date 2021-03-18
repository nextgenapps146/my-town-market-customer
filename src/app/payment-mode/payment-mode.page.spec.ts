import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentModePage } from './payment-mode.page';

describe('PaymentModePage', () => {
  let component: PaymentModePage;
  let fixture: ComponentFixture<PaymentModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
