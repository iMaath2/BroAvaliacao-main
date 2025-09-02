import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteListaComponent } from './restaurante-lista.component';

describe('RestauranteListaComponent', () => {
  let component: RestauranteListaComponent;
  let fixture: ComponentFixture<RestauranteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestauranteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
