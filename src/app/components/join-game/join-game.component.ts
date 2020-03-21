import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Game } from 'src/app/shared/game';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  visible = true;
  playerData: any = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: true}) chipList;
  @ViewChild('resetPlayerForm', {static: true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm1: FormGroup;
  // RankArray: any = [1, 2, 3, 4, 5, 6,7,8,9,10];
  // StatusArray: any = ['Available', 'Unavailable'];
   GamesList: any = [];
   //GamesArray: any = ['game1', 'game2', 'game3', 'game4', 'game5'];
  

  ngOnInit() {
    // this.updatePlayerBForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private playerApi: ApiService,
    private gameApi: ApiService
    
  ) { 

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.playerApi.GetPlayer(id).subscribe(data => {
      //console.log(data.subjects)
      //this.subjectArray = data.subjects;
      this.playerData=data;
      this.playerForm1 = this.fb.group({
      player_name: {value: data.player_name, disabled:true},
      rank:{value: data.rank, disabled:true},
      score: {value: data.score, disabled:true},
      time: {value: data.time, disabled:true},
      gamesPlayed: {value: data.gamesPlayed, disabled:true},
      gamesAvailable: ['', [Validators.required]],
      })   
      })   
    
    this.gameApi.GetGames().subscribe((data => {
      console.log(data)
      //this.subjectArray = data.subjects;
      this.GamesList = data;
        
    }))
  }


  
    
  


  /* Reactive book form */
  // updatePlayerBForm() {
  //   this.playerForm = this.fb.group({
  //     player_name: [''],
  //     rank: [''],
  //     score: [''],
  //     time: [''],
  //     gamesPlayed: [''],
  //     status: ['']
  //   })
  // }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    // if ((value || '').trim()) {
    //   this.subjectArray.push({ name: value.trim() })
    // }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  // remove(subject: Subject): void {
  //   const index = this.subjectArray.indexOf(subject);
  //   if (index >= 0) {
  //     this.subjectArray.splice(index, 1);
  //   }
  // }

  /* Date */
  // formatDate(e) {
  //   var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.studentForm.get('dob').setValue(convertDate, {
  //     onlyself: true
  //   })
  // }
  


  /* Submit book */
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm1.controls[controlName].hasError(errorName);
  }  


  


  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm1.value)
    this.playerData['status'] = 'Unavailable';
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerData).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-rankings'))
      });
    }
  }
  


      
    }



  
