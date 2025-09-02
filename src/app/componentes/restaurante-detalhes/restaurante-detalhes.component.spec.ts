import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteDetalhesComponent } from './restaurante-detalhes.component';

describe('RestauranteDetalhesComponent', () => {
  let component: RestauranteDetalhesComponent;
  let fixture: ComponentFixture<RestauranteDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauranteDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestauranteDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
