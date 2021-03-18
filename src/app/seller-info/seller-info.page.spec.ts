import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerInfoPage } from './seller-info.page';

describe('SellerInfoPage', () => {
  let component: SellerInfoPage;
  let fixture: ComponentFixture<SellerInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
