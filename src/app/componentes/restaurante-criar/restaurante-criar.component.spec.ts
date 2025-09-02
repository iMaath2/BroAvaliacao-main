import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteCriarComponent } from './restaurante-criar.component';

describe('RestauranteCriarComponent', () => {
  let component: RestauranteCriarComponent;
  let fixture: ComponentFixture<RestauranteCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteCriarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestauranteCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
