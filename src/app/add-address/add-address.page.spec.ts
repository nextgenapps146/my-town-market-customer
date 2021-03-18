import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAddressPage } from './add-address.page';

describe('AddAddressPage', () => {
  let component: AddAddressPage;
  let fixture: ComponentFixture<AddAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
