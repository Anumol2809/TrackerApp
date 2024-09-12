import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';
import { EntityMapDO, SchdlDO, SchdlTimeDO } from 'src/app/vos/scheduleVO';
import { SpinnerComponent } from '../spinner/spinner.component';
import * as CONSTS from 'src/app/utils/myconstants';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  displayedColumnsUp:any=[];
  displayedColumnsComp:any=[]

  DayAr: any = [
    { id: 0, value: 'Monday', isSelected: 0 },
    { id: 1, value: 'Tuesday', isSelected: 0 },
    { id: 2, value: 'Wednesday', isSelected: 0 },
    { id: 3, value: 'Thursday', isSelected: 0 },
    { id: 4, value: 'Friday', isSelected: 0 },
    { id: 5, value: 'Saturday', isSelected: 0 },
    { id: 6, value: 'Sunday', isSelected: 0 },
  ];

  UpRows =[
    {
      no: 1,
      time: "03:20",
      type :"Invoice",
      status : "Processing" ,
    },
    {
      no: 2,
      time: "09:20",
      type :"Customer",
      status : "Processing" ,
    },
    {
      no: 3,
      time: "12:30",
      type :"Customer",
      status : "Processing" ,
    },
    {
      no: 4,
      time: "15:40",
      type :"Invoice",
      status : "Not started" ,
    },
    {
      no: 5,
      time: "20:10",
      type :"Sales Order",
      status : "Not started" ,
    },
  
   
  ];
  CompRows=[
    {
    no: 1,
    entityNm: "Customer",
    startDt :"01-07-2024 20:40",
    status : "Success" ,
  },
  {
    no:2,
    entityNm: "Invoice",
    startDt :"28-06-2024 05:20",
    status : "Failed" ,
  },
  {
    no: 3,
    entityNm: "Sales Order",
    startDt :"24-06-2024 10:50",
    status : "Failed" ,
  },
  {
    no: 4,
    entityNm: "Invoice",
    startDt :"22-06-2024 06:10",
    status : "Success" ,
  },
  {
    no: 5,
    entityNm: "Customer",
    startDt :"22-06-2024 03:20",
    status : "Failed" ,
  },
  {
    no: 6,
    entityNm: "Sales Order",
    startDt :"20-06-2024 12:40",
    status : "Success" ,
  },
]

  tableColumns:any = [];

 
  columnMappingUp: any = [
    {
      no: "Slno",
      time: " Time",
      type :"Transaction Type",
      status : "Status" ,
    },
  ];
  columnMappingComp: any = [
    {
      no: "Slno",
      entityNm: " Entity Name",
      startDt :"Start Time Date",
      status : "Status" ,
    },
  ];

  connectedSys: any;
  connectedSysId: any;
  settTabs: any=[];
  tabIndex: number=0;
  fromSysId!: number;
  toSysId!: number;
  schdl: any;
  typeAr: any=[   ];
  dialogSpin: any;
  errorMsgFlag: boolean=false;
  errorMsg: any;
  SchdlAr: any;
  SchdlSett: any=[];
  selectedEntityId: any;
  AllSelected: boolean=false;
  TimeAr: any = [];
  index: any = 0;
  TimeArNew: any=[];
  showEdit: boolean=false;
  addNewSet: boolean=false;
  showAdd: boolean=false;
  editingRow: any;
  submitted: boolean=false;
  selLength: any;
  addInd: any;
  constructor(private state: StateManagerService,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,) { 
      
     


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
  

   this.settTabs =[ "QuickBooks to " + this.connectedSys ,this.connectedSys +" to QuickBooks"]
    }

  ngOnInit(): void {
    this.changeTabSett();
  }
  changeTabSett(){
    if(this.tabIndex  == 0){
      this.fromSysId = 1;
      this.toSysId = this.connectedSysId;
  
     }
     else{
      this.fromSysId = this.connectedSysId;
      this.toSysId = 1;
      
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
          this.dialogSpin.close();
          this.typeAr = data[0];
          console.log(this.typeAr);
          this.getData();
         // this.getData();
          
          //  this.entityLists = data[0];
          //  this.salesType = data[1];
          //  this.selectedValue = this.salesType[0].entityid;
          
          // this.schdlIn = new EntityMapDO();
          // this.schdlIn.fromSysId = this.fromSysId;
          // this.schdlIn.fromSysEntityId = this.entityLists[0].entityid;
          // this.schdlIn.toSysId = this.toSysId;
          // this.schdlIn.toSysEntityId = this.salesType[0].entityid;
          // this.getSetData();
          

        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  getData() {
    // const dialogSpin = this.dialog.open(SpinnerComponent, {
    //   backdropClass: 'backdropBackground',
    //   disableClose: true,
    //   panelClass: 'spinner-dialog',
    // });

    let schdl = new EntityMapDO();
    schdl.fromSysId = this.fromSysId;
   schdl.toSysId = this.toSysId;

    let rstKey = new SchdlTimeDO();
    rstKey.entityName = '';
    rstKey.schdlId = 0;

    this.serverservice
      .callService('Schdl_03', schdl, rstKey, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          this.SchdlAr = data;
          this.SchdlSett = JSON.parse(JSON.stringify(this.SchdlAr));
          this.dialogSpin.close();

         
          this.SchdlSett.forEach((element:any,indVal:any) => {
             
                let daysVal = (element.days >>> 0).toString(2).padStart(7, "0").split("");
                let ind = daysVal.length - 1;
                let daysValue:any=[];
              
              daysVal.forEach((element: any) => {
                if (element == 1) {
                  daysValue.push(this.DayAr[ind].value);
                }
                ind--;
              });
             
              this.SchdlSett[indVal].days = daysValue.reverse();

           
              let TimeArr:any=[];
              let indx =0;
              let timeArray = element.times;
              timeArray.forEach((element:any) => {
                let dateFrmt = new Date(element);
                let hours = dateFrmt.getUTCHours().toString();
                let minutes = dateFrmt.getUTCMinutes().toString();
                
                let timeVal  =hours.padStart(2, '0') + ":" + minutes.padStart(2, '0');
                TimeArr.push({ id: indx, time: timeVal });
                indx++;
              });
              this.SchdlSett[indVal].times = TimeArr;
          
              }); 
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  checkCheckType(event:any) {
    var evtValue = event.target.value;
    console.log(evtValue);
    const { checked } = event.target;
    console.log(checked);



    if (checked) {
      
      this.selectedEntityId =  evtValue;
      
    } 
  }
  checkCheck(event:any) {
    var evtValue = event.target.value;
    const { checked } = event.target;
    console.log(checked);

    if (checked) {
      this.DayAr.find((x:any) => x.id == evtValue).isSelected = 1;
    } else if (!checked) {
      this.DayAr.find((x:any) => x.id == evtValue).isSelected = 0;
    }
    this.selLength = this.DayAr.filter((x:any) => x.isSelected == 1).length;
    //var selCount = this.DayAr.filter((x) => x.isSelected == 1).length;
    if (this.selLength == this.DayAr.length) {
      this.AllSelected = true;
    } else {
      this.AllSelected = false;
    }
  }
  checkCheckAll(event:any) {
    const { checked } = event.target;
    console.log(checked);



    if (checked) {
      this.DayAr.forEach((element:any) => {
        element.isSelected = 1;
      });
      this.AllSelected = true;
    } else {
      this.DayAr.forEach((element:any) => {
        element.isSelected = 0;
      });
      this.AllSelected = false;
    }

    this.selLength = this.DayAr.filter((x:any) => x.isSelected == 1).length;
  }
  timeChange(event:any ,id:any) {
    console.log(event);
    console.log(this.SchdlSett[id]);
    this.TimeAr.push({ id: this.addInd, time: event });
    this.addInd++
   
   console.log(this.TimeAr);

  }
  timeChangeadd(event:any){
    console.log(event);
   
    this.TimeArNew.push({ id: this.index, time: event });
    this.index++;
    console.log(this.TimeArNew);
    
  }
  removeTimeNew(dt:any){
    console.log(dt.id);
    let index = this.TimeArNew.findIndex((x:any)=> x.id == dt.id)
    this.TimeArNew.splice(index ,1)
  }
  removeTime(dt:any ,id:any) {
    console.log(dt);
    //console.log(this.SchdlSett[id]);
    //var ind = this.editingRow.times.indexOf(dt);
    //this.editingRow.times.splice(ind, 1);
    let index = this.TimeAr.findIndex((x:any)=> x.id == dt.id)
    this.TimeAr.splice(index ,1)

   console.log(this.TimeAr);

   console.log(this.SchdlSett);
   
  }

  addNewSave() {
    //   let types =[];
    //   let typeNms =[];
    //   this.typeAr.forEach((element) => {
    //    if (element.isSelect) {
    //      //selectDays[selectDays.length - 1 - element.id] = 1;
    //      typeNms.push(element.value)
    //      types.push(element.id)
    //    }
    //  });
    this.submitted = true;
    this.selLength = this.DayAr.filter((x:any) => x.isSelected == 1).length;

    if(this.selectedEntityId == null || this.TimeArNew.length == 0 || this.selLength==0){
      return
    }

    let dayString = [];
    let selectDays = [0, 0, 0, 0, 0, 0, 0];
    this.DayAr.forEach((element:any) => {
      if (element.isSelected) {
        selectDays[selectDays.length - 1 - element.id] = 1;

        dayString.push(element.value);
      }
    });
    let daysSel = parseInt(selectDays.join(''), 2).toString(10);
    console.log(daysSel);

    let selectTime:any = [];
    this.TimeArNew.forEach((element:any) => {
      let dt = element.time.split(':');

      var date = new Date();
      var Today = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        dt[0],
        dt[1],
        0
      );

      var localISOTime = new Date(
        Today.getTime() - Today.getTimezoneOffset() * 60000
      ).toISOString();
      selectTime.push(localISOTime);
    });

    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });

    let schdl = new SchdlDO();
    schdl.tenantId = 1;
    schdl.days = +daysSel;

    let entity = new EntityMapDO();
    entity.fromSysEntityId = this.selectedEntityId;
    entity.times = selectTime;
    entity.fromSysId = 1;
    entity.toSysId = 3;
    entity.days = +daysSel;
    console.log(schdl);
    console.log(entity);

    this.serverservice
      .callService('Schdl_01', schdl, entity, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          //  this.settingsAr.push(newAr)
          //console.log(this.settingsAr);

          this.showAdd = false;
          this.TimeArNew =[];
         this.getData();
          this.addNewSet = false;
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  cancelClick() {
    this.showAdd = false;
    this.addNewSet = false;
  }
  deleteSchdl(item:any, id:any) {
    console.log(item);
    // this.SchdlSett.splice(id ,1)
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });
    let schdl = new SchdlDO();
    schdl.schdlId = item.schdlId;
    this.serverservice
      .callService('Schdl_05', schdl, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          this.getData();
        },
        (error) => {
          this.dialogSpin.close();
          console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  cancelEdit() {
    this.showEdit = false;
  }
  addNew() {
    this.showAdd = true;
    this.submitted = false;

    this.addNewSet = true;
    this.AllSelected = false;
    
    this.DayAr.forEach((element:any) => {
      element.isSelected = 0;
    });
    this.TimeArNew=[];
    this.selectedEntityId=null;
 
    // this.typeAr.forEach((element) => {
    //   element.isSelect = 0;
    // });
  }

  editTab(val:any) {
    this.submitted = false;
    console.log(val);

   
    this.editingRow = val;
    this.TimeAr = JSON.parse(JSON.stringify(this.editingRow.times));
    this.addInd  =  this.TimeAr.length

    this.showEdit = true;
    this.DayAr.forEach((element:any) => {
      if((val.days).includes(element.value)){
        element.isSelected = 1
      }
      else{
        element.isSelected = 0
      }

    });
    if (
      this.DayAr.filter((x:any) => x.isSelected == 1).length ==
      this.DayAr.length
    ) {
      this.AllSelected = true;
    } else {
      this.AllSelected = false;
    }
    console.log(this.DayAr);
    


  }
 

  saveTab(val:any) {

    this.submitted = true;
    this.selLength = this.DayAr.filter((x:any) => x.isSelected == 1).length;

    if(this.TimeAr.length == 0 || this.selLength==0){
      return
    }

    console.log(val);
    let selectDays = [0, 0, 0, 0, 0, 0, 0];
    this.DayAr.forEach((element:any) => {
      if (element.isSelected) {
        selectDays[selectDays.length - 1 - element.id] = 1;
      }
    });
    let daysSel = parseInt(selectDays.join(''), 2).toString(10);
    console.log(daysSel);
    let selectTime:any = [];
    this.TimeAr.forEach((element:any) => {
      let dt = element.time.split(':');
      var date = new Date();
      var Today = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        dt[0],
        dt[1],
        0
      );
      var localISOTime = new Date(
        Today.getTime() - Today.getTimezoneOffset() * 60000
      ).toISOString();
      selectTime.push(localISOTime);
    });
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });
    let schdl = new SchdlDO();
    schdl.tenantId = 1;
    schdl.days = +daysSel;
    schdl.schdlId = val.schdlId;
    let entity = new EntityMapDO();
    // if (this.selectedEntityId) {
    //   entity.fromSysEntityId = this.selectedEntityId;
    // } else {
    entity.fromSysEntityId = this.editingRow.fromSysEntityId;
    //}
    entity.times = selectTime;
    console.log(schdl);
    console.log(entity);
    this.serverservice
      .callService('Schdl_04', schdl, entity, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          this.showEdit = false;
          this.getData();
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
    if(event.index == 1){
      this.generateColumns()
    }
    else if(event.index == 2){
      this.generateColumnsComp()
    }
  }
  generateColumnsComp() {
    this.displayedColumnsComp=[];
    if (this.CompRows.length > 0) {
      let keys = Object.keys(this.columnMappingComp[0]);
      // let values =Object.values(this.rows[0])
      //console.log(this.rows);

      let arraynew: any = [];

      if (keys.length > 0) {
        this.columnMappingComp.forEach(function (element: any) {
          keys.forEach((key) => {
            arraynew.push({
              columnDef: key,
              header: element[key],
              width: '125px'
            });
          });
        });
      }
     

      this.tableColumns = arraynew;
      this.tableColumns.forEach((column:any) => {
      this.displayedColumnsComp.push(column.columnDef);
    });

    } 
  }
  generateColumns() {
    this.displayedColumnsUp=[];
    if (this.UpRows.length > 0) {
      let keys = Object.keys(this.columnMappingUp[0]);
      // let values =Object.values(this.rows[0])
      //console.log(this.rows);

      let arraynew: any = [];

      if (keys.length > 0) {
        this.columnMappingUp.forEach(function (element: any) {
          keys.forEach((key) => {
            arraynew.push({
              columnDef: key,
              header: element[key],
              width: '125px'
            });
          });
        });
      }
     

      this.tableColumns = arraynew;
      this.tableColumns.forEach((column:any) => {
      this.displayedColumnsUp.push(column.columnDef);
    });

    } 
  }

  getCellStyle(row:any ,cell:any) {

    let color :any;
    if(cell == "status" ){
      if (row.status == "Success"  ||row.status == "Completed"){
        color ="#00b33c"
      }
      else if (row.status == "Failed"){
        color = "#ff0000"
      }
      else if (row.status == "Processing"){
        color = "#ffaa00"
     }
     return color;
    }
    
  } 
}