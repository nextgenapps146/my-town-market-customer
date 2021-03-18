import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchProductPage } from './search-product.page';

describe('SearchProductPage', () => {
  let component: SearchProductPage;
  let fixture: ComponentFixture<SearchProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
