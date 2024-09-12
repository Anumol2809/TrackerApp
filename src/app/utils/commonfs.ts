import { IfStmt } from "@angular/compiler";
import * as moment from "moment";

export function buildReqJson(
  id: String,
  inp0: Object | null,
  inp1: Object | null,
  inp2: Object | null,
  inp3: Object | null,
  nounce: string
): any {
  var reqObjs = new Object();
  var inpObjs: any = new Array();

  const session = JSON.parse(localStorage.getItem("session.key")|| '{}');
  const userid = JSON.parse(localStorage.getItem("session.userid")|| '{}');

  if (inp0 != null) {
    inpObjs[0] = inp0;
  }
  if (inp1 != null) {
    inpObjs[1] = inp1;
  }
  if (inp2 != null) {
    inpObjs[2] = inp2;
  }
  if (inp3 != null) {
    inpObjs[3] = inp3;
  }

  if (nounce) {
    reqObjs = {
      id: id,
      userid: userid || "",
      sessionKey: session || "",
      inputObjs: JSON.stringify(inpObjs, replacer),
      nounce: nounce,
    };
  } else {
    reqObjs = {
      id: id,
      userid: userid || "",
      sessionKey: session || "",
      inputObjs: JSON.stringify(inpObjs, replacer),
    };
  }

  return reqObjs;
}

function replacer(key:any, value:any) {
  if (typeof value === "boolean") {
    return String(value);
  }

  return value;
}
