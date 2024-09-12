import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-txn-invoice',
  templateUrl: './txn-invoice.component.html',
  styleUrls: ['./txn-invoice.component.scss']
})
export class TxnInvoiceComponent implements OnInit {
  selectTab:any;
  showngxTable:boolean= false;
  tableColumns:any = [];
  rows = [
    {
      id:1,
      customer: 'Maria Johnson',
      invoice: 1001,
      status: 'Upcoming',
      duedate: '29/05/2024',
      overdue: 0,
      expDate: '',
      amtdue: 30000,
      risk: 'Low Risk',
      colorCode: '#00A368',
      workflow: 'Prompt Payers',
    },
    {
      id:2,
      customer: 'Mark Cho',
      invoice: 1200,
      status: 'Overdue',
      duedate: '12/04/2024',
      overdue: 45,
      expDate: '',
      amtdue: 59000,
      risk: ' Medium risk',
      colorCode: '#FFD300',
      workflow: 'Normal Payers',
    },
    {
      id:3,
      customer: 'Marwal Corp',
      invoice: 4000,
      status: 'Promise to pay',
      duedate: '20/04/2024',
      overdue: 8,
      expDate: '20/06/2024',
      amtdue: 12000,
      risk: ' High risk',
      colorCode: '#FF7400',
      workflow: 'Slow Payers',
    },
    {
      id:4,
      customer: 'Matheson',
      invoice: 3200,
      status: 'Overdue',
      duedate: '20/05/2024',
      overdue: 7,
      expDate: '',
      amtdue: 45000,
      risk: ' Medium risk',
      colorCode: '#FFD300',
      workflow: 'Normal Payers',
    },
    {
      id:5,
      customer: 'Mill Hollow',
      invoice: 4500,
      status: 'Upcoming',
      duedate: '02/06/2024',
      overdue: 0,
      expDate: '',
      amtdue: 74000,
      risk: 'Low Risk',
      colorCode: '#00A368',
      workflow: 'Prompt Payers',
    },
    {
      id:6,
      customer: 'Miller-Cottage',
      invoice: 5000,
      status: 'Promise to pay',
      duedate: '15/04/2024',
      overdue: 42,
      expDate: '20/05/2024',
      amtdue: 85000,
      risk: ' High risk',
      colorCode: '#FF7400',
      workflow: 'Slow Payers',
    },
    {
      id:7,
      customer: 'Moe, Mike',
      invoice: 4100,
      status: 'Overdue',
      duedate: '03/04/2024',
      overdue: 55,
      expDate: '',
      amtdue: 26000,
      risk: ' Medium risk',
      colorCode: '#FFD300',
      workflow: 'Normal Payers',
    },
    {
      id:8,
      customer: 'Mclntyre',
      invoice: 1600,
      status: 'Upcoming',
      duedate: '28/06/2024',
      overdue: 0,
      expDate: '',
      amtdue: 53000,
      risk: 'Low Risk',
      colorCode: '#00A368',
      workflow: 'Prompt Payers',
    },
  ];
 
  selected=[]
  columnMappingData: any = [
    {
      customer: "Customer",
      invoice: " Invoice No",
      status :"Status",
      duedate : "Due Date" ,
      overdue : "Days Overdue",
      expDate : 'Expected Date',
      amtdue : 'Amount Due',
      risk : "Customer Risk",
      workflow :"Work Flow"
    },
  ];
  
  
  displayedColumns:any=[]
  selection!: SelectionModel<any>;
  dataSource!: MatTableDataSource<any>;
  IsTable: any;
  isSelectedRow: any;
  
 date:any
  


 
  constructor(public dialog: MatDialog,) {
   
    
   }
  
  
  ngOnInit(): void {
   this.generateColumns()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

    
  }
 
  onClose(row:any){
    console.log(this.date);

    let indx = this.rows.findIndex(x=>x.id == row.id);
    let dateString =  [(this.date.getDate().toString().padStart(2,"0")), ((this.date.getMonth()+1).toString().padStart(2,"0")), this.date.getFullYear()].join('/');
    this.rows[indx].expDate = dateString.toString();
    
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
              columnDef: key,
              header: element[key],
              width: '125px'
            });
          });
        });
      }
     

      this.tableColumns = arraynew;
      this.displayedColumns.push('checkbox')
      this.tableColumns.forEach((column:any) => {
      this.displayedColumns.push(column.columnDef);
    });

      this.dataSource = new MatTableDataSource<any>(this.rows);
      this.selection = new SelectionModel<any>(true, []);
    
      setTimeout(() => {
        this.tableColumns = [...this.tableColumns];
        this.rows = [...this.rows];
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
    return {};
  }
 
  getCellStyle(row:any ,cell:any) {

    let color:any;
    if(cell == "status" ){
      if (row.status == "Upcoming"){
        color = "#00b33c"
      }
      else if (row.status == "Overdue"){
        color =  "#ff0000"
      }
      else {
        const [day, month, year] = row.expDate.split('/');
        const givenDate = new Date(year +`-`+ month +`-`+ day);
        const todayDate = new Date();

        if(todayDate < givenDate){
          color =  "#ffaa00"
        }
        else{
          color =  "#ff0000"
        }
         
      }
    }
  } 
}
