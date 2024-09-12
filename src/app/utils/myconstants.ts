export class AppSettings {
  public static Title = "DancingNumbersOnline";
  public static tmz = "tmz";
  public static myDNRoleTh = 100;
  public static serverurl = "http://127.0.0.1:6666/api/";
  public static ErrorMsg = "Http error occured.Please try again.";
  public static SessionError = "EFR115";
  public static SessionRegistered = "EFR116";
  public static DisconnectError = "EFR550";
  public static DisconnectHeader = "Error";
  public static Chosentype = "1";
  public static type = "type_id";
  public static Totalno = "tot_no";
  public static sheet = "sheet";
  public static iifheader = "Invalid File";
  public static iifbody =
    "The uploaded file is invalid. Please upload valid one.";
  public static fileheader: "Not Readable File";
  public static filebody: "The uploaded file is changed. Please save and close the file and try the upload again.";
  public static date = "MM/DD/YYYY";
  public static dateformat = "MM/dd/yyyy";
  public static dateformat_a = "MM/DD/YY";
  public static dateformat_b = "YYYYMMDD";
  public static dateNF = "mm/dd/yyyy";
  public static importprocess = "... Please start the import process again.";
  public static JobStateCountError =
    "Something is temporarily wrong with your network connection. Import Job is running. You can check the status from Activity Log.";
  public static JobStateError =
    "Network error occurred while trying to get the progress info. Will retry after some time...";
  public static errorMap =
    " column mappings are missing. Please map required columns to proceed.";
  public static HeaderCol = ["one", "two", "three", "four", "five", "six"];
  public static accounterror =
    "Account Type is a required field. please enter Account type to proceed.";
  public static detailerror =
    "Account DetailType is a required field. please enter Account DetailType to proceed.";
  public static finalerror =
    "Please select atleast one Account to create reference";
  public static itemerror =
    "Item Type is a required field. please enter Item type to proceed.";
  public static incomerror =
    "Income Account is a required field. please enter Income Account to proceed.";
  public static finaliterror =
    "Please select atleast one Item to create reference";
  public static pmterror =
    "Payment Type is a required field. please enter payment type to proceed.";
  public static finalpmt =
    "Please select atleast one Payment Method to create reference";
  public static entity =
    "Entity Type is a required field. please enter Entity type to proceed.";
  public static finalentity =
    "Please select atleast one Entity to create reference";
  public static terms =
    "Due days is a required field. please enter Due Days to proceed.";
  public static finalterms =
    "Please select atleast one Terms to create reference";
  public static uploadfile = "Please upload file to proceed";
  public static multifile = "Cannot use multiple files";
  public static allowedExtensions = /(\.xls|\.xlsx)$/i;
  //public static allowedExtensions = /(\.xls|\.xlsx|\.csv)$/i;
  public static fileMB = 1024 * 1024;
  public static invalidheader = "Invalid file";
  public static invalidbody =
    "Please upload xls or xslx file with lesser than 5MB size";
  //public static invalidbodyiif =
  //"Please upload iif file with lesser than 5MB size";
  public static extheader = "Invalid file format";
  public static extbody = "Please upload xls or xslx file";
  //public static extbodyiif = "Please upload iif file";
  public static filesizehead = "File Size exceeded";
  public static filesizebody = "Please upload  file with lesser than 5MB size";
  public static fileRowsizehead = "Number of Rows Exceeded";
  public static fileRowsizebody =
    "Please reduce the number of rows in the sheet to 5000.";

  public static trialMsgHeader = "Success";
  public static trialMsgBody =
    "Successfully subscribed to Trial Plan. The free Trial period is 7 days.";
  public static serviceval = 0;
  public static serviceval_a = 1;
  public static serviceval_b = 2;
  public static serviceval_del = 3;
  public static serviceval_c = 90;
  public static xlsxname = "DancingNumbers.xlsx";
  public static parent = "ParentRef";
  public static item = "ItemType";
  public static category = "category";
  public static code = "code";
  public static realmid = "realmId";
  public static Exportlimit = 50;
  public static PopUpModalLimit = 200;
  public static AccountRef = 5;
  public static EntityRef = 16;
  public static ItemRef = 1;
  public static PMTRef = 9;
  public static TermRef = 14;
  public static skips = ["Yes", "No"];
  public static trues = ["true", "yes", "t", "y"];
  public static falses = ["false", "no", "f", "n"];
  public static AccountClsID = 10;
  public static ItemClsId = 6;
  public static AccountNameAttrRef = "685";
  public static AccountParentAttrRef = "687";
  public static ItemNameAttrRef = "733";
  public static ItemParentAttrRef = "736";

  public static QBTypes = {
    4: "Subtotal Item",
    5: "Payment Item",
    6: "Products and Services",
    7: "Fixed Asset Item",
    8: "Employee payroll",
    9: "Class",
    10: "Chart of Accounts",
    11: "Customer",
    12: "Employee",
    13: "Vendor",
    14: "Department/Location",
    15: "Inventory Assembly",
    16: "Sales Tax Item",
    17: "Group Item",
    18: "Other Name",
    19: "Sales tax Code",
    20: "Payroll Wage Item",
    21: "Invoice",
    26: "Purchase Order",
    27: "Expense",
    28: "Bill",
    29: "Vendor Credit",
    30: "Estimate",
    31: "Sales Order",
    32: "Credit Memo",
    33: "Sales receipt",
    34: "Charge",
    35: "Bill Payment",
    36: "Recieve Payment",
    37: "Credit Card Charge",
    38: "Credit Card Credit",
    39: "Deposit",
    40: "Check",
    41: "Transfer",
    44: "Journal Entry",
    47: "Time Tracking",
    48: "Inventory Adjustment",
    49: "Refund Receipt",
  };
  public static ListTypes = {
    9: "CLASS",
    10: "ACCNT",
    11: "CUST",
    13: "VEND",
    12: "EMP",
    21: "INVOICE",
    41: "TRANSFER",
    //27: "EXPENSE",
    28: "BILL",
    39: "DEPOSIT",
  };
  public static RoleDes = [
    {
      role: 2,
      detail: [
        "Admin has the access to add company/add user to dancing numbers.",
        "Admin can give the approval for the companies added by other roles.",
        "Billing details and subscription is disabled for Admin(Only billing user has the access to Subscription).",
      ],
    },
    {
      role: 3,
      detail: [
        "Able to use Import/Export/delete.",
        "Need the approval of Billing User/Admin for the added companies.",
      ],
    },
    {
      role: 6,
      detail: [
        "Able to use Import/Export.",
        "Delete is blocked.",
        "Need the approval of Billing User/Admin for the usage",
      ],
    },
    {
      role: 5,
      detail: [
        "Able to use only Export .",
        "Import/Delete is blocked.",
        "Need the approval of Billing User/Admin for the usage",
      ],
    },
    {
      role: 4,
      detail: [
        "Able to use only Import.",
        "Export/Delete is blocked.",
        "Need the approval of Billing User/Admin for the usage.",
      ],
    },
  ];
  public static baseurl = "https://app.sandbox.qbo.intuit.com/app/";
  public static urlTypes = {
    6: "",
    10: AppSettings.baseurl + "register?accountId=",
    11: AppSettings.baseurl + "customerdetail?nameId=",
    12: "",
    13: AppSettings.baseurl + "vendordetail?nameId=",
    14: "",
    9: "",
    28: AppSettings.baseurl + "bill?txnId=",
    35: AppSettings.baseurl + "billpayment?txnId=",
    40: AppSettings.baseurl + "check?txnId=",
    33: AppSettings.baseurl + "salesreceipt?txnId=",
    36: AppSettings.baseurl + "recvpayment?txnId=",
    21: AppSettings.baseurl + "invoice?txnId=",
    27: AppSettings.baseurl + "expense?txnId=",
    39: AppSettings.baseurl + "deposit?txnId=",
    44: AppSettings.baseurl + "journal?txnId=",
    41: AppSettings.baseurl + "transfer?txnId=",
    38: AppSettings.baseurl + "creditcardpayment?txnId=",
    32: AppSettings.baseurl + "creditmemo?txnId=",
    30: AppSettings.baseurl + "estimate?txnId=",
    49: AppSettings.baseurl + "refundreceipt?txnId=",
    26: AppSettings.baseurl + "purchaseorder?txnId=",
    47: AppSettings.baseurl + "timeactivity?txnId=",
    29: AppSettings.baseurl + "vendorcredit?txnId=",
  };

  public static specialurlTypes = {
    6: AppSettings.baseurl + "items",
    12: AppSettings.baseurl + "employees",
    14: AppSettings.baseurl + "locations",
    9: AppSettings.baseurl + "class",
  };

  public static QbTypeIdFirst = [39, 40, 44];

  public static AmountType = {
    1: "!=",
    2: "=",
    3: "<=",
    4: "=>",
  };

  public static Year = 0;
  public static Quarter = 1;
  public static Month = 2;
  public static Week = 3;

  public static Customer_chart = 1;
  public static Vendor_Chart = 2;
  public static Other_Chart = 3;
  public static Employee_Chart = 4;
}
