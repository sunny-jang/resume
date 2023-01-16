var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function a(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function u(){return d(" ")}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let m;function b(t){m=t}const h=[],$=[],v=[],j=[],y=Promise.resolve();let S=!1;function T(t){v.push(t)}const w=new Set;let x=0;function E(){if(0!==x)return;const t=m;do{try{for(;x<h.length;){const t=h[x];x++,b(t),G(t.$$)}}catch(t){throw h.length=0,x=0,t}for(b(null),h.length=0,x=0;$.length;)$.pop()();for(let t=0;t<v.length;t+=1){const e=v[t];w.has(e)||(w.add(e),e())}v.length=0}while(h.length);for(;j.length;)j.pop()();S=!1,w.clear(),b(t)}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(T)}}const _=new Set;let C;function k(t,e){t&&t.i&&(_.delete(t),t.i(e))}function I(t,e,n,r){if(t&&t.o){if(_.has(t))return;_.add(t),C.c.push((()=>{_.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function N(t){t&&t.c()}function P(t,n,i,s){const{fragment:c,after_update:l}=t.$$;c&&c.m(n,i),s||T((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),l.forEach(T)}function O(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function L(t,e){-1===t.$$.dirty[0]&&(h.push(t),S||(S=!0,y.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function M(e,o,i,s,c,p,a,d=[-1]){const u=m;b(e);const f=e.$$={fragment:null,ctx:[],props:p,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(u?u.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||u.$$.root};a&&a(f.root);let g=!1;if(f.ctx=i?i(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=o)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](o),g&&L(e,t)),n})):[],f.update(),g=!0,r(f.before_update),f.fragment=!!s&&s(f.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);f.fragment&&f.fragment.l(t),t.forEach(l)}else f.fragment&&f.fragment.c();o.intro&&k(e.$$.fragment),P(e,o.target,o.anchor,o.customElement),E()}b(u)}class z{$destroy(){O(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function F(t,e,n){const r=t.slice();return r[2]=e[n],r}function A(t){let e,n,r,o,i,p,u,m=t[2].label+"",b=t[2].text+"";return{c(){e=a("dl"),n=a("dt"),r=d(m),o=a("dd"),i=a("a"),p=d(b),f(n,"class","svelte-bw6z8f"),f(i,"href",u=t[2].href),f(e,"class","svelte-bw6z8f")},m(t,l){c(t,e,l),s(e,n),s(n,r),s(e,o),s(o,i),s(i,p)},p(t,e){2&e&&m!==(m=t[2].label+"")&&g(r,m),2&e&&b!==(b=t[2].text+"")&&g(p,b),2&e&&u!==(u=t[2].href)&&f(i,"href",u)},d(t){t&&l(e)}}}function B(e){let n,r,o,i,m=e[1],b=[];for(let t=0;t<m.length;t+=1)b[t]=A(F(e,m,t));return{c(){n=a("div"),r=a("h3"),o=d(e[0]),i=u();for(let t=0;t<b.length;t+=1)b[t].c();f(n,"class","contract_info_box svelte-bw6z8f")},m(t,e){c(t,n,e),s(n,r),s(r,o),s(n,i);for(let t=0;t<b.length;t+=1)b[t].m(n,null)},p(t,[e]){if(1&e&&g(o,t[0]),2&e){let r;for(m=t[1],r=0;r<m.length;r+=1){const o=F(t,m,r);b[r]?b[r].p(o,e):(b[r]=A(o),b[r].c(),b[r].m(n,null))}for(;r<b.length;r+=1)b[r].d(1);b.length=m.length}},i:t,o:t,d(t){t&&l(n),p(b,t)}}}function H(t,e,n){let{title:r}=e,{list:o}=e;return t.$$set=t=>{"title"in t&&n(0,r=t.title),"list"in t&&n(1,o=t.list)},[r,o]}class U extends z{constructor(t){super(),M(this,t,H,B,i,{title:0,list:1})}}function R(t){let e;return{c(){e=d(t[1])},m(t,n){c(t,e,n)},p(t,n){2&n&&g(e,t[1])},d(t){t&&l(e)}}}function D(e){let n,r,o,i=e[1]&&R(e);return{c(){n=a("h2"),r=d(e[0]),o=u(),i&&i.c(),f(n,"class","svelte-3wygxt")},m(t,e){c(t,n,e),s(n,r),s(n,o),i&&i.m(n,null)},p(t,[e]){1&e&&g(r,t[0]),t[1]?i?i.p(t,e):(i=R(t),i.c(),i.m(n,null)):i&&(i.d(1),i=null)},i:t,o:t,d(t){t&&l(n),i&&i.d()}}}function V(t,e,n){let{title:r}=e,{sideEle:o}=e;return t.$$set=t=>{"title"in t&&n(0,r=t.title),"sideEle"in t&&n(1,o=t.sideEle)},[r,o]}class q extends z{constructor(t){super(),M(this,t,V,D,i,{title:0,sideEle:1})}}function W(t){let e,n,r,o,i,p,d;return n=new q({props:{title:"INTRODUCTION"}}),{c(){e=a("div"),N(n.$$.fragment),r=u(),o=a("span"),o.innerHTML="저는 <span>______</span> 엔지니어입니다.",i=u(),p=a("div"),f(o,"class","who_i_am svelte-qinp3h"),f(p,"class","introduction_text"),f(e,"class","introduction")},m(l,a){c(l,e,a),P(n,e,null),s(e,r),s(e,o),s(e,i),s(e,p),p.innerHTML=t[0],d=!0},p(t,[e]){(!d||1&e)&&(p.innerHTML=t[0])},i(t){d||(k(n.$$.fragment,t),d=!0)},o(t){I(n.$$.fragment,t),d=!1},d(t){t&&l(e),O(n)}}}function J(t,e,n){let{introduction:r}=e;return t.$$set=t=>{"introduction"in t&&n(0,r=t.introduction)},[r]}class X extends z{constructor(t){super(),M(this,t,J,W,i,{introduction:0})}}function K(t,e,n){const r=t.slice();return r[2]=e[n],r}function Q(t){let e,n;return e=new q({props:{title:t[0],sideEle:`(${t[1].length})`}}),{c(){N(e.$$.fragment)},m(t,r){P(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.title=t[0]),2&n&&(r.sideEle=`(${t[1].length})`),e.$set(r)},i(t){n||(k(e.$$.fragment,t),n=!0)},o(t){I(e.$$.fragment,t),n=!1},d(t){O(e,t)}}}function Y(t){let e,n=t[2].description+"";return{c(){e=a("p"),f(e,"class","svelte-qa896w")},m(t,r){c(t,e,r),e.innerHTML=n},p(t,r){2&r&&n!==(n=t[2].description+"")&&(e.innerHTML=n)},d(t){t&&l(e)}}}function Z(t){let e,n,r,o,i,p,m,b,h,$,v,j,y,S,T,w,x=t[2].projectTitle+"",E=t[2].period+"",G=t[2].projectGroup+"",_=t[2].description&&Y(t);return{c(){e=a("div"),n=a("h5"),r=d(x),o=u(),i=a("div"),p=a("span"),m=d("("),b=d(E),h=d(")"),$=u(),v=a("span"),v.textContent="-",j=u(),y=a("span"),S=d(G),T=u(),_&&_.c(),w=u(),f(p,"class","svelte-qa896w"),f(v,"class","svelte-qa896w"),f(y,"class","svelte-qa896w"),f(i,"class","project_detail svelte-qa896w"),f(n,"class","svelte-qa896w"),f(e,"class","project_info svelte-qa896w")},m(t,l){c(t,e,l),s(e,n),s(n,r),s(n,o),s(n,i),s(i,p),s(p,m),s(p,b),s(p,h),s(i,$),s(i,v),s(i,j),s(i,y),s(y,S),s(e,T),_&&_.m(e,null),s(e,w)},p(t,n){2&n&&x!==(x=t[2].projectTitle+"")&&g(r,x),2&n&&E!==(E=t[2].period+"")&&g(b,E),2&n&&G!==(G=t[2].projectGroup+"")&&g(S,G),t[2].description?_?_.p(t,n):(_=Y(t),_.c(),_.m(e,w)):_&&(_.d(1),_=null)},d(t){t&&l(e),_&&_.d()}}}function tt(t){let e,n,o,i=t[0]&&Q(t),s=t[1],a=[];for(let e=0;e<s.length;e+=1)a[e]=Z(K(t,s,e));return{c(){i&&i.c(),e=u();for(let t=0;t<a.length;t+=1)a[t].c();n=d("")},m(t,r){i&&i.m(t,r),c(t,e,r);for(let e=0;e<a.length;e+=1)a[e].m(t,r);c(t,n,r),o=!0},p(t,[o]){if(t[0]?i?(i.p(t,o),1&o&&k(i,1)):(i=Q(t),i.c(),k(i,1),i.m(e.parentNode,e)):i&&(C={r:0,c:[],p:C},I(i,1,1,(()=>{i=null})),C.r||r(C.c),C=C.p),2&o){let e;for(s=t[1],e=0;e<s.length;e+=1){const r=K(t,s,e);a[e]?a[e].p(r,o):(a[e]=Z(r),a[e].c(),a[e].m(n.parentNode,n))}for(;e<a.length;e+=1)a[e].d(1);a.length=s.length}},i(t){o||(k(i),o=!0)},o(t){I(i),o=!1},d(t){i&&i.d(t),t&&l(e),p(a,t),t&&l(n)}}}function et(t,e,n){let{title:r}=e,{projects:o=[]}=e;return t.$$set=t=>{"title"in t&&n(0,r=t.title),"projects"in t&&n(1,o=t.projects)},[r,o]}class nt extends z{constructor(t){super(),M(this,t,et,tt,i,{title:0,projects:1})}}function rt(t,e,n){const r=t.slice();return r[2]=e[n],r}function ot(t,e,n){const r=t.slice();return r[5]=e[n],r}function it(t,e,n){const r=t.slice();return r[8]=e[n],r}function st(t){let e,n,r=t[8].content+"";return{c(){e=a("li"),n=d(r),f(e,"class","detail svelte-1f0d7e")},m(t,r){c(t,e,r),s(e,n)},p(t,e){1&e&&r!==(r=t[8].content+"")&&g(n,r)},d(t){t&&l(e)}}}function ct(t){let e,n,r=t[5]+"";return{c(){e=a("span"),n=d(r),f(e,"class","skil svelte-1f0d7e")},m(t,r){c(t,e,r),s(e,n)},p(t,e){1&e&&r!==(r=t[5]+"")&&g(n,r)},d(t){t&&l(e)}}}function lt(t){let e,n,r,o,i,m,b,h,$,v,j,y,S,T,w,x,E,G,_=t[2].companyName+"",C=t[2].period+"",k=t[2].description+"",I=t[2].detailList,N=[];for(let e=0;e<I.length;e+=1)N[e]=st(it(t,I,e));let P=t[2].techSkils,O=[];for(let e=0;e<P.length;e+=1)O[e]=ct(ot(t,P,e));return{c(){e=a("div"),n=a("div"),r=a("div"),o=a("h4"),i=d(_),m=u(),b=a("div"),h=d(C),$=u(),v=a("div"),j=a("h5"),y=d(k),S=u(),T=a("ul");for(let t=0;t<N.length;t+=1)N[t].c();w=u(),x=a("li"),E=d("Tech Skills: \n                            ");for(let t=0;t<O.length;t+=1)O[t].c();G=u(),f(o,"class","svelte-1f0d7e"),f(r,"class","content_left svelte-1f0d7e"),f(j,"class","svelte-1f0d7e"),f(v,"class","content_right svelte-1f0d7e"),f(n,"class","experience svelte-1f0d7e"),f(e,"class","experience_projects svelte-1f0d7e")},m(t,l){c(t,e,l),s(e,n),s(n,r),s(r,o),s(o,i),s(r,m),s(r,b),s(b,h),s(n,$),s(n,v),s(v,j),s(j,y),s(v,S),s(v,T);for(let t=0;t<N.length;t+=1)N[t].m(T,null);s(T,w),s(T,x),s(x,E);for(let t=0;t<O.length;t+=1)O[t].m(x,null);s(e,G)},p(t,e){if(1&e&&_!==(_=t[2].companyName+"")&&g(i,_),1&e&&C!==(C=t[2].period+"")&&g(h,C),1&e&&k!==(k=t[2].description+"")&&g(y,k),1&e){let n;for(I=t[2].detailList,n=0;n<I.length;n+=1){const r=it(t,I,n);N[n]?N[n].p(r,e):(N[n]=st(r),N[n].c(),N[n].m(T,w))}for(;n<N.length;n+=1)N[n].d(1);N.length=I.length}if(1&e){let n;for(P=t[2].techSkils,n=0;n<P.length;n+=1){const r=ot(t,P,n);O[n]?O[n].p(r,e):(O[n]=ct(r),O[n].c(),O[n].m(x,null))}for(;n<O.length;n+=1)O[n].d(1);O.length=P.length}},d(t){t&&l(e),p(N,t),p(O,t)}}}function pt(t){let e,n,r,o,i;n=new q({props:{title:t[1]}});let d=t[0].workList,g=[];for(let e=0;e<d.length;e+=1)g[e]=lt(rt(t,d,e));return{c(){e=a("div"),N(n.$$.fragment),r=u(),o=a("div");for(let t=0;t<g.length;t+=1)g[t].c();f(o,"class","content"),f(e,"class","content_section")},m(t,l){c(t,e,l),P(n,e,null),s(e,r),s(e,o);for(let t=0;t<g.length;t+=1)g[t].m(o,null);i=!0},p(t,[e]){const r={};if(2&e&&(r.title=t[1]),n.$set(r),1&e){let n;for(d=t[0].workList,n=0;n<d.length;n+=1){const r=rt(t,d,n);g[n]?g[n].p(r,e):(g[n]=lt(r),g[n].c(),g[n].m(o,null))}for(;n<g.length;n+=1)g[n].d(1);g.length=d.length}},i(t){i||(k(n.$$.fragment,t),i=!0)},o(t){I(n.$$.fragment,t),i=!1},d(t){t&&l(e),O(n),p(g,t)}}}function at(t,e,n){let{item:r}=e,{title:o}=e;return t.$$set=t=>{"item"in t&&n(0,r=t.item),"title"in t&&n(1,o=t.title)},[r,o]}class dt extends z{constructor(t){super(),M(this,t,at,pt,i,{item:0,title:1})}}function ut(e){let n,r,o,i;return n=new q({props:{title:"EDUCATION"}}),{c(){N(n.$$.fragment),r=u(),o=a("div"),o.innerHTML='<div class="row svelte-1b0odzb"><h4 class="svelte-1b0odzb">2017. 02 ~ 2022. 02</h4> \n            <div class="group svelte-1b0odzb">한양 사이버대학교 (컴퓨터공학과)</div></div> \n        <div class="row svelte-1b0odzb"><h4 class="svelte-1b0odzb">2020. 10 ~ 2021. 04</h4> \n            <div class="group svelte-1b0odzb">KH정보교육원 (디지털컨버전스 융합 응용SW 개발자)</div></div>',f(o,"class","")},m(t,e){P(n,t,e),c(t,r,e),c(t,o,e),i=!0},p:t,i(t){i||(k(n.$$.fragment,t),i=!0)},o(t){I(n.$$.fragment,t),i=!1},d(t){O(n,t),t&&l(r),t&&l(o)}}}class ft extends z{constructor(t){super(),M(this,t,null,ut,i,{})}}function gt(e){let n,r,o,i;return n=new q({props:{title:"Presentation & Article"}}),{c(){N(n.$$.fragment),r=u(),o=a("div"),o.innerHTML='<hr/> \n    <p class="svelte-1nt9id0">(2022. 2. 25) <strong>webpack 라이브러리 걷어내고 커스텀하기</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/47?category=1263281">https://sunny-jang.tistory.com/47?category=1263281</a></p> \n    <p class="svelte-1nt9id0">(2022. 4. 13) <strong>Webpack이란? Webpack 개념, 주요요소(Entry, Output, Loader, Plugin)</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/48">https://sunny-jang.tistory.com/48</a></p> \n    <p class="svelte-1nt9id0">(2023. 1. 11) <strong>useEffect, useState만 사용하지말고 useMemo, useCallback 사용해보자</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/61">https://sunny-jang.tistory.com/61</a></p> \n    <p class="svelte-1nt9id0">(2021. 11. 5) <strong>React/JavaScript 에서 React/TypeScript 마이그레이션 중 발생한 오류</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/42?category=1239166">https://sunny-jang.tistory.com/42?category=1239166</a></p> \n    <p class="svelte-1nt9id0">(2022. 10. 9)<strong>프론트앤드 개발 시 고려사항</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/54">https://sunny-jang.tistory.com/54</a></p> \n    <p class="svelte-1nt9id0">(2022. 10. 17) <strong>웹뷰 개발을 설계하는 방식</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/56">https://sunny-jang.tistory.com/56</a></p> \n    <p class="svelte-1nt9id0">(2022. 8. 22) <strong>Code Seoul 밋업 참여!</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/50">https://sunny-jang.tistory.com/50</a></p> \n    <p class="svelte-1nt9id0">(2022. 7. 28) <strong>벌써 1년이나 됐다니 1년간의 회고!</strong></p> \n    <p class="svelte-1nt9id0"><a href="https://sunny-jang.tistory.com/49">https://sunny-jang.tistory.com/49</a></p>'},m(t,e){P(n,t,e),c(t,r,e),c(t,o,e),i=!0},p:t,i(t){i||(k(n.$$.fragment,t),i=!0)},o(t){I(n.$$.fragment,t),i=!1},d(t){O(n,t),t&&l(r),t&&l(o)}}}class mt extends z{constructor(t){super(),M(this,t,null,gt,i,{})}}let bt=[{label:"Github",href:"https://github.com/sunny-jang",text:"https://github.com/sunny-jang"},{label:"Blog",href:"https://sunny-jang.tistory.com",text:"https://sunny-jang.tistory.com"}],ht=[{label:"Email",text:"esunbest@gmail.com"}],$t={workList:[{companyName:"판도라티비",period:"2021-07~ 재직 중",description:"경제에 관심을 가지는 유저들의 블록체인 커뮤니티 web과 mobile 메인 프론트엔드 개발 담당",detailList:[{content:"글로벌 IDO 중개 플랫폼 오픈 web3 서비스 운영 및 유지보수"},{content:"사용자 Needs 에 맞는 사용성 개선과 신규 비즈니스 로직 구현"},{content:"레거시 청산 및 기존 비즈니스 유지보수"},{content:"웹 서비스와 포맷이 맞지 않는 앱의 글쓰기에서 웹뷰에 CkEditor를 사용해 글쓰기 기능 통일"},{content:"typeScirpt, swr 도입으로 코드 프로젝트 퀄리티 개선"}],techSkils:["React","swr","redux-saga","less","javaScript","typeScript"],projects:[{projectTitle:"Cobak 블록체인 커뮤니티 운영/리뉴얼",projectGroup:"Pandora.TV",period:"2021년 07월 - 진행 중",description:"블록체인 커뮤니티 Cobak 운영 및 고도화\n\n                        - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여\n                        - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>\n                        - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체\n                        - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여\n                        - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>\n                    "},{projectTitle:"뉴스속보/ 뉴스매체 커스텀 기능 개발",projectGroup:"Pandora.TV",period:"2022년 10월 - 2019년 12월",description:"<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발\n                    \n                        - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발\n                        - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>\n                        - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리\n                        "},{projectTitle:"앱 서비스 글쓰기/상세보기 웹뷰 전환",projectGroup:"Pandora.TV",period:"2022년 08월 - 2022년 10월",description:"- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업\n                        - Ckeditor를 사용해 에디터 구현.\n                        - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리\n                        "},{projectTitle:"Global IDO 토큰중개 서비스",projectGroup:"Pandora.TV",period:"2022년 06월 - 2022년 08월",description:"web3를 사용한 지갑연동 및 상태 관리\n                        - i18n라이브러리를 접목하여 다국어 기능을 지원.\n                        - 자체토큰 스테이킹/거버넌스 기능\n                        "}]},{companyName:"Evolve Branding (Canada)",period:"2020-03~2020-09",description:"비지니스 브랜딩을 돕는 캐나다 기업의 인턴십 프로그램의 팀 리더, Flutter 프레임워크를 사용하는 4개 프로젝트 참여",detailList:[{content:"Flutter/Dart를 사용한 IOS/Android App 제작"},{content:"Google 번역기 API 라이브러리 이용,  목소리 인식 실시간 번역 서비스"},{content:"Neumorphic 커스텀 테마 패키지 위젯 개발"}],techSkils:["Flutter","Dart","firebase","Hybrid App"],projects:[{projectTitle:"CATBOOK (SNS)",projectGroup:"Evolve Branding",period:"2020년 04월 - 2020년 05월",description:"반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스\n                    - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용\n                    - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 \n                    - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화\n                        "},{projectTitle:"Evolve Store",projectGroup:"Evolve Branding",period:"2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월",description:"인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발\n\n            - firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발\n            - 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 적용\n            - <b>팀 리더로 프론트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.\n                        "},{projectTitle:"Dictionary & Translator",projectGroup:"Evolve Branding",period:"2020년 06월 - 2020년 09월",description:"목소리를 인식하여 직역해주는 번역 프로그램 개발\n\n            - <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발\n            - 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.\n            - 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.\n                        "}]},{companyName:"F9dev",period:"2017-06~2019-01",description:"하이브리드 앱을 의뢰받아 구축 및 설계, 자사 e커머스 ClosedShop의 서비스 운영",detailList:[{content:"AngularJS, Ionic 을 사용한 WebView Hybrid App 개발"},{content:"Canvas를 사용하여 데이터를 시각화"},{content:"Monthly 개발 컨퍼런스에 참여해 구성원으로서 기술로 회사의 비지니스에 더 많이 기여할 수 있는 방향을 고민"},{content:"초기 멤버로써 서비스에 애정을 가지고 고객의 시선에서 경험을 최우선으로 하는 업무 분위기에서 프론트엔드 개발"}],techSkils:["AngularJs","Ionic","javaScript","ajax","html","sass","less"],projects:[{projectTitle:"클로즈 샵(e-Commerce)",projectGroup:"F9dev",period:"2018년 1월 - 2019년 01월",description:"<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.\n\n            - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발\n            - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선\n                        "},{projectTitle:"SPOTV (스포츠 스트리밍 서비스)",projectGroup:"F9dev",period:"2018년 4월 - 2018년 7월",description:"SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발\n\n            - 넷플릭스를 참조해 전체적인 UI/UX를 디자인 및 구축\n            - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>\n                        "},{projectTitle:"RnbStory Hybrid APP (SNS)",projectGroup:"F9dev",period:"2018년 4월 - 2018년 6월",description:"RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.\n\n            - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조\n            - 웹 사이트 정비를 위한 프론트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장\n                        "},{projectTitle:"BuyCar(중고차) Hybrid App",projectGroup:"F9dev",period:"2017년 8월 - 2019년 01월",description:"자동차 중고거래 및 경매 플랫폼 운영 및 유지보수\n\n            - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> \n            - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여\n                        "}]},{companyName:"㈜메이젠인터렉트",period:"2016-01~2017-01",description:"공공기관, 공기업, 큰 규모의 다양한 프로젝트의 마크업 개발 ",detailList:[{content:"다수의 프로젝트 웹 접근성 90%→98% 불합격 수정 및 마크 획득"},{content:"접근성이 지켜지지 않은 사이트들에 시맨틱 마크업을 적용해 SEO작업, 접근성 개선"},{content:"브라우저 호환성 준수 등 크로스 브라우징 작업"},{content:"Mobile First 휴대폰, 테블릿, PC 등의 다양한 디바이스 반응형 작업"},{content:"프로젝트 레이아웃과 페이지 이슈에 대응하는 업무를 진행"}],techSkils:["Html","css","javaScript","jQuery"],projects:[{projectTitle:"신한은행 임직원 강의 웹사이트 리뉴얼",projectGroup:"Mayzen",period:"2016년 12월 - 2017년 12월",description:"- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>\n            - 유지보수를 위한 가이드 문서를 만들었습니다.\n                        "},{projectTitle:"Hyundai Life web channel Construct",projectGroup:"Mayzen",period:"2016년 8월 - 2016년 11월",description:"- UI개발에 넥사크로 사용 "},{projectTitle:"군인공제회 대학원 입학 홈페이지",projectGroup:"Mayzen",period:"2017년 7월 - 2017년 8월",description:null},{projectTitle:"농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발",projectGroup:"Mayzen",period:"2016년 2월 - 2016년 4월",description:null}]}]};const vt=[{projectTitle:"Cobak 블록체인 커뮤니티 운영/리뉴얼",projectGroup:"Pandora.TV",period:"2021년 07월 - 진행 중",description:"블록체인 커뮤니티 Cobak 운영 및 고도화\n\n            - 상시 운영업무를 하며 유저들의 피드백을 받아 WEB/MOBILE 플랫폼의 기능 고도화와 신규 기능 개발에 기여\n            - 운영업무에 필요한 Back-office 개발. <b>운영업무의 편리성을 향상 및 반복 업무 감축</b>\n            - 신규 게시글 리스트 UI 컴포넌트 신규 개발, 기존 리스트 방식을 신규 UI로 전체 교체\n            - 기존 리덕스에서 데이터 호출 방식 -> <b>SWR캐싱 도입으로 재 접속 화면 로딩속도 개선</b>에 기여\n            - Dynamic Import 도입, gzip 압축방식, code-spliting <b>적용으로 FCP 6.3s -> 0.9s로 개선</b>\n        "},{projectTitle:"뉴스속보/ 뉴스매체 커스텀 기능 개발",projectGroup:"Pandora.TV",period:"2022년 10월 - 2019년 12월",description:"<b>연합뉴스, 파이내내셜 쥬스 등 타 뉴스 매체의 api</b>를 받아와 코박 서비스 내에서 주요 경제뉴스를 모아 보는 웹 신규 서비스 개발\n        \n            - 원하는 매체사의 뉴스만을 모아볼 수 있도록 나만의 커스텀 기능 개발\n            - 각 매체사의 실시간 데이터를 수집해 <b>실시간 속보 갱신</b>\n            - 비회원, 회원을 기준 디폴트 뉴스 및 커스텀 리스트를 분리\n            "},{projectTitle:"앱 서비스 글쓰기/상세보기 웹뷰 전환",projectGroup:"Pandora.TV",period:"2022년 08월 - 2022년 10월",description:"- 웹에서 작성한 글을 앱에서 수정 시 포맷 이슈가 발생하여 <b>네이티브 텍스트 펜집기로 구현되어 있는 화면을 신규 웹뷰 화면으로 전환</b>작업\n            - Ckeditor를 사용해 에디터 구현.\n            - <b>네이티브 앱 ios와 andriod 통신하는 appInterface 개발</b> 및 문서정리\n            "},{projectTitle:"Global IDO 토큰중개 서비스",projectGroup:"Pandora.TV",period:"2022년 06월 - 2022년 08월",description:"web3를 사용한 지갑연동 및 상태 관리\n            - i18n라이브러리를 접목하여 다국어 기능을 지원.\n            - 자체토큰 스테이킹/거버넌스 기능\n            "},{projectTitle:"CATBOOK (SNS)",projectGroup:"Evolve Branding",period:"2020년 04월 - 2020년 05월",description:"반려묘들을 위한 고양이 자랑 커뮤니티/SNS 서비스\n        - <b>Newmorphic 커스텀 테마 위젯 모듈을 개발</b>해 전반적인 UI/UX 개발에 적용\n        - Firebase를 사용해 <b>DB 구축 및 게시글 작성, 수정, 삭제, 조회 기능</b>을 구현 \n        - <b>Firebase 의 authrozation 기능</b>을 사용해 회원가입/로그인 보안 강화\n            "},{projectTitle:"Evolve Store",projectGroup:"Evolve Branding",period:"2020년 05월 - 2020년 06월, 2022년 07월 - 2022년 08월",description:"인턴십 프로그램에 참여하여 얻은 Score로 물품을 구매할 수 있는 인턴십 내 스토어 앱 개발\n\n- firebase realtime 데이터베이스로 각 프로젝트 내의 채팅기능 개발\n- 어드민에게만 프로젝트 생성 및 인턴 배정 권한을 부여\n- <b>팀 리더로 프론트 엔드 개발 및 지원 백엔드 프로그래밍을 주도</b>. 설계 기능의 기술적 타당성 및 최적화 할 수 있는 방안을 모색.\n            "},{projectTitle:"Dictionary & Translator",projectGroup:"Evolve Branding",period:"2020년 06월 - 2020년 09월",description:"목소리를 인식하여 직역해주는 번역 프로그램 개발\n\n- <b>google translator API</b>를 활용하여 직접 문장을 입력하여 번역기능을 제공하는 것을 베이스 개발\n- 제공하는 10개 이상의 언어에서 <b>목소리 인식 번역 기능</b>을 추가를 위해 voice reconizer 패키지 접목.\n- 번역 후 모르는 단어들은 바로 찾아볼 수 있도록 사전 기능을 제공 편리성을 개선.\n            "},{projectTitle:"클로즈 샵(e-Commerce)",projectGroup:"F9dev",period:"2018년 1월 - 2019년 01월",description:"<b>F9dev 자체 전자상거래 웹사이트</b>를 구축 및 운영.\n\n    - 대규모 e-Commerce서비스로 성장하기 위한 디테일에 초점을 맞춰 개발\n    - 느린 속도를 유발하는 <b>js 애니메이션을 css 애니메이션으로 교체</b>작업을 하여 라이트한 웹으로 퍼포먼스 개선\n                "},{projectTitle:"SPOTV (스포츠 스트리밍 서비스)",projectGroup:"F9dev",period:"2018년 4월 - 2018년 7월",description:"SPOTV의 웹사이트와 하이브리드 앱 프론트엔드 개발\n\n    - 넷플릭스를 참조해 전체적인 UI/UX를 디자인 및 구축\n    - <b>앱에서 작동하는 웹 동작의 차이(터치 모션 등)를 축소하여 퍼포먼스 개선</b>\n                "},{projectTitle:"RnbStory Hybrid APP (SNS)",projectGroup:"F9dev",period:"2018년 4월 - 2018년 6월",description:"RnbStory 웹사이트와 하이브리드 앱 프론트엔드 개발.\n\n    - 유명한 SNS 웹사이트나 애플리케이션을 검토해 기술과 오픈 소스를 참조\n    - 웹 사이트 정비를 위한 프론트 엔드 개발 및 지원 백엔드 프로그래밍을 주도했습니다. 설계 기능의 기술적 타당성 및 최적 기능 보장\n                "},{projectTitle:"BuyCar(중고차) Hybrid App",projectGroup:"F9dev",period:"2017년 8월 - 2019년 01월",description:"자동차 중고거래 및 경매 플랫폼 운영 및 유지보수\n\n    - <b>브랜드, 기능, 중고차의 구성 요소를 디자인적 요소로 구현하여 사용자에게 편리성을 제공</b> \n    - 경매가 입찰을 calculator 컴포넌트 간편사용을 위한 <b>일괄 증가, 현재가 기준 일정금액 증가 등 기능 개발</b>에 기여\n                "},{projectTitle:"신한은행 임직원 강의 웹사이트 리뉴얼",projectGroup:"Mayzen",period:"2016년 12월 - 2017년 12월",description:"- <b>SEO, 장애인을 위한 웹 접근성, 체계적인 구조를 갖춘 웹사이트 구축</b>\n    - 유지보수를 위한 가이드 문서를 만들었습니다.\n                "},{projectTitle:"Hyundai Life web channel Construct",projectGroup:"Mayzen",period:"2016년 8월 - 2016년 11월",description:"- UI개발에 넥사크로 사용 "},{projectTitle:"군인공제회 대학원 입학 홈페이지",projectGroup:"Mayzen",period:"2017년 7월 - 2017년 8월",description:null},{projectTitle:"농협캐미컬 웹사이트 리뉴얼 UI 마크업 개발",projectGroup:"Mayzen",period:"2016년 2월 - 2016년 4월",description:null}],jt=[{projectTitle:"NearBnb",period:"2021년 2월 - 2021년 4월",projectGroup:"개별 프로젝트",description:"현재 위치 기반의 숙소를 찾아 예약할 수 있는 서비스.\n            - 호스트계정 - 원하는 기간에 숙소를 등록하는 기능에 기여(90%)\n            - google map 기반의 좌표를 기반으로 내 위치 반경을 계산해 지도에 근처 숙소 노출 \n            Java, Spring, Orqcle로 백엔드를 구축\n        "},{projectTitle:"C-It",period:"2021년 4월 - 2016년 6월",projectGroup:"개별 프로젝트",description:"IT 관련 주요 뉴스를 모아볼 수 있는 IT news 모아보기 커뮤니티\n        - 뉴스등록을 위한 news 모델 설계\n        - 커뮤니티 유저 회원가입을 위해 Mail 인증을 구현\n        Java, Spring, Orqcle로 백엔드를 구축\n        "}];function yt(e){let n,r,o,i;return n=new q({props:{title:"Skills"}}),{c(){N(n.$$.fragment),r=u(),o=a("div"),o.innerHTML="<p><strong>Frontend</strong></p> \n    <ul><li>JS|TS(ES6), HTML, CSS(SCSS,LESS), JSP, Dart</li> \n        <li>React, Vue,  Angular, Flutter, Spring</li> \n        <li>webpack, redux, swr, Git</li></ul>"},m(t,e){P(n,t,e),c(t,r,e),c(t,o,e),i=!0},p:t,i(t){i||(k(n.$$.fragment,t),i=!0)},o(t){I(n.$$.fragment,t),i=!1},d(t){O(n,t),t&&l(r),t&&l(o)}}}class St extends z{constructor(t){super(),M(this,t,null,yt,i,{})}}function Tt(e){let n,r,o,i,p,g,m,b,h,$,v,j,y,S,T,w,x,E,G,_,C,L,M,z,F,A,B,H,R,D,V;return v=new X({props:{introduction:"\n    안녕하세요. 4년차 프론트엔드 개발자 장은선입니다. </br></br>\n\n    웹/앱 서비스의 프론트엔드 개발과 스타트업 개발자로서의 많은 경험을 가지고 있습니다. React, javsScript, typeScript, Redux, SWR, Git 등을 사용하여 프로덕션 서비스를 설계 개발, \n    운영한 경험으로 확장성과 유지보수성이 높은 개발을 하기 위해 언제나 고민하고 있습니다. </br>\n    프론트엔드 개발자로 다수의 프로젝트에 참여해 갖춘 업무처리속도와 다양한 플랫폼 기반의 UX개발 경험들은 제 강점중의 하나입니다.</br>\n    신속한 서비스 제공과 안정화된 코드로 유저들에게 편리함과 신뢰할 수 있는 서비스의 경험을 남기기 위해 노력하고 있습니다.</br></br>\n\n    새로운 기술에도 관심과 궁금증이 많아 다양한 개발 밋업에 참여하고, 개발그룹에서의 네트워킹과 토론을 즐깁니다.</br>\n    언젠가 프론트 엔드 개발에 정점을 찍어 웹 개발에 관련 서적을 내고, 많은 사람들에게 지식을 전파할 수 있는 개발자가 되겠다는 목표가 있습니다. </br>\n    이를 이루기 위해 꾸준한 공부를 하고, 웹개발을 배우는 동료가 있으면 제가 가진 지식으로 언제나 도움을 주려고 합니다.</br></br>\n\n    서비스란, 사람들이 머무르고 계속 사용하고 싶은 프로그램을 제공하는 것이라고 생각합니다.</br>\n    저의 다양한 경험들을 활용해 사랑받는 서비스를 개발해 지속적으로 성장해 나가고 싶습니다. </br>\n"}}),y=new St({}),E=new U({props:{title:"Channels",list:bt}}),_=new U({props:{title:"Contracts",list:ht}}),L=new dt({props:{title:"EXPERIENCES",item:$t}}),z=new nt({props:{title:"PROJECTS",projects:vt}}),A=new nt({props:{title:"그 외 프로젝트",projects:jt}}),H=new mt({}),D=new ft({}),{c(){n=a("main"),r=a("h1"),o=a("span"),i=d("장은선"),p=d(" ("),g=d("Sunny"),m=d(")"),b=u(),h=a("span"),h.textContent="last updated: 2023.01.15",$=u(),N(v.$$.fragment),j=u(),N(y.$$.fragment),S=u(),T=a("div"),w=u(),x=a("div"),N(E.$$.fragment),G=u(),N(_.$$.fragment),C=u(),N(L.$$.fragment),M=u(),N(z.$$.fragment),F=u(),N(A.$$.fragment),B=u(),N(H.$$.fragment),R=u(),N(D.$$.fragment),f(o,"class","deco_bar svelte-1ay54ex"),f(r,"class","svelte-1ay54ex"),f(h,"class","update_date svelte-1ay54ex"),f(T,"class","div svelte-1ay54ex"),f(x,"class","contracts_info"),f(n,"class","svelte-1ay54ex")},m(t,e){c(t,n,e),s(n,r),s(r,o),s(r,i),s(r,p),s(r,g),s(r,m),s(n,b),s(n,h),s(n,$),P(v,n,null),s(n,j),P(y,n,null),s(n,S),s(n,T),s(n,w),s(n,x),P(E,x,null),s(x,G),P(_,x,null),s(n,C),P(L,n,null),s(n,M),P(z,n,null),s(n,F),P(A,n,null),s(n,B),P(H,n,null),s(n,R),P(D,n,null),V=!0},p:t,i(t){V||(k(v.$$.fragment,t),k(y.$$.fragment,t),k(E.$$.fragment,t),k(_.$$.fragment,t),k(L.$$.fragment,t),k(z.$$.fragment,t),k(A.$$.fragment,t),k(H.$$.fragment,t),k(D.$$.fragment,t),V=!0)},o(t){I(v.$$.fragment,t),I(y.$$.fragment,t),I(E.$$.fragment,t),I(_.$$.fragment,t),I(L.$$.fragment,t),I(z.$$.fragment,t),I(A.$$.fragment,t),I(H.$$.fragment,t),I(D.$$.fragment,t),V=!1},d(t){t&&l(n),O(v),O(y),O(E),O(_),O(L),O(z),O(A),O(H),O(D)}}}return new class extends z{constructor(t){super(),M(this,t,null,Tt,i,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
