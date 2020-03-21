import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: true}) chipList;
  @ViewChild('resetPlayerForm', {static: true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  playerForm: FormGroup;
  RankArray: any = [1, 2, 3, 4, 5, 6,7,8,9,10];
  StatusArray: any = ['Available', 'Unavailable'];
  //GamesArray: any = ['game1', 'game2', 'game3', 'game4', 'game5'];
  GamesList: any = [];

  ngOnInit() {
    this.updatePlayerBForm();
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
   
      this.playerForm = this.fb.group({
      player_name: [data.player_name, [Validators.required]],
      rank: [data.rank, [Validators.required]],
      score: [data.score, [Validators.required]],
      time: [data.time, [Validators.required]],
      gamesPlayed: [data.gamesPlayed, [Validators.required]],
      status: [data.status, [Validators.required]]
      })      
    })
    
    this.gameApi.GetGames().subscribe((data => {
      console.log(data)
 
      this.GamesList = data;
    }))    
  }


  updatePlayerBForm() {
    this.playerForm = this.fb.group({
      player_name: ['', [Validators.required]],
      rank: ['', [Validators.required]],
      score: ['', [Validators.required]],
      time: ['', [Validators.required]],
      gamesPlayed: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
   
    if (input) {
      input.value = '';
    }
  }


  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.playerForm.controls[controlName].hasError(errorName);
  }  

  /* Update book */
  updatePlayerForm() {
    console.log(this.playerForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.playerApi.UpdatePlayer(id, this.playerForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/player-list'))
      });
    }
  }
  
}







  
