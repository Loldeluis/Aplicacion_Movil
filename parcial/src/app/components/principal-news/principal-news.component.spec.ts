import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalNewsComponent } from './principal-news.component';

describe('PrincipalNewsComponent', () => {
  let component: PrincipalNewsComponent;
  let fixture: ComponentFixture<PrincipalNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
