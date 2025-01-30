import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHomeComponentComponent } from './task-home-component.component';

describe('TaskHomeComponentComponent', () => {
  let component: TaskHomeComponentComponent;
  let fixture: ComponentFixture<TaskHomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHomeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskHomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
