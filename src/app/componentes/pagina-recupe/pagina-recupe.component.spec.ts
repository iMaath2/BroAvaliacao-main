import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRecupeComponent } from './pagina-recupe.component';

describe('PaginaRecupeComponent', () => {
  let component: PaginaRecupeComponent;
  let fixture: ComponentFixture<PaginaRecupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaRecupeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaRecupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
