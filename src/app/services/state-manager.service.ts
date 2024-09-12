import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class StateManagerService {
  public userName = new BehaviorSubject<string | null>("");


  private sidebar = new BehaviorSubject<string>("");
  sidebarChanged = this.sidebar.asObservable();

  private workflowAr= new BehaviorSubject<Array<any>>([]);
  WorkflowArr = this.workflowAr.asObservable();
  
  private selectedName = new BehaviorSubject<string>("");
  SelectedName = this.selectedName.asObservable();

  private selectedId = new BehaviorSubject<string>("");
  SelectedId = this.selectedId.asObservable();

  constructor() {}
  public setSidebarChanged(data: string) {
    this.sidebar.next(data);
  }

  public setWorkflowArr(data:any) {
    this.workflowAr.next(data);
  }

  public setSelectedName(data:any) {
    this.selectedName.next(data);
  }
  public setSelectedId(data:any) {
    this.selectedId.next(data);
  }

  public publishUsername(data: string | null) {
    this.userName.next(data);
  }
}
