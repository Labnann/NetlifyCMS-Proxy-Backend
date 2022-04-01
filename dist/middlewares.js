#!/usr/bin/env node
module.exports=function(e){var t={};function a(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=22)}([function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.joi=t.defaultSchema=void 0;const n=i(a(3)),r=["info","entriesByFolder","entriesByFiles","getEntry","unpublishedEntries","unpublishedEntry","unpublishedEntryDataFile","unpublishedEntryMediaFile","deleteUnpublishedEntry","persistEntry","updateUnpublishedEntryStatus","publishUnpublishedEntry","getMedia","getMediaFile","persistMedia","deleteFile","deleteFiles","getDeployPreview"],s=n.default.string().required(),o=n.default.number().required(),l=n.default.bool().required(),u=s,c=s;t.defaultSchema=function({path:e=s}={}){const t=n.default.object({branch:s}),a=n.default.object({path:e,content:s,encoding:s.valid("base64")}),i=n.default.object({slug:s,path:e,raw:s,newPath:e.optional()}),d=n.default.when("action",{switch:[{is:"info",then:n.default.allow()},{is:"entriesByFolder",then:t.keys({folder:e,extension:s,depth:o}).required()},{is:"entriesByFiles",then:t.keys({files:n.default.array().items(n.default.object({path:e,label:n.default.string()})).required()})},{is:"getEntry",then:t.keys({path:e}).required()},{is:"unpublishedEntries",then:t.keys({branch:s}).required()},{is:"unpublishedEntry",then:t.keys({id:n.default.string().optional(),collection:n.default.string().optional(),slug:n.default.string().optional(),cmsLabelPrefix:n.default.string().optional()}).required()},{is:"unpublishedEntryDataFile",then:t.keys({collection:u,slug:c,id:s,path:s}).required()},{is:"unpublishedEntryMediaFile",then:t.keys({collection:u,slug:c,id:s,path:s}).required()},{is:"deleteUnpublishedEntry",then:t.keys({collection:u,slug:c}).required()},{is:"persistEntry",then:t.keys({cmsLabelPrefix:n.default.string().optional(),entry:i,dataFiles:n.default.array().items(i),assets:n.default.array().items(a).required(),options:n.default.object({collectionName:n.default.string(),commitMessage:s,useWorkflow:l,status:s}).required()}).xor("entry","dataFiles").required()},{is:"updateUnpublishedEntryStatus",then:t.keys({collection:u,slug:c,newStatus:s,cmsLabelPrefix:n.default.string().optional()}).required()},{is:"publishUnpublishedEntry",then:t.keys({collection:u,slug:c}).required()},{is:"getMedia",then:t.keys({mediaFolder:e}).required()},{is:"getMediaFile",then:t.keys({path:e}).required()},{is:"persistMedia",then:t.keys({asset:a.required(),options:n.default.object({commitMessage:s}).required()}).required()},{is:"deleteFile",then:t.keys({path:e,options:n.default.object({commitMessage:s}).required()}).required()},{is:"deleteFiles",then:t.keys({paths:n.default.array().items(e).min(1).required(),options:n.default.object({commitMessage:s}).required()}).required()},{is:"getDeployPreview",then:t.keys({collection:u,slug:c}).required()}],otherwise:n.default.forbidden()});return n.default.object({action:n.default.valid(...r).required(),params:d})},t.joi=function(e){return(t,a,i)=>{const{error:n}=e.validate(t.body,{allowUnknown:!0});if(n){const{details:e}=n,t=e.map(e=>e.message).join(",");a.status(422).json({error:t})}else i()}}},function(e,t){e.exports=require("@hapi/joi")},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.pathTraversal=void 0;const n=i(a(3)),r=i(a(0));t.pathTraversal=function(e){return n.default.extend({type:"path",base:n.default.string().required(),messages:{"path.invalid":"{{#label}} must resolve to a path under the configured repository"},validate(t,a){if(!r.default.join(e,t).startsWith(e))return{value:t,errors:a.error("path.invalid")}}}).path()}},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getUpdateDate=t.move=t.deleteFile=t.writeFile=t.listRepoFiles=void 0;const n=i(a(0)),r=a(1);async function s(e,t,a){if(a<=0)return[];try{const i=await r.promises.readdir(e,{withFileTypes:!0}),o=await Promise.all(i.map(i=>{const r=n.default.join(e,i.name);return i.isDirectory()?s(r,t,a-1):[r].filter(e=>e.endsWith(t))}));return[].concat(...o)}catch(e){return[]}}async function o(e,t){await r.promises.mkdir(n.default.dirname(t),{recursive:!0}),await r.promises.rename(e,t)}t.listRepoFiles=async function(e,t,a,i){return(await s(n.default.join(e,t),a,i)).map(t=>t.substr(e.length+1))},t.writeFile=async function(e,t){await r.promises.mkdir(n.default.dirname(e),{recursive:!0}),await r.promises.writeFile(e,t)},t.deleteFile=async function(e,t){await r.promises.unlink(n.default.join(e,t)).catch(()=>{})},t.move=async function(e,t){await o(e,t);const a=n.default.dirname(e),i=n.default.dirname(t),r=await s(a,"",100);await Promise.all(r.map(e=>o(e,e.replace(a,i))))},t.getUpdateDate=async function(e,t){return r.promises.stat(n.default.join(e,t)).then(e=>e.mtime).catch(()=>new Date)}},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.readMediaFile=t.entriesFromFiles=void 0;const n=i(a(16)),r=i(a(0)),s=a(1);function o(e){return n.default.createHash("sha256").update(e).digest("hex")}function l(e){return e.replace(/\\/g,"/")}t.entriesFromFiles=async function(e,t){return Promise.all(t.map(async t=>{try{const a=await s.promises.readFile(r.default.join(e,t.path));return{data:a.toString(),file:{path:l(t.path),label:t.label,id:o(a)}}}catch(e){return{data:null,file:{path:l(t.path),label:t.label,id:null}}}}))},t.readMediaFile=async function(e,t){const a=await s.promises.readFile(r.default.join(e,t));return{id:o(a),content:a.toString("base64"),encoding:"base64",path:l(t),name:r.default.basename(t)}}},function(e,t){e.exports=require("express")},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.registerCommonMiddlewares=void 0;const n=i(a(7)),r=i(a(9)),s=i(a(10));t.registerCommonMiddlewares=function(e,t){const{logger:a}=t,i={write:e=>{a.debug(String(e).trim())}};e.use(r.default("combined",{stream:i})),e.use(s.default()),e.use(n.default.json({limit:"50mb"}))}},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("cors")},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.registerMiddleware=t.localGitMiddleware=t.getSchema=t.validateRepo=void 0;const n=i(a(0)),r=a(1),s=a(12),o=a(13),l=i(a(14)),u=a(15),c=a(2),d=a(4),p=a(5),f=a(6);async function m(e,t){await e.add("."),await e.commit(t,void 0,{"--no-verify":null,"--no-gpg-sign":null})}async function h(e){return await e.branchLocal().then(e=>e.current)}async function g(e,t,a){const i=await h(e);try{i!==t&&await e.checkout(t);return await a()}finally{await e.checkout(i)}}function y(e){return`branch.${e}.description`}async function w(e,t,a,i,r){await Promise.all(a.map(e=>p.writeFile(n.default.join(t,e.path),e.raw))),await Promise.all(i.map(e=>p.writeFile(n.default.join(t,e.path),Buffer.from(e.content,e.encoding)))),a.every(e=>e.newPath)&&a.forEach(async e=>{await p.move(n.default.join(t,e.path),n.default.join(t,e.newPath))}),await m(e,r)}async function b(e,t){return await e.branchLocal().then(({all:e})=>e.includes(t))}async function F(e,t,a){const i=await e.diff([t,a]);return o.parse(i).map(e=>{var t,a;const i=(null===(t=e.oldPath)||void 0===t?void 0:t.replace(/b\//,""))||"",n=(null===(a=e.newPath)||void 0===a?void 0:a.replace(/b\//,""))||"",r=n||i;return{oldPath:i,newPath:n,status:e.status,newFile:"added"===e.status,path:r,id:r,binary:e.binary||/.svg$/.test(r)}})}async function M({repoPath:e}){const t=l.default(e);if(!await t.checkIsRepo())throw Error(e+" is not a valid git repository")}function j({repoPath:e}){return c.defaultSchema({path:d.pathTraversal(e)})}function v({repoPath:e,logger:t}){const a=l.default(e),i=u.withTimeout(new u.Mutex,3e3,new Error("Request timed out"));return async function(o,l){let u;try{u=await i.acquire();const{body:t}=o;if("info"===t.action)return void l.json({repo:n.default.basename(e),publish_modes:["simple","editorial_workflow"],type:"local_git"});const{branch:c}=t.params;if(!await b(a,c)){const e=`Default branch '${c}' doesn't exist`;return void l.status(422).json({error:e})}switch(t.action){case"entriesByFolder":{const i=t.params,{folder:n,extension:r,depth:s}=i,o=await g(a,c,()=>p.listRepoFiles(e,n,r,s).then(t=>f.entriesFromFiles(e,t.map(e=>({path:e})))));l.json(o);break}case"entriesByFiles":{const i=t.params,n=await g(a,c,()=>f.entriesFromFiles(e,i.files));l.json(n);break}case"getEntry":{const i=t.params,[n]=await g(a,c,()=>f.entriesFromFiles(e,[{path:i.path}]));l.json(n);break}case"unpublishedEntries":{const e=await a.branchLocal().then(e=>e.all.filter(e=>e.startsWith(s.CMS_BRANCH_PREFIX+"/")));l.json(e.map(s.contentKeyFromBranch));break}case"unpublishedEntry":{let{id:i,collection:n,slug:r,cmsLabelPrefix:o}=t.params;i&&({collection:n,slug:r}=s.parseContentKey(i));const u=s.generateContentKey(n,r),d=s.branchFromContentKey(u);if(!await b(a,d))return l.status(404).json({message:"Not Found"});{const t=await F(a,c,d),i=await a.raw(["config",y(d)]),u=i&&s.labelToStatus(i.trim(),o||""),f=t.length>=0?await g(a,d,async()=>(await Promise.all(t.map(({newPath:t})=>p.getUpdateDate(e,t)))).reduce((e,t)=>e>t?e:t)):new Date,m={collection:n,slug:r,status:u,diffs:t,updatedAt:f};l.json(m)}break}case"unpublishedEntryDataFile":{const{path:i,collection:n,slug:r}=t.params,o=s.generateContentKey(n,r),u=s.branchFromContentKey(o),[c]=await g(a,u,()=>f.entriesFromFiles(e,[{path:i}]));l.json({data:c.data});break}case"unpublishedEntryMediaFile":{const{path:i,collection:n,slug:r}=t.params,o=s.generateContentKey(n,r),u=s.branchFromContentKey(o),c=await g(a,u,()=>f.readMediaFile(e,i));l.json(c);break}case"deleteUnpublishedEntry":{const{collection:e,slug:i}=t.params,n=s.generateContentKey(e,i),r=s.branchFromContentKey(n);await h(a)===r&&await a.checkoutLocalBranch(c),await a.branch(["-D",r]),l.json({message:"deleted branch: "+r});break}case"persistEntry":{const{cmsLabelPrefix:i,entry:o,dataFiles:u=[o],assets:d,options:p}=t.params;if(p.useWorkflow){const t=u[0].slug,o=p.collectionName,l=s.generateContentKey(o,t),f=s.branchFromContentKey(l);await g(a,c,async()=>{const t=await b(a,f);t?await a.checkout(f):await a.checkoutLocalBranch(f),await async function(e,t){const a=await e.raw(["config","commit.gpgsign"]);try{"true"===a&&await e.addConfig("commit.gpgsign","false"),await e.rebase([t,"--no-verify"])}finally{"true"===a&&await e.addConfig("commit.gpgsign",a)}}(a,c);const o=(await F(a,c,f)).filter(e=>e.binary&&!d.map(e=>e.path).includes(e.path));if(await Promise.all(o.map(t=>r.promises.unlink(n.default.join(e,t.path)))),await w(a,e,u,d,p.commitMessage),!t){const e=s.statusToLabel(p.status,i||"");await a.addConfig(y(f),e)}})}else await g(a,c,async()=>{await w(a,e,u,d,p.commitMessage)});l.json({message:"entry persisted"});break}case"updateUnpublishedEntryStatus":{const{collection:e,slug:i,newStatus:n,cmsLabelPrefix:r}=t.params,o=s.generateContentKey(e,i),u=s.branchFromContentKey(o),d=s.statusToLabel(n,r||"");await a.addConfig(y(u),d),l.json({message:`${c} description was updated to ${d}`});break}case"publishUnpublishedEntry":{const{collection:e,slug:i}=t.params,n=s.generateContentKey(e,i),r=s.branchFromContentKey(n);await async function(e,t,a){const i=await e.raw(["config","commit.gpgsign"]);try{"true"===i&&await e.addConfig("commit.gpgsign","false"),await e.mergeFromTo(t,a)}finally{"true"===i&&await e.addConfig("commit.gpgsign",i)}}(a,r,c),await a.deleteLocalBranch(r),l.json({message:`branch ${r} merged to ${c}`});break}case"getMedia":{const{mediaFolder:i}=t.params,n=await g(a,c,async()=>{const t=await p.listRepoFiles(e,i,"",1);return await Promise.all(t.map(t=>f.readMediaFile(e,t)))});l.json(n);break}case"getMediaFile":{const{path:i}=t.params,n=await g(a,c,()=>f.readMediaFile(e,i));l.json(n);break}case"persistMedia":{const{asset:i,options:{commitMessage:r}}=t.params,s=await g(a,c,async()=>(await p.writeFile(n.default.join(e,i.path),Buffer.from(i.content,i.encoding)),await m(a,r),f.readMediaFile(e,i.path)));l.json(s);break}case"deleteFile":{const{path:i,options:{commitMessage:n}}=t.params;await g(a,c,async()=>{await p.deleteFile(e,i),await m(a,n)}),l.json({message:"deleted file "+i});break}case"deleteFiles":{const{paths:i,options:{commitMessage:n}}=t.params;await g(a,c,async()=>{await Promise.all(i.map(t=>p.deleteFile(e,t))),await m(a,n)}),l.json({message:"deleted files "+i.join(", ")});break}case"getDeployPreview":l.json(null);break;default:{const e="Unknown action "+t.action;l.status(422).json({error:e});break}}}catch(e){t.error(`Error handling ${JSON.stringify(o.body)}: ${e.message}`),l.status(500).json({error:"Unknown error"})}finally{u&&u()}}}t.validateRepo=M,t.getSchema=j,t.localGitMiddleware=v,t.registerMiddleware=async function(e,t){const{logger:a}=t,i=n.default.resolve(process.env.GIT_REPO_DIRECTORY||process.cwd());await M({repoPath:i}),e.post("/api/v1",c.joi(j({repoPath:i}))),e.post("/api/v1",v({repoPath:i,logger:a})),a.info("Netlify CMS Git Proxy Server configured with "+i)}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.branchFromContentKey=t.contentKeyFromBranch=t.parseContentKey=t.generateContentKey=t.statusToLabel=t.labelToStatus=t.isCMSLabel=t.MERGE_COMMIT_MESSAGE=t.DEFAULT_PR_BODY=t.CMS_BRANCH_PREFIX=void 0,t.CMS_BRANCH_PREFIX="cms",t.DEFAULT_PR_BODY="Automatically generated by Netlify CMS",t.MERGE_COMMIT_MESSAGE="Automatically generated. Merged on Netlify CMS.";function i(e){return e||"netlify-cms/"}t.isCMSLabel=function(e,t){return e.startsWith(i(t))},t.labelToStatus=function(e,t){return e.substr(i(t).length)},t.statusToLabel=function(e,t){return`${i(t)}${e}`},t.generateContentKey=function(e,t){return`${e}/${t}`},t.parseContentKey=function(e){const t=e.indexOf("/");return{collection:e.substr(0,t),slug:e.substr(t+1)}},t.contentKeyFromBranch=function(e){return e.substring((t.CMS_BRANCH_PREFIX+"/").length)},t.branchFromContentKey=function(e){return`${t.CMS_BRANCH_PREFIX}/${e}`}},function(e,t){e.exports=require("what-the-diff")},function(e,t){e.exports=require("simple-git/promise")},function(e,t){e.exports=require("async-mutex")},function(e,t){e.exports=require("crypto")},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.registerMiddleware=t.getSchema=t.localFsMiddleware=void 0;const n=i(a(0)),r=a(2),s=a(4),o=a(5),l=a(6);function u({repoPath:e,logger:t}){return async function(a,i){try{const{body:t}=a;switch(t.action){case"info":i.json({repo:n.default.basename(e),publish_modes:["simple"],type:"local_fs"});break;case"entriesByFolder":{const a=t.params,{folder:n,extension:r,depth:s}=a,u=await o.listRepoFiles(e,n,r,s).then(t=>l.entriesFromFiles(e,t.map(e=>({path:e}))));i.json(u);break}case"entriesByFiles":{const a=t.params,n=await l.entriesFromFiles(e,a.files);i.json(n);break}case"getEntry":{const a=t.params,[n]=await l.entriesFromFiles(e,[{path:a.path}]);i.json(n);break}case"persistEntry":{const{entry:a,dataFiles:r=[a],assets:s}=t.params;await Promise.all(r.map(t=>o.writeFile(n.default.join(e,t.path),t.raw))),await Promise.all(s.map(t=>o.writeFile(n.default.join(e,t.path),Buffer.from(t.content,t.encoding)))),r.every(e=>e.newPath)&&r.forEach(async t=>{await o.move(n.default.join(e,t.path),n.default.join(e,t.newPath))}),i.json({message:"entry persisted"});break}case"getMedia":{const{mediaFolder:a}=t.params,n=await o.listRepoFiles(e,a,"",1),r=await Promise.all(n.map(t=>l.readMediaFile(e,t)));i.json(r);break}case"getMediaFile":{const{path:a}=t.params,n=await l.readMediaFile(e,a);i.json(n);break}case"persistMedia":{const{asset:a}=t.params;await o.writeFile(n.default.join(e,a.path),Buffer.from(a.content,a.encoding));const r=await l.readMediaFile(e,a.path);i.json(r);break}case"deleteFile":{const{path:a}=t.params;await o.deleteFile(e,a),i.json({message:"deleted file "+a});break}case"deleteFiles":{const{paths:a}=t.params;await Promise.all(a.map(t=>o.deleteFile(e,t))),i.json({message:"deleted files "+a.join(", ")});break}case"getDeployPreview":i.json(null);break;default:{const e="Unknown action "+t.action;i.status(422).json({error:e});break}}}catch(e){t.error(`Error handling ${JSON.stringify(a.body)}: ${e.message}`),i.status(500).json({error:"Unknown error"})}}}function c({repoPath:e}){return r.defaultSchema({path:s.pathTraversal(e)})}t.localFsMiddleware=u,t.getSchema=c,t.registerMiddleware=async function(e,t){const{logger:a}=t,i=n.default.resolve(process.env.GIT_REPO_DIRECTORY||process.cwd());e.post("/api/v1",r.joi(c({repoPath:i}))),e.post("/api/v1",u({repoPath:i,logger:a})),a.info("Netlify CMS File System Proxy Server configured with "+i)}},function(e,t,a){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.createLogger=void 0;const n=i(a(19)),{combine:r,colorize:s,simple:o}=n.default.format;t.createLogger=function({level:e}){return n.default.createLogger({level:e,format:r(s(),o()),transports:[new n.default.transports.Console]})}},function(e,t){e.exports=require("winston")},,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.registerLocalFs=t.registerLocalGit=void 0;const i=a(8),n=a(11),r=a(17),s=a(18);function o(e){return{logger:s.createLogger({level:e.logLevel||"info"})}}t.registerLocalGit=async function(e,t={}){const a=o(t);i.registerCommonMiddlewares(e,a),await n.registerMiddleware(e,a)},t.registerLocalFs=async function(e,t={}){const a=o(t);i.registerCommonMiddlewares(e,a),await r.registerMiddleware(e,a)}}]);
//# sourceMappingURL=middlewares.js.map