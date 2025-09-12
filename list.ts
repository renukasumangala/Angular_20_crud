import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { Associate } from '../../_shared/associate';
import { associateModel } from '../../../model/associate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [MatCardModule,MatButtonModule,MatTableModule,MatDialogModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit,OnDestroy{

  _list:associateModel[] = [];
  subs=new Subscription();
  displayHeaders=['id','name','address','cl','status','action']
  datasource!: MatTableDataSource<associateModel>;
 constructor(private service:Associate) {

 }

  GetallList() {
    let _sub= this.service.Getall().subscribe(item => {
     this._list = item;
     this.datasource= new MatTableDataSource(this._list);

    });
    this.subs.add(_sub);
  }

  ngOnInit(): void {
    this.GetallList();
    
      
  }
  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
