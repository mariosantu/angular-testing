import { Component, OnInit } from '@angular/core';
import { GetJobsService } from '../services/get-jobs.service';
import { InternalJobService } from '../services/internal-job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  jobsList?: any[]; // serve ad archiviare la lista dei lavori scelti dall'utente
  categoryList:string[] = ['Software Engineering']; // eventuale elenco di categorie di lavoro (esempio: da riga 22 a 26)
  defaultCategory:string = 'Software Engineering'; // categoria di default selezionata ad avvio applicazione
  userCategoryChoice:string = this.defaultCategory; // eventuale scelta di categoria da parte dell'utente (se categoryList è > 1)

  // nel caso si volesse alimentare la lista delle categorie
  // decommentare il seguente categoryList e commentare quello
  // impostato di default.
  // categoryList:string[] = ['Software Engineering',
  //                           'Accounting',
  //                           'Sales',
  //                           'Design and UX'
  //                         ];

  // lista dei livelli di competenza presenti su the muse
  levelsList = [
    {selected:true,name: "Entry Level"},
    {selected:true,name:"Mid Level"},
    {selected:true,name:"Senior Level"},
    {selected:true,name:"management"},
    {selected:true,name:"Internship"}
  ];

  constructor(private _GetJobsService:GetJobsService, private _InternalJobService:InternalJobService) { }

  ngOnInit(): void {
    // all'avvio dell'applicazione il dashboard component chiama il servizio _GetJobsService e con la funzione getJobsService
    // ritorna un oggetto json 

    // input: stringa,array 
    // output:json (jobsList)
    this._GetJobsService.getJobsService(this.defaultCategory, this.levelsList).subscribe(
      data=>
      {
        this.jobsList = data.results;
        
        //chiamo _InternalJobService per archiviare l'elenco delle offerte di lavoro mediante 
        // il metodo addJobsList
        // input: json 
        // output: void
        this._InternalJobService.addJobsList(this.jobsList);
      }
    )
  }

  // in caso di una lista di più categorie (categoryList) commentare la riga 14
  // e decommentare da 22 a 26 e da riga 67 a 77 in modo da permettere all'utente
  // di effettuare la ricerca secondo le varie categrie presenti in categoryList.
  // I valori presenti in categoryList sono quelli utilizzati da the muse).

  // input:string, string[] 
  // con questa funzione l'utente inserisce un eventuale categoria e un livello di competenza 
  // e ritrona un oggetto json
  // getJobs(category:string, level:string[]): void {
  //   // console.log(category);
  //   this._GetJobsService.getJobsService(category, level).subscribe(
  //     data=>
  //     {
  //       this.jobsList = data;
  //       console.log(this.jobsList);
  //       // console.log(data);
  //     }
  //   )
  // }

  // onChangeLevel ha lo scopo di controllare eventuali scelte 
  // effettuate dall'utente sui livelli (Entry Level,Mid Level...).
  // input: string 
  // output: [object]
  onChangeLevel($event:any) {

    const selectedLevel = $event.target.value;
    // let selectedLevel = '';

    // if($event.target.value != undefined) {
    //    selectedLevel = $event.target.value;
    // } else {
    //    selectedLevel = 'Senior Level';
    // }
    
    console.log(selectedLevel + 'valore di selected level');
    this.levelsList = this.levelsList.map((lvl) => {
      if(lvl.name == selectedLevel) {
        lvl.selected = !lvl.selected;
      }
      console.log('lvl ' + lvl);
      return lvl;
    });

  }

  // ha lo scopo di registrare la categoria scelta dall'utente
  getUserCategoryChoice() {
    this.userCategoryChoice;
    console.log(this.userCategoryChoice);
  }

  // questa funzione primariamente controlla al momento della ricerca
  // se la categoria sia stata scelta dall'utente e solo dopo attraverso
  // il servizio getJobsService effettua la chiamta al server per ricavarne i dati 
  getUserQuery() {

    var checkVoidLevel = false;

    if(this.userCategoryChoice == undefined) {
      this.userCategoryChoice = this.defaultCategory;
    }

    this.levelsList.forEach(el => {
      if(el.selected == true) {
        checkVoidLevel = true;
      }
    });

    if(checkVoidLevel) {
      this._GetJobsService.getJobsService(this.userCategoryChoice, this.levelsList).subscribe(
        data=>
        {
          this.jobsList = data.results;
          this._InternalJobService.addJobsList(this.jobsList);
        }
      );
    } else {
      alert('check required!');
    }
  }
}
