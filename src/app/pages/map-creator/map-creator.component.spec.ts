import { ComponentFixture, TestBed } from '@angular/core/testing';

import MapCreatorComponent from './map-creator.component';

describe('MapCreatorComponent', () => {
  let component: MapCreatorComponent;
  let fixture: ComponentFixture<MapCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
