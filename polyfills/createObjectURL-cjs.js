!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).createObjectURL={})}(this,(function(e){"use strict";var t=require("whatwg-url"),r=require("jsdom/lib/jsdom/living/generated/utils"),n=t.serializeURLOrigin,o=t.parseURL,i={},a=r.implSymbol;e.createObjectURL=function createObjectURL(e){var t="blob:"+n(o(location.href))+"/"+function generateUUID(){var e=(new Date).getTime()+("undefined"!=typeof performance&&"function"==typeof performance.now?performance.now():0);return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?r:3&r|8).toString(16)}))}();return i[t]=e,t},e.revokeObjectURL=function revokeObjectURL(e){delete i[e]},e.xmlHttpRequestOverrideMimeType=function xmlHttpRequestOverrideMimeType(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.polyfillDataURLs,r=XMLHttpRequest.prototype.open,n=XMLHttpRequest.prototype.overrideMimeType;return function(e){"text/plain; charset=x-user-defined"===e&&(this.open=function(e,n,o){if(n.startsWith("blob:")){var x=i[n];if(!x)return void(this.send=function(){throw new DOMException("Failed to execute 'send' on 'XMLHttpRequest': Failed to "+"load '".concat(n,"'"),"NetworkError")});var p=x[a]._buffer.toString("binary");if(t)return this.status=200,this.send=function(){},this.responseType="text/plain",void(this.responseText=p);n="data:text/plain,"+encodeURIComponent(p)}return r.call(this,e,n,o)});for(var o=arguments.length,x=new Array(o>1?o-1:0),p=1;p<o;p++)x[p-1]=arguments[p];return n&&n.call.apply(n,[this,e].concat(x))}},Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=createObjectURL-cjs.js.map
