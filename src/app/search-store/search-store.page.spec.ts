import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchStorePage } from './search-store.page';

describe('SearchStorePage', () => {
  let component: SearchStorePage;
  let fixture: ComponentFixture<SearchStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
