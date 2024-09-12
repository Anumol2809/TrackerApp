import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { StateManagerService } from 'src/app/services/state-manager.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import * as CONSTS from "src/app/utils/myconstants";
import { ActivityRSTKeyVO, ActivitySearchVO } from 'src/app/vos/activityVO';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EntityMapDO } from 'src/app/vos/scheduleVO';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';

import { MatDatepicker } from '@angular/material/datepicker';
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  selectedInt!: string;
  connectedSys: any;
  connectedSysId: any;
  settTabs: any=[];
  tabIndex: number=0;

  rows :any= [];
  tableColumns:any = [];
  columnMappingData: any = [
    {
      
      rundate : "Date and Time" ,
      job:"Job",
      records:"Records",
     
      statusResponse :"Status",
      
    },
  ];
  showngxTable:boolean= false;
  dialogSpin: any;
  errorMsgFlag!: boolean;
  errorMsg: any;
  fromSysId!: number;
  toSysId!: number;

  filterForm :FormGroup;
  
  serachVal:any
  addvalue = 1;
  pagenumber: any = 0;
  datalength: any;
  startcount: any = 1;
  endcount: any;
  totalCount: any = 0;
  rstKeyArray: Array<ActivityRSTKeyVO> = [];
  activitySrch!: ActivitySearchVO;
  activityRst!: ActivityRSTKeyVO;
  nextOrPrev: boolean =true;
  addFilters!: boolean;
  typesAr:any=[]
  schdl: any;
  dateTimeControl = new FormControl();
 statusAr :any=[{
  entityId:2,
  status :"Started"
 },
 {
  entityId:1,
  status :"Pending"
 },
 {
  entityId:4,
  status :"Completed"
 },
 {
  entityId:3,
  status :"Failed"
 }
]

  date!: Date;
  time!: string;
  combinedDateTime!: string;

  constructor(private state: StateManagerService,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,private fb:FormBuilder) {

      
      this.filterForm = this.fb.group({
        toRunDate: [""],
        fromRunDate: [""],
        type:[""],
        status:[""],
      });

      this.state.sidebarChanged.subscribe((data) => {
       
         if(data){
          this.showngxTable = false;
          if(this.rows.length > 0){
            setTimeout(() => (this.showngxTable = true),120);
          }
           
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
  

   this.settTabs =[ "QuickBooks to " + this.connectedSys ,this.connectedSys +" to QuickBooks"]
   }


   filterRows:any=[]
 


  ngOnInit(): void {
  
   this.changeTabSett();

  }
  cancelFilter(){
    this.addFilters = false;
  }
  saveFilter(){
    console.log(this.filterForm.value);
    this.serachId();
    this.filterRows=[];
    this.addFilters = false;

   
    if(this.filterForm.value.toRunDate && this.filterForm.value.fromRunDate){

      let fromdate = this.convertStr(this.filterForm.value.fromRunDate)
      let todate = this.convertStr(this.filterForm.value.toRunDate)
      
      
      this.filterRows.push({col: 'Date' , value1: fromdate , value2 :todate, label:'tofromRunDate'})
    }
   
    if(this.filterForm.value.type >0 ){
      let type = this.typesAr.find((x:any)=>x.entityid == this.filterForm.value.type).label
     
      this.filterRows.push({col: 'Type' , value: type,label:'type'})
    }
    if(this.filterForm.value.status >0 ){
      let status = this.statusAr.find((x:any)=>x.entityId == this.filterForm.value.status).status
      this.filterRows.push({col: 'Status' , value: status ,label:'status'})
    }

    console.log(this.filterRows);
    


  }
  removeFilter(rem:any){
    console.log(rem.value);
    console.log(this.filterForm.get(rem.label)?.value); 
    
    let index = this.filterRows.findIndex((x:any)=> x.label == rem.label);

    this.filterRows.splice(index,1);
    
    if(rem.col == 'Date'){
      this.filterForm.patchValue({
        fromRunDate: "",
        toRunDate :""
      });
    }
    else{
      this.filterForm.patchValue({
        [rem.label]: ""
      });
    }
    this.serachId();
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

      
    this.activitySrch = new ActivitySearchVO();
    this.activitySrch.fromSysId = this.fromSysId
    this.activitySrch.toSysId = this.toSysId;
    this.activitySrch.fromRundate = null;
    this.activitySrch.toRundate = null;
    this.activitySrch.jobId = 0;
    this.activitySrch.status = 0;
    this.activitySrch.entityId = 0;

    this.activityRst = new ActivityRSTKeyVO();
     this.activityRst.rundate = null;
     this.activityRst.jobId =0;

    this.rstKeyArray[0] = this.activityRst;
     this.pagenumber =0;
    
    this.schdl = new EntityMapDO();
    this.schdl.fromSysId = this.fromSysId;
    this.schdl.toSysId = this.toSysId;
     this.getSetData()
  }
  tabClick(event:any){
    this.tabIndex = event.index;
    this.changeTabSett();
  }

  serachId(){
    this.activitySrch = new ActivitySearchVO();
    this.activitySrch.fromSysId = this.fromSysId
    this.activitySrch.toSysId = this.toSysId;
 
    this.activitySrch.fromRundate = this.convertDate(this.filterForm.value.fromRunDate);
 
   this.activitySrch.toRundate = this.convertDate(this.filterForm.value.toRunDate);
     

    this.activitySrch.jobId = this.serachVal;
    this.activitySrch.status = this.filterForm.value.status;
    this.activitySrch.entityId = this.filterForm.value.type;

    this.nextOrPrev = false;
    // this.activityRst = new ActivityRSTKeyVO();
    //  this.activityRst.rundate = null;
    //  this.activityRst.jobId =0;

    // this.rstKeyArray[0] = this.activityRst;
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
     this.getEntityData()
  }
  getSetData() {
   
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
          
          
           this.typesAr = data[0];
           this.getEntityData();
          

        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  getEntityData() {
   
    // this.dialogSpin = this.dialog.open(SpinnerComponent, {
    //   backdropClass: "backdropBackground",
    //   disableClose: true,
    //   panelClass: "spinner-dialog",
    // });
   

    this.serverservice
      .callService("SyncJob_1", this.activitySrch,  this.activityRst, null, null)
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
          
          this.rows = data;
         
          data.forEach((element:any) => {
            const date = new Date(element.rundate);

            const formattedDate = [
              date.getFullYear(),
              String(date.getMonth() + 1).padStart(2, '0'),
              String(date.getDate()).padStart(2, '0')
            ].join('/') + ' ' + [
              String(date.getHours()).padStart(2, '0'),
              String(date.getMinutes()).padStart(2, '0'),
              String(date.getSeconds()).padStart(2, '0')
            ].join(':');


            element.rundate = formattedDate;
            

           // element.job = {"JobId" : element.jobId , "Type":element.type};

          });

          this.generateColumns();

          
          this.totalCount = 50;
          let tabledata = data;

          if(this.nextOrPrev){
            this.pagenumber = this.pagenumber + this.addvalue;
          }
         
          this.datalength = data.length;
          console.log(this.datalength);
          console.log(this.addvalue);

          if (this.datalength == 0 && this.pagenumber > 1) {
            this.startcount = 0;
            this.endcount = 0;
          } else {
            this.startcount = (this.pagenumber - 1) * 25 + 1;
            this.endcount = (this.pagenumber - 1) * 25 + this.datalength;
            console.log(this.startcount);
            console.log(this.endcount);
          }

          if (tabledata.length > 0) {
            let endRst: any = {
              rundate: tabledata[this.datalength - 1].rundate,
              jobId: tabledata[this.datalength - 1].jobId,
            };

            this.rstKeyArray[this.pagenumber] = endRst;
          }
          this.nextOrPrev = true;
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
convertDate(dateString:any){
  if(dateString){
    console.log(dateString);
    
    const date = new Date(dateString);

    // Adjust to UTC by subtracting the local timezone offset
    const utcYear = date.getFullYear();
    const utcMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Month needs to be adjusted by adding 1
    const utcDay = date.getDate().toString().padStart(2, '0');
   console.log(date.getDate());
   
  
    const isoString =
    utcYear + '-' +
    utcMonth + '-' +
    utcDay + 'T' + '00:00:00Z'
 
    console.log(isoString)

    
    return new Date(isoString);
  }
  else{
    return null;
  }
 
}
convertStr(datestring:any){
  
  
  const dateObject = new Date(datestring);

const year = dateObject.getFullYear();
const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
const day = dateObject.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

return formattedDate
}
  addFilter(){
    this.addFilters = true;
  }
  nextDisabledStatus() {
    if (
      this.datalength != 25 ||
      (this.totalCount % 25 == 0 && this.totalCount / 25 == this.pagenumber)
    ) {
      return true;
    }
    return false;
  }
  next() {
    this.addvalue = 1;
   

    console.log(this.rstKeyArray);
    
    this.activityRst = new ActivityRSTKeyVO();
     this.activityRst.rundate = this.rstKeyArray[this.pagenumber].rundate;
     this.activityRst.jobId =this.rstKeyArray[this.pagenumber].jobId;

   
     this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    this.getEntityData();
  }
  previous() {
    this.addvalue = -1;

  
    //console.log(this.rstKeyArray);
    this.activityRst = new ActivityRSTKeyVO();
     this.activityRst.rundate = this.rstKeyArray[this.pagenumber-2].rundate;
     this.activityRst.jobId =this.rstKeyArray[this.pagenumber-2].jobId;

     this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
     this.getEntityData();

    //   this.dialogSpin = this.dialog.open(SpinnerComponent, {
    //    backdropClass: "backdropBackground",
    //    disableClose: true,
    //    panelClass: "spinner-dialog",
    //  });
    //this.getTableData();
  }



  generateColumns() {
    
    if (this.rows.length > 0) {
      let keys = Object.keys(this.columnMappingData[0]);
      // let values =Object.values(this.rows[0])
      //console.log(this.rows);

      let arraynew: any = [];

      if (keys.length > 0) {
        this.columnMappingData.forEach(function (element: any) {
          keys.forEach((key) => {
            arraynew.push({
              prop:key ,
              name: element[key],
              width :'120'
            });
          });
          arraynew.push({
            prop:'detail' ,
            name: "Detail",
            width :'120'
          });
        });
      }
     
console.log(arraynew);

      this.tableColumns = arraynew;
      setTimeout(() => {
        this.tableColumns = [...this.tableColumns];
        this.rows = [...this.rows];
        this.showngxTable = true;

        //   this.state.setExportRows(this.rows);
      }, 10);
     
      //this.state.setSearchClick(false);
    } 
    this.dialogSpin.close();
  }


  getCellStyle(row:any ,cell:any) {

    let color:any;
    if(cell == "statusResponse" ){
      if (row.status == 2 ){
        color= "#e6cc00"
     }
      if ( row.status == 4){
        color= "#00b33c"
      }
      else if (row.status == 1){
        color= "#ff781f"
     }
      else if (row.status == 3){
        color= "#ff0000"
      }
     return color;
    }
    
  
  }
}
