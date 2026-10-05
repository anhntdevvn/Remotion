import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {StagePuppet,StagePuppetProps} from './StagePuppet';
import {clamp,FONT,C} from '../types';

export type Role='gojong'|'sunjong'|'yiun'|'yiun-old'|'child'|'bangja'|'uichin'|'rhee'|'kim'|'japan'|'us'|'soviet'|'civilian'|'clerk';
const CAST:Record<Role,StagePuppetProps>={
 gojong:{outfit:'korean-emperor',hat:'royal-black',moustache:true,expression:'concerned'},
 sunjong:{outfit:'korean-emperor',hat:'royal-black',glasses:true,hair:'crop'},
 child:{outfit:'korean-prince',hair:'crop',expression:'concerned'},
 yiun:{outfit:'japanese-officer',hat:'officer-khaki',hair:'crop',expression:'concerned'},
 'yiun-old':{outfit:'light-suit',hair:'silver',hairColor:'#82796A',expression:'concerned'},
 bangja:{outfit:'korean-hanbok',hair:'bun',skin:'#E2B797'},
 uichin:{outfit:'dark-suit',hair:'slick',moustache:true,expression:'concerned'},
 rhee:{outfit:'dark-suit',hair:'silver',hairColor:'#B4ADA1',glasses:true,skin:'#D7AB8D'},
 kim:{outfit:'prc-officer',hair:'slick',expression:'stern'},
 japan:{outfit:'japanese-officer',hat:'officer-khaki',expression:'stern'},
 us:{outfit:'us-officer',hat:'us-cap',skin:'#DBB28F',hairColor:'#70604B'},
 soviet:{outfit:'roc-soldier',hat:'soviet-cap',skin:'#E1B693',hairColor:'#82714E'},
 civilian:{outfit:'civilian',hair:'waves'},
 clerk:{outfit:'light-suit',hair:'slick',glasses:true},
};
type Props=StagePuppetProps & {role?:Role;x:number;y?:number;height?:number;travel?:number;start?:number;end?:number;name?:string};
export const Actor:React.FC<Props>=({role='civilian',x,y=220,height=710,travel=0,start=0,end=70,name,...rig})=>{
 const f=useCurrentFrame();
 return <div style={{position:'absolute',left:x-height*300/560/2+interpolate(f,[start,end],[0,travel],clamp),top:y,width:height*300/560,height}}>
  <StagePuppet {...CAST[role]} {...rig} walking={travel!==0&&f>=start&&f<end} motionOffset={rig.motionOffset??1} style={{width:'100%',height:'100%'}}/>
  {name&&<div style={{position:'absolute',top:height*.87,left:-30,right:-30,textAlign:'center',fontFamily:FONT,fontSize:34,fontWeight:800,color:C.cream,background:'#13232AE8',padding:'6px 12px',borderBottom:`3px solid ${C.gold}`}}>{name}</div>}
 </div>;
};
