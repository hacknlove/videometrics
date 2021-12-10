import{useState as e,useCallback as t,useMemo as s,useEffect as i}from"react";var n,o,a,c,r,h={};n=h,Object.defineProperty(n,"__esModule",{value:!0,configurable:!0}),o=h,a="default",c=()=>d,Object.defineProperty(o,a,{get:c,set:r,enumerable:!0,configurable:!0});class d{constructor(e,t){this.videoElement=e,this.attachedVideoEvents=new Set,this.attachedWindowEvents=new Set,this.config=t,this.running=!1,this._processEvent=this.processEvent.bind(this),this.start()}attachEvent(e,t,s){s.has(e)||(t.addEventListener(e,this._processEvent),s.add(e))}detachEvent(e,t,s){s.has(e)&&(t.removeEventListener(e,this._processEvent),s.delete(e))}processEvent(e){const t=this.config[`capture-${e.type}`]?this.config[`capture-${e.type}`](e,this):this.config.captureDefault(e,this);if(t.skip)return;const s=parseInt(localStorage.getItem("videometrics-last-index"))||0,i=parseInt(localStorage.getItem("videometrics-last-send"))||Date.now(),n=JSON.stringify({...this.config.customData,when:Date.now(),type:e.type,...t});localStorage.getItem("videometrics-"+(s-1))!==n&&(localStorage.setItem("videometrics-last-index",s+1),localStorage.setItem(`videometrics-${s}`,n),(s>this.config.bulkSize||i+this.config.interval<Date.now())&&this.bulk(n))}async bulk(){const e=this.config.firstRow?[this.config.firstRow]:[];let t=parseIndex(localStorage.getItem("videometrics-last-index"))||0;if(0!==t){for(;t--;)e.push(localStorage.getItem(`videometrics-${t}`));if(e.push(newItem),await this.config.send(this,e))for(localStorage.setItem("videometrics-last-index",0),localStorage.setItem("videometrics-last-send",Date.now());t--;)localStorage.removeItem(`videometrics-${t}`)}else localStorage.setItem("videometrics-last-send",Date.now())}start(){this.running||(this.config.videoEvents.forEach((e=>this.attachEvent(e,this.videoElement,this.attachedVideoEvents))),this.config.windowEvents.forEach((e=>this.attachEvent(e,window,this.attachedWindowEvents))),this.running=!0)}stop(){this.attachedVideoEvents.forEach((e=>this.videoElement.removeEventListener(e,this._processEvent))),this.attachedWindowEvents.forEach((e=>this.window.removeEventListener(e,this._processEvent))),this.attachedVideoEvents.clear(),this.attachedWindowEvents.clear(),this.running=!1}}function l(n,o=null){const[a,c]=e(o),r=t((e=>{null!==e&&c(e)}),[]),h=s((()=>a&&new d(a,n)),[a,n]);i((()=>()=>h&&h.stop()),[h]);const l=[r,h,c];return l.videoRef=r,l.instance=h,l.setVideoElement=c,l}export{l as useVideometrics};