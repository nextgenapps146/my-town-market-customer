import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchStoreResultPage } from './search-store-result.page';

describe('SearchStoreResultPage', () => {
  let component: SearchStoreResultPage;
  let fixture: ComponentFixture<SearchStoreResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStoreResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStoreResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
