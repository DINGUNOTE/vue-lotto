import{u as C,r as x,a as m,o as n,c as k,w as o,b as t,d as r,e as d,F as V,f as w,B,t as R,s as h,_ as $,g as i,h as _,A}from"./index-B89Hzdpa.js";const F={key:0},S={key:1},E={__name:"DrawComponent",setup(I,{expose:a}){const p=C(),v=x(!1),b=x([]),y=()=>{const e=Array.from({length:45},(s,c)=>c+1).filter(s=>!p.fixedNumbers.includes(s)&&!p.excludedNumbers.includes(s)),u=[];for(;u.length<6-p.fixedNumbers.length;){const s=Math.floor(Math.random()*e.length),c=e.splice(s,1)[0];u.push(c)}b.value=h([...p.fixedNumbers,...u]),v.value=!0};return a({openDialog:()=>{y()}}),(e,u)=>{const s=m("v-card-title"),c=m("v-card-text"),N=m("v-card"),g=m("v-dialog");return n(),k(g,{modelValue:v.value,"onUpdate:modelValue":u[0]||(u[0]=l=>v.value=l),width:"auto"},{default:o(()=>[t(N,null,{default:o(()=>[t(s,null,{default:o(()=>u[1]||(u[1]=[r("추천번호 추첨 결과")])),_:1}),t(c,null,{default:o(()=>[b.value.length?(n(),d("ul",F,[(n(!0),d(V,null,w(b.value,(l,f)=>(n(),k(B,{key:f,number:l},{default:o(()=>[r(R(l),1)]),_:2},1032,["number"]))),128))])):(n(),d("p",S,"번호 추첨중..."))]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},U={class:"tooltip-box"},z={key:0},G={key:1},L={class:"tooltip-box"},M={key:0},j={key:1},O={class:"btn-group d-flex justify-center ga-2"},T={__name:"GetNumbersView",setup(I){const a=C(),p=x(""),v=x("");let b=x(null);const y=()=>{b.value.openDialog()};return(D,e)=>{const u=m("v-icon"),s=m("v-tooltip"),c=m("v-text-field"),N=m("v-card"),g=m("v-btn");return n(),d("section",null,[i("article",null,[i("h1",null,[e[6]||(e[6]=r(" 고정 번호 ")),i("div",U,[t(u,{size:"24"},{default:o(()=>e[4]||(e[4]=[r(" mdi-help-circle-outline ")])),_:1}),t(s,{activator:"parent",location:"top"},{default:o(()=>e[5]||(e[5]=[r("해당 번호를 고정으로 포함시켜서 번호를 추첨합니다."),i("br",null,null,-1),r("최소 0개부터 최대 5개의 번호를 선택 가능합니다.")])),_:1})])]),t(c,{modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=l=>p.value=l),variant:"underlined",type:"number",placeholder:"고정 번호 입력",clearable:"","append-inner-icon":"mdi-plus-circle","onClick:appendInner":e[1]||(e[1]=l=>_(a).addFixedNumber(parseInt(p.value,10)))},null,8,["modelValue"]),t(N,{class:"ball-container"},{default:o(()=>[_(a).fixedNumbers.length===0?(n(),d("p",z,"선택된 고정 번호가 없습니다.")):(n(),d("ul",G,[(n(!0),d(V,null,w(_(a).fixedNumbers,(l,f)=>(n(),k(B,{key:f,number:l,editable:!0,onRemoveBall:_(a).removeFixedNumber},null,8,["number","onRemoveBall"]))),128))]))]),_:1})]),i("article",null,[i("h1",null,[e[9]||(e[9]=r(" 제외 번호 ")),i("div",L,[t(u,{size:"24"},{default:o(()=>e[7]||(e[7]=[r(" mdi-help-circle-outline ")])),_:1}),t(s,{activator:"parent",location:"top"},{default:o(()=>e[8]||(e[8]=[r("해당 번호를 제외하고 번호를 추첨합니다."),i("br",null,null,-1),r("최소 0개부터 최대 38개까지 선택 가능합니다.")])),_:1})])]),t(c,{modelValue:v.value,"onUpdate:modelValue":e[2]||(e[2]=l=>v.value=l),variant:"underlined",type:"number",placeholder:"제외 번호 입력",clearable:"","append-inner-icon":"mdi-plus-circle","onClick:appendInner":e[3]||(e[3]=l=>_(a).addExcludedNumber(parseInt(v.value,10)))},null,8,["modelValue"]),t(N,{class:"ball-container"},{default:o(()=>[_(a).excludedNumbers.length===0?(n(),d("p",M,"선택된 제외 번호가 없습니다.")):(n(),d("ul",j,[(n(!0),d(V,null,w(_(a).excludedNumbers,(l,f)=>(n(),k(B,{key:f,number:l,editable:!0,onRemoveBall:_(a).removeExcludedNumber},null,8,["number","onRemoveBall"]))),128))]))]),_:1})]),i("div",O,[t(g,{variant:"outlined","min-width":"150",onClick:y},{default:o(()=>e[10]||(e[10]=[r("추천번호 뽑기")])),_:1}),t(g,{variant:"outlined","min-width":"150"},{default:o(()=>e[11]||(e[11]=[r("통계 보기")])),_:1})]),t(E,{ref_key:"drawComponentRef",ref:b},null,512),t(A)])}}},H=$(T,[["__scopeId","data-v-daf42bb4"]]);export{H as default};
