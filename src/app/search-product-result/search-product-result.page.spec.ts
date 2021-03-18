import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchProductResultPage } from './search-product-result.page';

describe('SearchProductResultPage', () => {
  let component: SearchProductResultPage;
  let fixture: ComponentFixture<SearchProductResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProductResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
