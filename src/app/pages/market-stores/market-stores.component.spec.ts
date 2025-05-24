import { ComponentFixture, TestBed } from '@angular/core/testing';

import MarketStoresComponent from './market-stores.component';

describe('MarketStoresComponent', () => {
  let component: MarketStoresComponent;
  let fixture: ComponentFixture<MarketStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketStoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
