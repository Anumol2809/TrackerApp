import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectWorkFlowComponent } from '../../select-work-flow/select-work-flow.component';

@Component({
  selector: 'app-txn-customer',
  templateUrl: './txn-customer.component.html',
  styleUrls: ['./txn-customer.component.scss']
})
export class TxnCustomerComponent implements OnInit {

 
  selectTab:any;
  showngxTable:boolean = false;
  tableColumns:any = [];
 
  rowsCust = [
    {
      id: 1,
      customer: 'Triple J',
      invoice: ' 3',
      balancedue: 2000,
      overdue: 0,
      current: 2000,
      //aging : "23",
      risk: 'Low Risk',
      colorCode: '#00A368',
      '1-30': 0,
      '>30': 0,
      '>60': 0,
      '>90': 0,
      workflow: 'Prompt Payers',
    },
    {
      id: 2,
      customer: 'Wangerin William',
      invoice: '7',
      balancedue: 4000,
      overdue: 1600,
      current: 2400,
      //aging : "23",
      risk: ' Medium risk',
      colorCode: '#FFD300',
      '1-30': 0,
      '>30': 1600,
      '>60': 0,
      '>90': 0,
      workflow: 'Normal Payers',
    },
    {
      id: 3,
      customer: 'Woodland Acres',
      invoice: ' 8',
      balancedue: 5000,
      overdue: 4000,
      current: 1000,
      // aging : "23",
      risk: 'High Risk',
      colorCode: '#FF7400',
      '1-30': 400,
      '>30': 1200,
      '>60': 1800,
      '>90': 600,
      workflow: '',
    },
    {
      id: 4,
      customer: 'Marwal Corp',
      invoice: '9',
      balancedue: 2000,
      overdue: 1600,
      current: 400,
      //aging : "23",
      risk: 'High Risk',
      colorCode: '#FF7400',
      '1-30': 300,
      '>30': 500,
      '>60': 400,
      '>90': 400,
      workflow: '',
    },
    {
      id: 5,
      customer: 'Mark Cho',
      invoice: '5',
      balancedue: 6500,
      overdue: 2600,
      current: 3900,
      //aging : "23",
      risk: ' Medium risk',
      colorCode: '#FFD300',
      '1-30': 0,
      '>30': 2600,
      '>60': 0,
      '>90': 0,
      workflow: 'Normal Payers',
    },
    {
      id: 6,
      customer: 'Mill Hollow',
      invoice: '6',
      balancedue: 4550,
      overdue: 3640,
      current: 910,
      //aging : "23",
      risk: ' High risk',
      colorCode: '#FF7400',
      '1-30': 1600,
      '>30': 1040,
      '>60': 400,
      '>90': 600,
      workflow: 'Slow Payers',
    },
    {
      id: 7,
      customer: 'Moe,Mike',
      invoice: '3',
      balancedue: 1200,
      overdue: 0,
      current: 1200,
      //aging : "23",
      risk: 'Low Risk',
      colorCode: '#00A368',
      '1-30': 0,
      '>30': 0,
      '>60': 0,
      '>90': 0,
      workflow: 'Prompt Payers',
    },
    {
      id: 8,
      customer: 'Miller-Cottage',
      invoice: '6',
      balancedue: 800,
      overdue: 640,
      current: 160,
      //aging : "23",
      risk: 'High Risk',
      colorCode: '#FF7400',
      '1-30': 200,
      '>30': 140,
      '>60': 200,
      '>90': 100,
      workflow: 'Slow Payers',
    },
  ];
  selected=[]
 
   columnMappingCust: any = [
    {
      customer: "Customer Name",
      invoice: " Invoice No",
      balancedue :"Balance Due",
      overdue : " Overdue Balance",
      current : 'Current',
      //aging : "Aging",
      '1-30' : ' Aging 1-30',
      '>30' : 'Aging >30',
      '>60' : 'Aging >60',
      '>90' : 'Aging >90',
      risk :"Customer Risk",
      workflow :"Work Flow",
    },
  ];
  
  displayedColumns:any=[]
  selection!: SelectionModel<any>;
  dataSource!: MatTableDataSource<any>;
 
  isSelectedRow: any;
  
 date:any
  


 
  constructor(public dialog: MatDialog,) {
   
    
   }
  
  
  ngOnInit(): void {
   this.generateColumnsCust()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

    
  }

  addWorkFlow(element:any ,col:any){
    let dialogWrk = this.dialog.open(SelectWorkFlowComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      data: col,
      panelClass: "select-dialog",
    });
    dialogWrk.componentInstance.newWorkEvent.subscribe((result) => {
    
    let indx = this.rowsCust.findIndex(x=>x.id == element.id)
    this.rowsCust[indx].workflow = result;
    if(result == "Slow Payers"){
      this.rowsCust[indx].colorCode = "#ff7400";
      this.rowsCust[indx].risk = "High Risk";
    }
    else if(result == "Prompt Payers"){
      this.rowsCust[indx].colorCode = "#00A368";
      this.rowsCust[indx].risk = "Low Risk";
    }
    else{
      this.rowsCust[indx].colorCode = "#FFD300";
      this.rowsCust[indx].risk = "Medium Risk";
    }

     this.displayedColumns =[]
    this.generateColumnsCust();
    })
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
 
  getRowClass = (row:any) => {
    return {
      rowStyles: true,
    };
  };
  generateColumnsCust() {
    if (this.rowsCust.length > 0) {
      let keys = Object.keys(this.columnMappingCust[0]);
      // let values =Object.values(this.rows[0])
      //console.log(this.rows);

      let arraynew: any = [];

      if (keys.length > 0) {
        this.columnMappingCust.forEach(function (element: any) {
          keys.forEach((key) => {
            if(key == "workflow"){
              arraynew.push({
                columnDef: key,
                header: element[key],
                width: '147px'
              });
            }
            else{
              arraynew.push({
                columnDef: key,
                header: element[key],
                width: '128px'
              });
            }
           
          });
        });
      }
   

      console.log(arraynew);
      
      this.tableColumns = arraynew;
      this.displayedColumns.push('radio');
      
      this.tableColumns.forEach((column:any) => {
      this.displayedColumns.push(column.columnDef);
    });
  

      this.dataSource = new MatTableDataSource<any>(this.rowsCust);
      this.selection = new SelectionModel<any>(false, []);
    
      setTimeout(() => {
        this.tableColumns = [...this.tableColumns];
        this.rowsCust = [...this.rowsCust];
        this.showngxTable = true;

        //   this.state.setExportRows(this.rows);
      }, 10);

      //this.state.setSearchClick(false);
    } 
  }
 

  
  selectCheck(evt:any){
      if(this.selection.selected.length >0){
      
        this.isSelectedRow = true
      }
    
    
  }
  onCancel() {
    this.isSelectedRow = false
  }
  getRowStyle(row:any) {
   
    if (this.selection.selected.includes(row)) {
      return true
    } else {
      return false; // Return empty object if no style needs to be applied
    }
  }
  getCellStyleCust(row:any ,cell:any) {
    if(cell == "risk" ){
      let styles = {
        'background-color': row.colorCode+"30",
        'color': row.colorCode
      };
      
      return styles
      
    }
    return {}
  }

}
