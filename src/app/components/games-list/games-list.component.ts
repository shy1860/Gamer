import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Game } from 'src/app/shared/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  GameData: any = [];
  searchKey: string;
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'game_title', 'platform', 'genre', 'rating', 'publisher','release', 'status', 'action' ];

  constructor(private gameApi: ApiService, private actRoute: ActivatedRoute) {
    this.gameApi.GetGames().subscribe(data => {
      this.GameData = data;
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  deleteGame(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.gameApi.DeleteGame(e._id).subscribe()
    }
  }

  logout() {
    this.gameApi.doLogout()
  }

}