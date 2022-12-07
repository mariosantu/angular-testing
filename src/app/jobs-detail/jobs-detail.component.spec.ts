import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { JobsDetailComponent } from './jobs-detail.component';

xdescribe('JobsDetailComponent', () => {
  let component: JobsDetailComponent;
  let fixture: ComponentFixture<JobsDetailComponent>;


  beforeEach(async () => {

    let vmockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return 1;
          },
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ JobsDetailComponent ],
      imports: [HttpClientModule],
      providers: [{provide: ActivatedRoute, useValue: vmockActivatedRoute}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
