import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetJobsService } from '../services/get-jobs.service';
import { InternalJobService } from '../services/internal-job.service';

import { DashboardComponent } from './dashboard.component';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  // test
  let https: HttpClient;
  let service: GetJobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ HttpClientTestingModule],
      providers: [GetJobsService, InternalJobService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = new GetJobsService(https);
    fixture.detectChanges();
    // input = fixture.debugElement.query(By.css(value)).nativeElement;
  });

  it('jobsList dont have to be null', () =>{
    // let result = component.jobsList;
    if(component.jobsList == undefined) {
      
      component.jobsList = [];
    }

    let result = component.jobsList;
    let groda = service.getJobsService('Entry Level', component.levelsList);
    expect(result).not.toBeNull();
  });


  it('have to have 5 levels', () => {
    // check che i livelli siano 5
    let ngel = fixture.debugElement.queryAll(By.css('.inputCheck'));
    expect(ngel.length).toEqual(5);
  });


  it('have to be Senior Level', () => {

    let test = 'Senior Level';
    let result = '';

    let ngel = fixture.debugElement.queryAll(By.css('.test'));
    
    ngel.forEach((lvl) => {
      // console.log(lvl.nativeElement.textContent + 'tesing iterate');
      if(lvl.nativeElement.textContent == 'Senior Level') {
        result = lvl.nativeElement.textContent;
      }
    });

    expect(result).toBe(test);
  });

  // check if all checkboxes
  // are true
  it('checkboxes works', () => {
    let inputTags = fixture.debugElement.queryAll(By.css('.inputCheck'));
    // console.log(inputTags[0].nativeElement.value + ' test');

    let countCheckTrue = 0;

    inputTags.forEach((checkedValue) => {
      if(checkedValue.nativeElement.checked == true) {
        countCheckTrue++;
      }
    });

    expect(countCheckTrue).toBe(5);
  });

  // simulazione click utente su lelevlist
  // poniamo a false level.selected di "Senior Level"
  it('checkboxes works', () => {
    let inputTags = fixture.debugElement.queryAll(By.css('.inputCheck'));
    console.log(inputTags[0].nativeElement.value + ' test');

    // user input simulation
    let checkedFalse = true;

    inputTags.forEach((lvls) => {
      if(lvls.nativeElement.value == 'Senior Level') {
        lvls.nativeElement.checked = false;
        checkedFalse = false;
      }
    });

    expect(checkedFalse).not.toBeTrue();
  });
});
