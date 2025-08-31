import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkComponent } from './link.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
