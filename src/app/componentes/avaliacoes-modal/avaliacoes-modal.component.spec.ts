import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesModalComponent } from './avaliacoes-modal.component';

describe('AvaliacoesModalComponent', () => {
  let component: AvaliacoesModalComponent;
  let fixture: ComponentFixture<AvaliacoesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacoesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacoesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
