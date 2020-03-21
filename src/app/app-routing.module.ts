import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlayerComponent } from './components/add-player/add-player.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from "./shared/auth.guard";


const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'player-rankings' },
  { path: '', redirectTo: '/player-rankings', pathMatch: 'full' },
  { path: 'add-player', component: AddPlayerComponent, canActivate: [AuthGuard]  },
  { path: 'edit-player/:id', component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: 'add-game', component: AddGameComponent, canActivate: [AuthGuard]  },
  { path: 'edit-game/:id', component: EditGameComponent, canActivate: [AuthGuard] },
  { path: 'player-list', component: PlayerListComponent, canActivate: [AuthGuard]},
  { path: 'games-list', component: GamesListComponent, canActivate: [AuthGuard] },
  { path: 'player-rankings', component: PlayerRankingsComponent },
  { path: 'join-game/:id', component: JoinGameComponent, canActivate: [AuthGuard] },

  
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
