import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Actor} from './components/Actor';
import {Set,Throne} from './components/Set';
import {C,FONT} from './types';
import {ChannelWatermark} from '../../channel-branding/ChannelWatermark';

export const KoreaThumbnail:React.FC=()=> <AbsoluteFill style={{fontFamily:FONT,background:C.ink,overflow:'hidden'}}>
 <Set/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#0C1B23DD 0%,#0C1B2377 52%,#0C1B2311 100%)'}}/>
 <Throne x={1455} y={130} width={650}/>
 <Actor role="gojong" x={410} y={308} height={850} pose="explain-right" expression="concerned"/>
 <div style={{position:'absolute',left:77,top:55,color:C.cream,fontSize:130,fontWeight:900,letterSpacing:-7,textShadow:'0 5px 0 #0A151A'}}>해방됐는데</div>
 <div style={{position:'absolute',left:795,top:742,color:C.cream,fontSize:116,fontWeight:900,letterSpacing:-6,lineHeight:1.08,textShadow:'0 6px 0 #0A151A'}}>왕정은 왜<br/><span style={{color:'#F2BF61'}}>없을까?</span></div>
 <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}}><path d="M770 520Q983 431 1150 501" fill="none" stroke="#C74B3E" strokeWidth="24"/><path d="M1150 501L1093 438L1075 522Z" fill="#C74B3E"/></svg>
 <ChannelWatermark/>
</AbsoluteFill>;
