(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{172:function(n,e){function a(n){return n?"string"==typeof n?n:n.source:null}function s(...n){return n.map(n=>a(n)).join("")}n.exports=function(n){var e={className:"number",relevance:0,variants:[{begin:/([\+\-]+)?[\d]+_[\d_]+/},{begin:n.NUMBER_RE}]},i=n.COMMENT();i.variants=[{begin:/;/,end:/$/},{begin:/#/,end:/$/}];var t={className:"variable",variants:[{begin:/\$[\w\d"][\w\d_]*/},{begin:/\$\{(.*?)}/}]},r={className:"literal",begin:/\bon|off|true|false|yes|no\b/},c={className:"string",contains:[n.BACKSLASH_ESCAPE],variants:[{begin:"'''",end:"'''",relevance:10},{begin:'"""',end:'"""',relevance:10},{begin:'"',end:'"'},{begin:"'",end:"'"}]},o={begin:/\[/,end:/\]/,contains:[i,r,t,c,e,"self"],relevance:0},l=function(...n){return"("+n.map(n=>a(n)).join("|")+")"}(/[A-Za-z0-9_-]+/,/"(\\"|[^"])*"/,/'[^']*'/);return{name:"TOML, also INI",aliases:["toml"],case_insensitive:!0,illegal:/\S/,contains:[i,{className:"section",begin:/\[+/,end:/\]+/},{begin:s(l,"(\\s*\\.\\s*",l,")*",s("(?=",/\s*=\s*[^#\s]/,")")),className:"attr",starts:{end:/$/,contains:[i,o,r,t,c,e]}}]}}}}]);