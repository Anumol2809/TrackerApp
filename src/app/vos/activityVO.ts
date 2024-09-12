export class ActivitySearchVO {
	
	  fromSysId!:Number;
	
	  toSysId!:Number;
	
	  direction!:Number;
	
	  entityId!:Number;

	  fromRundate!: Date | null;
	
	  toRundate!: Date | null;

	  jobId!:Number;
	
	  status!:Number;
	
}
	
export class ActivityRSTKeyVO  {
      rundate!: Date | null;

	  jobId!:Number;
}