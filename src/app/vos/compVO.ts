export class AuthVO {
  authCode!: String;
  realm!: String;
  switchFlag!: Boolean;
  tmz!: String;
}

export class ChartVO {
  clsIdStr!: String;
  period!: Number;
  cat!: Number;
  dtPartName!: String;
}

export class PrepareUrlVO {
  acctFlag!: Number;
  compRedirect!: Number;
  realmId!: String;
}
