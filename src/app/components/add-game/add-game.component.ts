import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetGameForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  gameForm: FormGroup;

  //RankArray: any = [1, 2, 3, 4, 5, 6,7,8,9,10];
  StatusArray: any = ['Available', 'Unavailable'];
  GamesList: any = [];


  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private playerApi: ApiService,
    private gameApi: ApiService,
    private actRoute: ActivatedRoute

  ) { 
     this.gameApi.GetGames().subscribe((data => {
      console.log(data)
     
      this.GamesList = data;
        
     }))
  }

  /* Reactive book form */
  submitBookForm() {
    this.gameForm = this.fb.group({
      game_title: ['', [Validators.required]],
      platform: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release: ['', [Validators.required]],
      status: ['', [Validators.required]],
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
    return this.gameForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitGameForm() {
    if (this.gameForm.valid) {
      this.gameApi.AddGame(this.gameForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/games-list'))
      });
    }
  }
}

