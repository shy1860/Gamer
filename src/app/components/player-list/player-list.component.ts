import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../shared/api.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Player } from 'src/app/shared/player';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  PlayerData: any = [];
  
  searchKey: string;
  
  dataSource: MatTableDataSource<Player>;
  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'player_name', 'rank', 'score', 'time', 'gamesPlayed', 'status', 'action'];

  constructor(public playerApi: ApiService, private actRoute: ActivatedRoute) {
    this.playerApi.GetPlayers().subscribe(data => {
      this.PlayerData = data;
      this.dataSource = new MatTableDataSource<Player>(this.PlayerData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }


  deletePlayer(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.playerApi.DeletePlayer(e._id).subscribe()
    }
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  logout() {
    this.playerApi.doLogout()
  }

}
