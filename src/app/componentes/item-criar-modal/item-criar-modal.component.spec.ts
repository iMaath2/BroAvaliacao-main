import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCriarModalComponent } from './item-criar-modal.component';

describe('ItemCriarModalComponent', () => {
  let component: ItemCriarModalComponent;
  let fixture: ComponentFixture<ItemCriarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCriarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCriarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
