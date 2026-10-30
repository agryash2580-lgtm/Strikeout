import React from 'react';
/* Original scene composed on an 8px grid. No downloaded illustration or game assets. */
export function PixelWorld({home=false}:{home?:boolean}){
const trees=[[-30,300,.95],[70,292,.65],[935,262,.9],[1040,282,1.1],[830,335,.7]];
return <svg className="pixel-world" viewBox="0 0 1120 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true" shapeRendering="crispEdges">
<defs><pattern id={home?'brick-h':'brick-i'} width="64" height="32" patternUnits="userSpaceOnUse"><rect width="64" height="32" fill="#6e4a8c"/><path d="M0 0H64M0 31H64M32 0V16M0 16H64M0 16V32M64 16V32" stroke="#38244e" strokeWidth="3"/><path d="M4 4H28M36 20H60" stroke="#9670a9" strokeWidth="2"/></pattern></defs>
<rect width="1120" height="560" fill="#392055"/><rect y="110" width="1120" height="175" fill="#593674"/><rect y="285" width="1120" height="210" fill="#8b5690"/>
<path d="M0 139H100V151H224V167H360V174H650V163H880V143H1120V228H0Z" fill="#714780"/>
<g fill="#f6d27b"><path d="M924 51h48v8h16v40h-16v8h-48v-8h-12V63h12z"/><rect x="116" y="54" width="5" height="5"/><rect x="244" y="84" width="5" height="5"/><rect x="599" y="40" width="5" height="5"/><rect x="767" y="97" width="5" height="5"/><rect x="1040" y="155" width="5" height="5"/></g>
<g className="world-clouds" fill="#b797bc"><path d="M40 104h32V92h40v12h24v12h32v12H40z"/><path d="M665 130h30v-13h50v13h31v12h24v13H665z"/><path d="M890 205h42v-16h49v16h25v13h-116z"/></g>
<path d="M0 320V260h56v-32h48v-48h24v-24h32v24h24v48h40v46h48v-35h32v-40h32v-40h24v-23h16v23h24v40h24v50h40v27h48v-38h40v-30h32v-44h24v-22h24v22h24v44h24v48h56v-40h32v-32h24v-28h24v28h24v32h24v40h56v-32h32v-42h24v-22h24v22h24v42h24v32h56v120H0z" fill="#4b315f"/>
<g fill="#c999a7">{[82,150,320,368,549,589,718,762,926,966].map((x,i)=><rect key={x} x={x} y={i%2?252:280} width="8" height="14"/>)}</g>
<path d="M0 352h104v-16h112v18h120v-16h152v22h144v-30h152v10h128v-14h108v36h100v198H0z" fill="#583666"/>
<path d="M0 385h168v-16h112v17h120v-8h144v15h128v-27h176v20h136v-8h136v182H0z" fill="#342640"/>
<g>{trees.map(([x,y,s],i)=><g key={i} transform={`translate(${x} ${y}) scale(${s})`}><rect x="68" y="22" width="26" height="190" fill="#332039"/><rect x="78" y="32" width="7" height="180" fill="#7a4e65"/><path d="M30 0h32v-24h43V0h29v28h28v38h-18v26H17V71H0V32h30z" fill="#694477"/><path d="M39 5h32v-15h25v15h27v25h23v24h-36v16H26V50H12V35h27z" fill="#96638d"/><path d="M53 12h24V0h17v18h28v14H53z" fill="#ba819e"/><path d="M30 102h24v-14h60v14h25v31h-18v17H26v-20H13v-17h17z" fill="#674579"/></g>)}</g>
<path d="M260 420h80v-12h290v16h90v18h120v118H160V467h100z" fill="#a57480"/><path d="M320 435h300v13h90v17h80v95H220v-77h100z" fill="#d2aa9d"/><path d="M337 456h54v10h-54zm80-15h59v10h-59zm119 27h70v10h-70zm118 38h61v10h-61zm-304 14h64v10h-64zm116-23h55v10h-55z" fill="#a97987"/>
<path d="M0 463h155v-18h74v16h95v23h420v-17h110v-24h76v18h190v99H0z" fill="#4b355c"/>
<rect y="494" width="1120" height="66" fill={`url(#${home?'brick-h':'brick-i'})`}/><rect y="485" width="1120" height="12" fill="#b789a4"/><rect y="479" width="1120" height="8" fill="#d1a1ac"/>
<g fill="#a0839b">{[25,154,890,1009,1051].map(x=><path key={x} d={`M${x} 470h12v-13h8v-13h8v25h14v-16h8v25h-50z`}/>)}</g>
<g fill="#ffe079">{[[99,445],[180,469],[914,451],[1029,477]].map(([x,y])=><g key={x}><rect x={x} y={y} width="8" height="8"/><rect x={x-7} y={y+7} width="22" height="7"/><rect x={x} y={y+14} width="8" height="8"/></g>)}</g>
<g fill="#edbb90"><rect x="371" y="492" width="25" height="4"/><rect x="668" y="492" width="38" height="4"/><rect x="746" y="492" width="20" height="4"/></g>
</svg>}
