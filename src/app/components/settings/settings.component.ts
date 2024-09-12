import {  ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';
import { EntityMapDO } from 'src/app/vos/scheduleVO';
import { SpinnerComponent } from '../spinner/spinner.component';
import * as CONSTS from "src/app/utils/myconstants";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  showTab: boolean=false;
  connectedSys: any;
  connectedSysId: any;
  settTabs: any=[];
  displayedColumns: any=[];
  schdl!: EntityMapDO;
  dialogSpin: any;
  errorMsgFlag: boolean=false;
  errorMsg: any;
  tabIndex: any =0;
  salesType: any;
  entityLists: any=[
];
  selectedValue: any;
  typeHead: any;
 
  HeaderColumns:any=[]
  rows:any=[]
  schdlIn: any;
  tabIndexIn: any=0;
  fromSysId!: number;
  toSysId: any;
  tabHead!: string;
  eMapID: any = 0;
  headerRows: any;
  editing: any;
  showngxTable: boolean=false;
  constructor(private state: StateManagerService,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,) {
      
    
      this.state.sidebarChanged.subscribe((data) => {
   
         if(data){
          console.log(data);
          this.showngxTable = false;
           setTimeout(() => (this.showngxTable = true),120);
         }
      
        // if (data) {
         
        // }
      });

      
    this.state.SelectedName.subscribe((data) => {
      if(data){
        console.log(data);
      this.connectedSys =data;
      this.settTabs =[ "QuickBooks to " + this.connectedSys ,this.connectedSys +" to QuickBooks"];

      
      }
   })

   this.state.SelectedId.subscribe((data) => {
    if(data){
      console.log(data);
      this.connectedSysId =data;

      this.changeTabSett();
    }
   
   });

   this.connectedSys = localStorage.getItem("connectedSys");
   this.connectedSysId = localStorage.getItem("connectedSysId");
    console.log(this.connectedSys);
   console.log(this.connectedSysId);

   this.settTabs =[ "QuickBooks to " + this.connectedSys ,this.connectedSys +" to QuickBooks"]
  }

  ngOnInit(): void {
    //this.displayedColumns.push("field" , 'column');

    this.changeTabSett();

  }
  changeTabSett(){
    if(this.tabIndex  == 0){
      this.fromSysId = 1;
      this.toSysId = this.connectedSysId;
      this.typeHead = this.connectedSys;
      this.tabHead  = "QuickBooks";
     }
     else{
      this.fromSysId = this.connectedSysId;
      this.toSysId = 1;
      this.typeHead = "QuickBooks";
      this.tabHead  = this.connectedSys;
     }
     this.schdl = new EntityMapDO();
     this.schdl.fromSysId = this.fromSysId;
     this.schdl.toSysId = this.toSysId;
     this.getEntityData()
  }
  tabClick(event:any){
   
    
    this.tabIndex = event.index;
    this.changeTabSett();
  }
  getEntityData() {
   
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    
    this.serverservice
      .callService("SysEntity_1", this.schdl, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          
          
           this.entityLists = data[0];
           this.salesType = data[1];
           this.selectedValue = this.salesType[0].entityid;
          
          this.schdlIn = new EntityMapDO();
          this.schdlIn.fromSysId = this.fromSysId;
          this.schdlIn.fromSysEntityId = this.entityLists[0].entityid;
          this.schdlIn.toSysId = this.toSysId;
          this.schdlIn.toSysEntityId = this.salesType[0].entityid;
          this.getSetData();
          

        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  tabClickIn(event:any){
    this.rows=[];
    this.HeaderColumns=[];

  
    this.tabIndexIn = event.index;
    this.selectedValue = this.salesType[0].entityid;
    console.log( event.tab.textLabel);
    

     this.schdlIn = new EntityMapDO();
     this.schdlIn.fromSysId = this.fromSysId;
     this.schdlIn.fromSysEntityId = this.entityLists[this.tabIndexIn].entityid;
     this.schdlIn.toSysId = this.toSysId;
     this.schdlIn.toSysEntityId = this.salesType[0].entityid;      

     this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    
    setTimeout(() => {
      this.getSetData();
    }, 600);
      
   
   
 
   
   
   
  }
  typeChange(event:any){
    console.log(event.value);
    
     this.schdlIn = new EntityMapDO();
     this.schdlIn.fromSysId = this.fromSysId;
     this.schdlIn.fromSysEntityId = this.entityLists[this.tabIndexIn].entityid;
     this.schdlIn.toSysId = this.toSysId;
     this.schdlIn.toSysEntityId = event.value;      

    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    this.rows=[];
    this.HeaderColumns=[]
    this.getSetData();
  }
  getSetData(){
    
    // const dialogSpin = this.dialog.open(SpinnerComponent, {
    //   backdropClass: "backdropBackground",
    //   disableClose: true,
    //   panelClass: "spinner-dialog",
    // });
 
    this.serverservice
      .callService("EntityMap_2", this.schdlIn, null, null, null)
      .subscribe(
        (data) => {
          
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
        
        this.rows = data[0];
        this.HeaderColumns = data[1];;

        this.showngxTable = false;
            setTimeout(() => {
              this.rows = data[0];
              this.HeaderColumns = data[1];;
              this.showngxTable = true;
            }, 10);
        
          this.dialogSpin.close();
          
       
        
        
        if (data[2]) {
          this.eMapID = data[2].val;
        }
        
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  saveMapping(){
    console.log(this.rows);

    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
 
    // this.schdl = new EntityMapDO();
    // this.schdl.fromSysId = 1;
    // this.schdl.fromSysEntityId = 21;
    // this.schdl.toSysId = 3;
    // this.schdl.toSysEntityId = 30;

    this.schdlIn.tenantid = 1;
    this.schdlIn.emapid = this.eMapID;

    this.serverservice
      .callService("EntityMap_1", this.schdlIn, this.rows, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          dialogSpin.close();
        },
        (error) => {
          dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
    
  }
  getRowClass = (row:any) => {
    return {
      rowStyles: true,
    };
  };
  // ColumSelectionSales(event,index,tab){
  //   console.log(event);
  //   console.log(index);
  //   //this.rows[index].column  = event.value;
  //  this.rows[index].toAttrid  = event.value;
  //  }

   ColumSelection(event:any, rowIndex:any) {
    let cell = "toAttrid"
   // this.editing[rowIndex + cell] = false;
    this.rows[rowIndex][cell] = event.value;
    this.rows = [...this.rows];
  }

}
