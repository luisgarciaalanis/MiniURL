!function t(n,e,i){function r(o,a){if(!e[o]){if(!n[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(s)return s(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var h=e[o]={exports:{}};n[o][0].call(h.exports,function(t){var e=n[o][1][t];return r(e?e:t)},h,h.exports,t,n,e,i)}return e[o].exports}for(var s="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,n,e){"use strict";var i={hashIds:{createAtOnce:1e4,regExp:/^[a-km-z2-79]+$/,base32Lookup:"abcdefghijkmnopqrstuvwxyz2345679"},customAlias:{maxSize:20,regExp:/^[a-zA-Z0-9]+[a-zA-Z0-9\-]*[a-zA-Z0-9]+$/},urlMaxSize:2e3};n.exports=i},{}],2:[function(t,n,e){"use strict";function i(t,n){"undefined"==typeof n&&(n=!1);var e=!1;try{e=r(t)}catch(t){n&&console.error(t),e=!1}return e}var r=t("./urlParserCommon").parse;n.exports.parse=i},{"./urlParserCommon":3}],3:[function(t,n,e){(function(i){var r=function(){function t(){this.yy={}}var n=function(t,n,e,i){for(e=e||{},i=t.length;i--;e[t[i]]=n);return e},e=[1,8],i=[5,7],r=[5,7,9],s=[5,7,9,14],o=[2,14],a=[1,17],l=[1,19],c=[1,23],h=[1,32],u=[2,13],p=[1,36],f=[2,19],m={trace:function(){},yy:{},symbols_:{error:2,input:3,EMAIL:4,EOF:5,url:6,HASHEND:7,baseurlWithPath:8,"?":9,querystring:10,KEYVALUEPAIR:11,"&":12,baseurl:13,URLPATH:14,hostname:15,HTTP:16,loginpassword:17,port:18,":":19,IDENTIFIER:20,"-":21,".":22,password:23,"@":24,PASSWORD_SPECIAL:25,$accept:0,$end:1},terminals_:{2:"error",4:"EMAIL",5:"EOF",7:"HASHEND",9:"?",11:"KEYVALUEPAIR",12:"&",14:"URLPATH",16:"HTTP",19:":",20:"IDENTIFIER",21:"-",22:".",24:"@",25:"PASSWORD_SPECIAL"},productions_:[0,[3,2],[3,3],[3,2],[6,1],[6,3],[10,1],[10,3],[8,1],[8,2],[13,1],[13,2],[13,3],[18,2],[15,1],[15,3],[15,2],[15,3],[17,4],[23,1],[23,1],[23,2],[23,2]],performAction:function(t,n,e,i,r,s,o){var a=s.length-1;switch(r){case 13:if(!/^[0-9]+$/.test(s[a]))throw"port should only contain integer numbers";if(s[a]<0||s[a]>65536)throw"port out of bounds"}},table:[{3:1,4:[1,2],6:3,8:4,13:5,15:6,16:[1,7],20:e},{1:[3]},{5:[1,9]},{5:[1,11],7:[1,10]},n(i,[2,4],{9:[1,12]}),n(r,[2,8],{14:[1,13]}),n(s,[2,10]),{15:14,17:15,20:[1,16]},n(s,o,{18:18,19:[1,20],21:a,22:l}),{1:[2,1]},{5:[1,21]},{1:[2,3]},{10:22,11:c},n(r,[2,9]),n(s,[2,11]),{15:24,20:e},n(s,o,{18:18,19:[1,25],21:a,22:l}),{15:26,20:e},n(s,[2,16]),{15:27,20:e},{20:[1,28]},{1:[2,2]},n(i,[2,5]),n(i,[2,6],{12:[1,29]}),n(s,[2,12]),{20:[1,31],23:30,25:h},n(s,[2,15]),n(s,[2,17]),n(s,u),{10:33,11:c},{24:[1,34]},n(s,u,{23:35,20:p,24:f,25:h}),{20:p,23:37,24:[2,20],25:h},n(i,[2,7]),{20:[2,18]},{24:[2,21]},{20:p,23:35,24:f,25:h},{24:[2,22]}],defaultActions:{9:[2,1],11:[2,3],21:[2,2],34:[2,18],35:[2,21],37:[2,22]},parseError:function(t,n){function e(t,n){this.message=t,this.hash=n}if(!n.recoverable)throw e.prototype=Error,new e(t,n);this.trace(t)},parse:function(t){var n=this,e=[0],i=[null],r=[],s=this.table,o="",a=0,l=0,c=0,h=2,u=1,p=r.slice.call(arguments,1),f=Object.create(this.lexer),m={yy:{}};for(var d in this.yy)Object.prototype.hasOwnProperty.call(this.yy,d)&&(m.yy[d]=this.yy[d]);f.setInput(t,m.yy),m.yy.lexer=f,m.yy.parser=this,"undefined"==typeof f.yylloc&&(f.yylloc={});var g=f.yylloc;r.push(g);var y=f.options&&f.options.ranges;"function"==typeof m.yy.parseError?this.parseError=m.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var b,v,w,k,A,_,x,I,U,S=function(){var t;return t=f.lex()||u,"number"!=typeof t&&(t=n.symbols_[t]||t),t},E={};;){if(w=e[e.length-1],this.defaultActions[w]?k=this.defaultActions[w]:(null!==b&&"undefined"!=typeof b||(b=S()),k=s[w]&&s[w][b]),"undefined"==typeof k||!k.length||!k[0]){var L="";U=[];for(_ in s[w])this.terminals_[_]&&_>h&&U.push("'"+this.terminals_[_]+"'");L=f.showPosition?"Parse error on line "+(a+1)+":\n"+f.showPosition()+"\nExpecting "+U.join(", ")+", got '"+(this.terminals_[b]||b)+"'":"Parse error on line "+(a+1)+": Unexpected "+(b==u?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(L,{text:f.match,token:this.terminals_[b]||b,line:f.yylineno,loc:g,expected:U})}if(k[0]instanceof Array&&k.length>1)throw new Error("Parse Error: multiple actions possible at state: "+w+", token: "+b);switch(k[0]){case 1:e.push(b),i.push(f.yytext),r.push(f.yylloc),e.push(k[1]),b=null,v?(b=v,v=null):(l=f.yyleng,o=f.yytext,a=f.yylineno,g=f.yylloc,c>0&&c--);break;case 2:if(x=this.productions_[k[1]][1],E.$=i[i.length-x],E._$={first_line:r[r.length-(x||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(x||1)].first_column,last_column:r[r.length-1].last_column},y&&(E._$.range=[r[r.length-(x||1)].range[0],r[r.length-1].range[1]]),A=this.performAction.apply(E,[o,l,a,m.yy,k[1],i,r].concat(p)),"undefined"!=typeof A)return A;x&&(e=e.slice(0,-1*x*2),i=i.slice(0,-1*x),r=r.slice(0,-1*x)),e.push(this.productions_[k[1]][0]),i.push(E.$),r.push(E._$),I=s[e[e.length-2]][e[e.length-1]],e.push(I);break;case 3:return!0}}return!0}},d=function(){var t={EOF:1,parseError:function(t,n){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,n)},setInput:function(t,n){return this.yy=n||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t;var n=t.match(/(?:\r\n?|\n).*/g);return n?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var n=t.length,e=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),e.length-1&&(this.yylineno-=e.length-1);var r=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:e?(e.length===i.length?this.yylloc.first_column:0)+i[i.length-e.length].length-e[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[r[0],r[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),n=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+n+"^"},test_match:function(t,n){var e,i,r;if(this.options.backtrack_lexer&&(r={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(r.yylloc.range=this.yylloc.range.slice(0))),i=t[0].match(/(?:\r\n?|\n).*/g),i&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],e=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),e)return e;if(this._backtrack){for(var s in r)this[s]=r[s];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var t,n,e,i;this._more||(this.yytext="",this.match="");for(var r=this._currentRules(),s=0;s<r.length;s++)if(e=this._input.match(this.rules[r[s]]),e&&(!n||e[0].length>n[0].length)){if(n=e,i=s,this.options.backtrack_lexer){if(t=this.test_match(e,r[s]),t!==!1)return t;if(this._backtrack){n=!1;continue}return!1}if(!this.options.flex)break}return n?(t=this.test_match(n,r[i]),t!==!1&&t):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){var t=this.conditionStack.length-1;return t>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return t=this.conditionStack.length-1-Math.abs(t||0),t>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(t,n,e,i){switch(e){case 0:return"WHITESPACE";case 1:return 16;case 2:return 4;case 3:return 5;case 4:return 7;case 5:return 14;case 6:return 11;case 7:return 21;case 8:return 22;case 9:return 19;case 10:return 24;case 11:return"/";case 12:return 9;case 13:return 12;case 14:return"=";case 15:return"_";case 16:return"+";case 17:return 20;case 18:return 25}},rules:[/^(?:\s+)/,/^(?:^((H|h)(T|t)(T|t)(P|p)(S|s)?:\/\/))/,/^(?:^([M|m][A|a][I|i][L|l][T|t][O|o]:(\/\/)?(([0-9]|[a-z]|[A-Z])+((_|-|\.)*([0-9]|[a-z]|[A-Z])+)*)+@(([0-9]|[a-z]|[A-Z])+((-)*([0-9]|[a-z]|[A-Z])+)*)(\.(([0-9]|[a-z]|[A-Z])+((-)*([0-9]|[a-z]|[A-Z])+)*))*))/,/^(?:$)/,/^(?:(#[^ ]+))/,/^(?:(\/(([0-9]|[a-z]|[A-Z]|\+|_|-|'|\.|\(|\)|%20)+\/?)*))/,/^(?:([0-9]|[a-z]|[A-Z]|_)+=([0-9]|[a-z]|[A-Z]|_|\+|%20|-|\.)+)/,/^(?:-)/,/^(?:\.)/,/^(?::)/,/^(?:@)/,/^(?:\/)/,/^(?:\?)/,/^(?:&)/,/^(?:=)/,/^(?:_\b)/,/^(?:\+)/,/^(?:([0-9]|[a-z]|[A-Z])+)/,/^(?:(%20|%21|%23|%24|%26|%27|%28|%29|%2A|%2B|%2C|%2F|%3A|%3B|%3D|%3F|%40|%5B|%5D)+)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],inclusive:!0}}};return t}();return m.lexer=d,t.prototype=m,m.Parser=t,new t}();"undefined"!=typeof t&&"undefined"!=typeof e&&(e.parser=r,e.Parser=r.Parser,e.parse=function(){return r.parse.apply(r,arguments)},e.main=function(n){n[1]||(console.log("Usage: "+n[0]+" FILE"),i.exit(1));var r=t("fs").readFileSync(t("path").normalize(n[1]),"utf8");return e.parser.parse(r)},"undefined"!=typeof n&&t.main===n&&e.main(i.argv.slice(1)))}).call(this,t("_process"))},{_process:6,fs:4,path:5}],4:[function(t,n,e){},{}],5:[function(t,n,e){(function(t){function n(t,n){for(var e=0,i=t.length-1;i>=0;i--){var r=t[i];"."===r?t.splice(i,1):".."===r?(t.splice(i,1),e++):e&&(t.splice(i,1),e--)}if(n)for(;e--;e)t.unshift("..");return t}function i(t,n){if(t.filter)return t.filter(n);for(var e=[],i=0;i<t.length;i++)n(t[i],i,t)&&e.push(t[i]);return e}var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,s=function(t){return r.exec(t).slice(1)};e.resolve=function(){for(var e="",r=!1,s=arguments.length-1;s>=-1&&!r;s--){var o=s>=0?arguments[s]:t.cwd();if("string"!=typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(e=o+"/"+e,r="/"===o.charAt(0))}return e=n(i(e.split("/"),function(t){return!!t}),!r).join("/"),(r?"/":"")+e||"."},e.normalize=function(t){var r=e.isAbsolute(t),s="/"===o(t,-1);return t=n(i(t.split("/"),function(t){return!!t}),!r).join("/"),t||r||(t="."),t&&s&&(t+="/"),(r?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(i(t,function(t,n){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},e.relative=function(t,n){function i(t){for(var n=0;n<t.length&&""===t[n];n++);for(var e=t.length-1;e>=0&&""===t[e];e--);return n>e?[]:t.slice(n,e-n+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var r=i(t.split("/")),s=i(n.split("/")),o=Math.min(r.length,s.length),a=o,l=0;l<o;l++)if(r[l]!==s[l]){a=l;break}for(var c=[],l=a;l<r.length;l++)c.push("..");return c=c.concat(s.slice(a)),c.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){var n=s(t),e=n[0],i=n[1];return e||i?(i&&(i=i.substr(0,i.length-1)),e+i):"."},e.basename=function(t,n){var e=s(t)[2];return n&&e.substr(-1*n.length)===n&&(e=e.substr(0,e.length-n.length)),e},e.extname=function(t){return s(t)[3]};var o="b"==="ab".substr(-1)?function(t,n,e){return t.substr(n,e)}:function(t,n,e){return n<0&&(n=t.length+n),t.substr(n,e)}}).call(this,t("_process"))},{_process:6}],6:[function(t,n,e){function i(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function s(t){if(u===setTimeout)return setTimeout(t,0);if((u===i||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(n){try{return u.call(null,t,0)}catch(n){return u.call(this,t,0)}}}function o(t){if(p===clearTimeout)return clearTimeout(t);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(t);try{return p(t)}catch(n){try{return p.call(null,t)}catch(n){return p.call(this,t)}}}function a(){g&&m&&(g=!1,m.length?d=m.concat(d):y=-1,d.length&&l())}function l(){if(!g){var t=s(a);g=!0;for(var n=d.length;n;){for(m=d,d=[];++y<n;)m&&m[y].run();y=-1,n=d.length}m=null,g=!1,o(t)}}function c(t,n){this.fun=t,this.array=n}function h(){}var u,p,f=n.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:i}catch(t){u=i}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(t){p=r}}();var m,d=[],g=!1,y=-1;f.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];d.push(new c(t,n)),1!==d.length||g||s(l)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=h,f.addListener=h,f.once=h,f.off=h,f.removeListener=h,f.removeAllListeners=h,f.emit=h,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},{}],7:[function(t,n,e){"use strict";var i=t("./routes"),r=t("./components/muAppFrame/muAppFrame.component"),s=t("./components/muCreate/muCreate.component"),o=t("./components/muCreated/muCreated.component"),a=t("./components/muAbout/muAbout.component"),l=t("./components/muNotFound/muNotFound.component"),c=t("./services/ShrinkUrlService"),h=t("./interceptors/responseError"),u=angular.module("shrinkUrl",["ui.router","ui.bootstrap"]);i.Init(u),c.Init(u),h.Init(u),r.Init(u),s.Init(u),o.Init(u),a.Init(u),l.Init(u)},{"./components/muAbout/muAbout.component":8,"./components/muAppFrame/muAppFrame.component":10,"./components/muCreate/muCreate.component":12,"./components/muCreated/muCreated.component":14,"./components/muNotFound/muNotFound.component":16,"./interceptors/responseError":18,"./routes":19,"./services/ShrinkUrlService":20}],8:[function(t,n,e){"use strict";function i(){}n.exports.Init=function(n){n.component("muAbout",{template:t("./muAbout.tpl.html"),transclude:!0,controller:i})}},{"./muAbout.tpl.html":9}],9:[function(t,n,e){n.exports="<div class=\"container\">\n    <h3>About Page</h3>\n    <hr>\n    <p>This page shortens URLs, provides short aliases for redirection of long URLs as well as custom aliases for such\n        URLs. The code can be found in the <a href=\"https://github.com/luisgarciaalanis/MiniURL\">GitHub page</a>.</p>\n    <br>\n    <h4><strong>Technologies used for the app backend:</strong></h4>\n    <ol>\n        <li>Node with Hapi.js web framework.</li>\n        <li>MongoDB (the reason for using a NOSQL database was because it's suppose\n            to be lightning fast when used with non relational data and it also works with cloud providers like AZURE\n            and AWS).</li>\n        <li>App written in Ecmascript 6 (ES6 - Javascript 2015) except a few files shared with the frontend.</li>\n    </ol>\n    <h4><strong>Technologies used for the app frontend:</strong></h4>\n    <ol>\n        <li>AngularJS as a single page application.</li>\n        <li>Angular ui router</li>\n        <li>Twitter Bootstrap for styling.</li>\n        <li>App written in vanilla ES5 javascript.</li>\n    </ol>\n    <h4><strong>Technologies used for deployment:</strong></h4>\n    <ol>\n        <li>Docker for easy deployment to production.</li>\n    </ol>\n    <h4><strong>Technologies I use for continuous integration:</strong></h4>\n    <ol>\n        <li>Jenkins</li>\n        <li>Dockerhub repository</li>\n    </ol>\n    <h4><strong>Technologies I use for unit testing:</strong></h4>\n    <ol>\n        <li>Mocha</li>\n        <li>Selenium web driver (Some basic tests and not integrated with Jenkins).</li>\n    </ol>\n    <br>\n    <h4><strong>How it works:</strong></h4>\n    <br>\n    <h5><strong>Data storage:</strong></h5>\n    <p>Data is stored into one of two collections, one for the custom aliased URLs and the other one for the automatic\n        generated URLs. The reason behind this decision was because more than one custom alias could potentially point\n        to the same URL; In order for MongoDB to be speedy while handling millions of entries it needs to have indexes of\n        unique data, so I kept the auto generated aliases on its on data collection, so if more than one person enters a\n        URL it can return the same alias <strong>just like TinyURL.com works</strong>. When submitting a custom alias we\n        never return the same URL if its already there, we don't care we just generate a new entry on the collection.\n    </p>\n    <p>One of the big problems is finding a way to generate the aliases in a unique way. This resulted problematic since\n        I could not find a way to do this without the possibility of alias collisions. This is why the application\n        seeds the database with random generated aliases with no URLs. It then goes and uses them as URLs are entered.\n        The cost of this design is space pre allocated on the database, I think this approach is better than generating\n        random aliases on the fly with the possibility of collissions. The amount of auto generated seeds can be\n        configured. Once the app runs out of them it insets the next batch.\n    </p>\n    <p>\n        For example if the app is configured to generate one million aliases it will generate a list of sequential\n        ordered integers, it will then randomize the list with an N log N algorithm. It will convert each number into\n        a string based on the aliases allowed characters and it will bulk insert it into the database.\n    </p>\n    <p>\n        Bulk inserting into the database is done in chunks of 1000 since its the default standard form mongo bulk\n        operations. Also it does this in a times controlled async wait to avoid blocking the app and allowing the app to\n        keep operating as soon as the first inserts are done. It also tracks how many elements have been inserted into\n        the database so that the next time the app needs to seed it nows from where to start the alias creation.\n    </p>\n    <br>\n    <h5><strong>Aliases:</strong></h5>\n    <p>\n        Aliases are generated from a subset of numbers and letters in lower case, avoiding some that could cause\n        confusion to the user. For example a '0' could be confused with an 'O', and 'l' could be confused with an 'I' or\n        even the number '1' depending on the font being used.\n    </p>\n    <p><strong>Alias valid characters (a modified set of Base32 encoding): </strong>abcdefghijkmnopqrstuvwxyz2345679</p>\n    <br>\n    <h4><strong>Wish list/ missing:</strong></h4>\n    <ol>\n        <li>More work on the parser to be smarter and more <a href=\"https://tools.ietf.org/html/rfc3986\">rfc3986</a>\n        compliant. Including IpV6 native Addresses....</li>\n        <li>More work on the parser to return an object instead of true, the object containing the parts of the URL.\n        The idea is to be more robust to prevent self injection circular denial of service attack.</li>\n        <li>More tests, and more UI tests.</li>\n    </ol>\n</div>\n"},{}],10:[function(t,n,e){"use strict";n.exports.Init=function(n){n.component("muAppFrame",{template:t("./muAppFrame.tpl.html"),transclude:!0,controller:function(){}})}},{"./muAppFrame.tpl.html":11}],11:[function(t,n,e){n.exports='<nav class="navbar navbar-inverse" role="navigation">\n    <div class="navbar-header">\n        <button type="button" class="navbar-toggle" ng-click="isNavCollapsed = !isNavCollapsed">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n        </button>\n        <a class="navbar-brand" href="/">MiniURL</a>\n    </div>\n    <div class="collapse navbar-collapse" uib-collapse="!isNavCollapsed">\n        <ul class="nav navbar-nav">\n            <li><a href="/create">Create</a></li>\n            <li><a href="/about">About</a></li>\n        </ul>\n    </div>\n</nav>\n<div ng-transclude></div>\n'},{}],12:[function(t,n,e){"use strict";function i(t,n){this.url="",this.customAlias="",this.alert=null,this.host=window.location.host,this.urlMaxSize=s.urlMaxSize,t.clear(),this.verifyUrlIsValid=function(){var t=!1;if(this.url=this.url.trim(),r.parse(this.url)){var n=this.url.toLowerCase();n.startsWith("http://")||n.startsWith("https://")||n.startsWith("mailto:")||(this.url="http://"+this.url),this.url.length<s.urlMaxSize?t=!0:this.alert={type:"danger",msg:"URL is too long, make sure the URL is less than "+s.urlMaxSize+" charactes long, including http(s)://"}}else this.alert={type:"danger",msg:"Invalid URL!"};return t},this.verifyCustomAliastIsValid=function(){var t=!1;return this.customAlias=this.customAlias.trim(),(0==this.customAlias.length||s.customAlias.regExp.test(this.customAlias))&&(t=!0),t||(this.alert={type:"danger",msg:"Invalid alias! Make sure the alias does not conain spaces or has any dashes (-) at the beginning or end."}),t},this.submitUrl=function(){this.verifyUrlIsValid()&&this.verifyCustomAliastIsValid()&&t.shrink(this.url,this.customAlias).then(function(){n.go("Created")},function(t){switch(t.status){case 500:this.alert={type:"danger",msg:"Failed to shrink the URL."};break;case 403:this.alert={type:"danger",msg:t.data.message};case 409:this.alert={type:"danger",msg:t.data.message};break;case 503:this.alert={type:"danger",msg:"MiniUrl service is not available. Try again at a later time."};break;default:this.alert={type:"danger",msg:"Unexpected Error"}}}.bind(this))},this.closeAlert=function(){this.alert=null}}var r=t("../../../lib/urlParser/urlParser"),s=t("../../../global/globals");i.$inject=["ShrinkUrlService","$state"],n.exports.Init=function(n){n.component("muCreate",{template:t("./muCreate.tpl.html"),controller:i})}},{"../../../global/globals":1,"../../../lib/urlParser/urlParser":2,"./muCreate.tpl.html":13}],13:[function(t,n,e){n.exports='<div class="container">\n    <h3>Welcome to MiniURL!</h3>\n    <p>This site helps you create a mini URL out of a standard URL. For more information about this site and the\n        technologies used to create it see the <a href="/about">About</a> page</p>\n    <hr>\n    <row>\n        <form class="col-sm-6">\n            <row>\n                <div class="form-group">\n                    <label for="urlString">Enter a long URL:</label>\n                    <input type="text" class="form-control" id="urlString" ng-model="$ctrl.url" maxlength="$ctrl.urlMaxSize">\n                </div>\n                <div class="form-group">\n                    <label for="customAlias" class="control-label">Custom alias (optional):</label>\n                    <input type="text" class="form-control" id="customAlias" ng-model="$ctrl.customAlias"\n                           maxlength="$ctrl.aliasMaxSize" placeholder="">\n                    <p class="help-block">May contain letters, numbers, and dashes, but not begin or end with dashes.\n                        the custom URL will look like: </p>\n                    <p class="help-block">http://{{ $ctrl.host }}/{{ $ctrl.customAlias }}</p>\n                </div>\n            </row>\n            <div class="form-group">\n                <button type="submit" name="MakeMiniURL" class="btn btn-primary" ng-disabled="!$ctrl.url" ng-click="$ctrl.submitUrl()">Make MiniURL!</button>\n            </div>\n        </form>\n        <div class="col-sm-12">\n            <div class="form-group">\n                <div uib-alert ng-if="$ctrl.alert" ng-class="\'alert-\' + ($ctrl.alert.type || \'warning\')" close="$ctrl.closeAlert()">{{$ctrl.alert.msg}}</div>\n            </div>\n        </div>\n    </row>\n</div>\n'},{}],14:[function(t,n,e){"use strict";function i(t,n){t.shrinkResult?(this.miniUrl="http://"+window.location.host+"/"+t.shrinkResult.alias,this.url=t.shrinkResult.url):n.go("Create")}i.$inject=["ShrinkUrlService","$state"],n.exports.Init=function(n){n.component("muCreated",{template:t("./muCreated.tpl.html"),controller:i})}},{"./muCreated.tpl.html":15}],15:[function(t,n,e){n.exports='<div class="container">\n    <h3>MiniURL created successfully!</h3>\n    <p>You can use share this url with anyone. When they click on the MiniUrl they will be redirected to the original\n    URL you provided.</p>\n    <br>\n    <p>The <strong>MiniURL</strong> is {{ ::$ctrl.miniUrl.length }} characters long while the <strong>original URL</strong> is {{ ::$ctrl.url.length }} characters long</p>\n    <p><strong>MiniURL generated:</strong> {{ ::$ctrl.miniUrl }}</p>\n    <p><a href="{{ ::$ctrl.miniUrl }}" target="_blank">Open in new window or tab</a></p>\n    <p class="wrap-words"><strong>Original URL:</strong> {{ ::$ctrl.url }}</p>\n    <hr>\n    <a class="btn btn-primary" name="CreateAnother" href="/">Create another MiniURL</a>\n</div>\n'},{}],16:[function(t,n,e){"use strict";n.exports.Init=function(n){n.component("muNotFound",{template:t("./muNotFound.tpl.html"),transclude:!0,controller:function(){}})}},{"./muNotFound.tpl.html":17}],17:[function(t,n,e){n.exports='<div class="container">\n    <h3>Error: Unable to find the URL to redirect to!</h3>\n    <p>Please check that the URL entered is correct.</p>\n</div>'},{}],18:[function(t,n,e){"use strict";function i(t){t.interceptors.push(["$q",function(t){return{responseError:function(n){return n.status==-1?t.reject({status:503}):t.reject(n)}}}])}i.$inject=["$httpProvider"],n.exports.Init=function(t){t.config(i)}},{}],19:[function(t,n,e){"use strict";function i(t,n,e){e.html5Mode(!0),n.otherwise("/");for(var i=[{name:"Create",url:"/",component:"muCreate"},{name:"Created",url:"/created",component:"muCreated"},{name:"About",url:"/about",component:"muAbout"},{name:"NotFound",url:"/notfound",component:"muNotFound"}],r=0;r<i.length;r++)t.state(i[r])}i.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],n.exports.Init=function(t){t.config(i)}},{}],20:[function(t,n,e){"use strict";function i(t){this.shrinkResult=null,this.clear=function(){this.shrinkResult=null},this.shrink=function(n,e){return t.post("/api/v1/shrink",{url:n,alias:e}).then(function(t){return this.shrinkResult=t.data,this.shrinkResult.url=n,this.shrinkResult}.bind(this))}}i.$inject=["$http"],n.exports.Init=function(t){t.service("ShrinkUrlService",i)}},{}]},{},[7]);
//# sourceMappingURL=MiniURL.js.map
