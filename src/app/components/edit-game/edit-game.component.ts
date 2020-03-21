import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: true}) chipList;
  @ViewChild('resetGameForm', {static: true}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  gameForm: FormGroup;
  //RankArray: any = [1, 2, 3, 4, 5, 6,7,8,9,10];
  StatusArray: any = ['Available', 'Unavailable'];
  //GamesArray: any = ['game1', 'game2', 'game3', 'game4', 'game5'];
  GamesList: any = [];

  ngOnInit() {
    this.updateGameBForm();
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
    this.gameApi.GetGame(id).subscribe(data => {
   
      this.gameForm = this.fb.group({
      game_title: [data.game_title, [Validators.required]],
      platform: [data.platform, [Validators.required]],
      genre: [data.genre, [Validators.required]],
      rating: [data.rating, [Validators.required]],
      publisher: [data.publisher, [Validators.required]],
      release: [data.release, [Validators.required]],
      status: [data.status, [Validators.required]],
      })      
    })
    this.gameApi.GetGames().subscribe((data => {
      console.log(data)
      this.GamesList = data;
    }))    
  }

  /* Reactive book form */
  updateGameBForm() {
    this.gameForm = this.fb.group({
      game_title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
   
    if (input) {
      input.value = '';
    }
  }


  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.gameForm.controls[controlName].hasError(errorName);
  }  

  /* Update game */
  updateGameForm() {
    console.log(this.gameForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.gameApi.UpdateGame(id, this.gameForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/games-list'))
      });
    }
  }
  
}
