
export class SchdlDO  {
    schdlId!:number;
	emapId!:number;
	tenantId!:number;
	days!:number;

}

export class EntityMapDO   {
     emapid!:number;
	 fromSysId!:number;
	 fromSysEntityId!:number;
	 toSysId!:number;
	 toSysEntityId!:number;
	 syncon!:boolean;
	 tenantid!:number;
	 lastSyncTime!:Date;

     days!:number;
     times!: Array<Date>;
}


export class AttrMapDO   {
     amapId!:Number;
	 emapid!:Number;
	 fromAttrId!:Number;
	 toAttrid!:Number;

}
export class SchdlTimeDO {
	schdlId!: Number;
	tenantId!: Number;
	time!: Date;
	entityId!: Number;
	entityName!: String;
  }