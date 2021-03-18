import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectAddressPage } from './select-address.page';

describe('SelectAddressPage', () => {
  let component: SelectAddressPage;
  let fixture: ComponentFixture<SelectAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
