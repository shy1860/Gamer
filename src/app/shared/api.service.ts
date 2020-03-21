import { Injectable } from '@angular/core';
import { Player } from './player';
import { Game } from './game';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  //endpoint: string = 'http://localhost:4000/api';
  //endpoint: string = 'api';
  endpoint: string = 'https://backendgamer.herokuapp.com/api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient,
    public router: Router) { }

  // Sign-up
  signUp(user: User): Observable<any> {
    let API_URL = `${this.endpoint}/register-user`;
    //let api = `${this.endpoint}/register-user`;
    return this.http.post(API_URL, user)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          //this.router.navigate(['player-list/' + res.msg._id]);
          this.router.navigate(['player-list/']);
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Add player
  AddPlayer(data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/players/add-player`;
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorMgmt)
      )
  }

  // Add game
  AddGame(data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/games/add-game`;
    return this.http.post(API_URL, data).pipe(
      catchError(this.errorMgmt)
      )
  }

  
  // Get all player
  GetPlayers() {
    return this.http.get(`${this.endpoint}/players/`);
  }

  //get all games
  GetGames() {
    return this.http.get(`${this.endpoint}/games/`);
  }

  // Get player
  GetPlayer(id): Observable<any> {
    let API_URL = `${this.endpoint}/players/read-player/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get game
  GetGame(id): Observable<any> {
    let API_URL = `${this.endpoint}/games/read-game/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update player
  UpdatePlayer(id, data: Player): Observable<any> {
    let API_URL = `${this.endpoint}/players/update-player/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  UpdateGame(id, data: Game): Observable<any> {
    let API_URL = `${this.endpoint}/games/update-game/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }




  // Delete Player
 
  DeletePlayer(id): Observable<any> {
    var API_URL = `${this.endpoint}/players/delete-player/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  DeleteGame(id): Observable<any> {
    var API_URL = `${this.endpoint}/games/delete-game/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}