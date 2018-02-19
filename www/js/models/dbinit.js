// "tree":"lng/root,lng/name,app/kyx" // app: axs->thesaurus geo->hasc   // sector: coran proverbios medicina farmacia
// Validation: axireference ->      desc·riptor~ttag~list~zone       system·tag "stag":"axie|divs|vals|tree|mapa"
// "lngs":{"spa":"ofi","cat":"cof"} -> "use":"ofi|cof|spk|sgn|biz|dia|clq|zon"
// urlz>zone urll>lingua urlp>pyramidal urlt>event_transaction_target(kyx.dynu.net|keyax.org)
var georec = {"app":"kyx/ini","geox":"","zone":"","divs":[],"lngs":{},"mapa":{},"dat":{}};
var datccs = {"urls":{"sect":"","url":""},"tld":[],"iso":"","fon":"","post":"","ppl":{},"area":0,"bord":[],
              "cont":"","deps":[],"curr":[],"cca3":"","cioc":"","ccn3":"","latlng":[],"alts":[] }; // ,"lang":[]
var datsub = {"urlz":{"sect":"","url":""},"tld":[],"iso":"","fon":"","post":"","ppl":{},"area":0,"bord":[]};
var filter = {"app":"kyx/axs","list":"cont/part","geox":"euro/south","lng":"spa","wrd":["Europa Sur","sureuropeo"],"desc":["euro","south","filter"]};

var geolng = {"app":"kyx/ini","geox":"L/ZGH","divs":"$lng_ccs","fam":"ber","mapa":"$zgh.json","urll":{"sect":"","url":""}}; //"IRCAM","url":"http://zgh.ircam.ma/api"}
var geocom = {"app":"kyx/axs","axie":"G/ES>com","lng":"spa","wrd":"España"}; // common ofi dem cap
var geoofi = {"app":"kyx/axs","axie":"G/ES>ofi","lng":"spa","wrd":"Reino de España"};                   // official
var geoadm = {"app":"kyx/axs","axie":"G/ES>adm","lng":"spa","wrd":["país","autonomía"]};     // adm1~ccs/reg
var applbl = {"app":"kyx/sys","axie":"S/FNF","lng":"eng","wrds":"File not found" }; //  "list":"sys"
var applbl = {"app":"kyx/sys","axie":"S/FNF","lng":"spa","wrds":"Archivo no encontrado" };

var lngrut = {"app":"kyx/axs","axie":["فعل"],"lng":"ARB"}; // +morphemes -> deriv(stem)  ->inflect(word)
var lngrut = {"app":"kyx/axs","axie":["فعل"],"lng":"ENG","wrd":"do"};
var lngaxy = {"app":"kyx/axs","axie":["أسد","lion:eng"],"lng":"SPA","wrd":"león","desc":["name","animal","wild"],"mapa":{} };
//            "axie":{"root":"and|when|they|break","sufx":"-able","prfx":"un-","stem":"unbreakable","flex":"","word":"","typ":"adj|adv|art|nam|vrb" }
//            "axie":["and|when|they|break","-able","un-","flex",":eng"],"typ":"adj|adv|art|nam|vrb",
//            "etym":{"lat":"","grk":""},"obs":[""]

//        "app":"kyx/ini|geo|axs|sys|srx|bok|lrn","sect":"ling|basic|nature|science|techno|medical|social|cultur|econom|coloq",
//          urlmrk|urldox|urlpic|urlaud|urlvid|subtitle  urlmin  text  desc:axies
/*{"evt":[{"own":"session|owner_id|X509","gtg":"geotag>es/an","dts":"date_time_stamp","gps":"[lat,long]",
           "urt":"https://keyax.org/kyx/srx|ups|vot","form":{"lng+desc+CSRF+query|pers.pic|file.ext|IoTcmd"} }]}*/
var lngdok = {"app":"kyx/dok","axie":"G/ES.AN","desc":["turism"],"lng":"spa","title":"","urld":"part:1,cap:2,pag:22","txt":"Andalucía en 2020."}
var appdat_cli = {"app":"kyx/account","geo":"ES","lng":"SPA","owner":"usr","doc":{}}

//060DEH/guide+agenda+admin+vot
var geovot_srv = {"app":"kyx/vot","geot":"ES.AN","desc":["G/ES.AN","vote","apply daylight saving time?"],"obs":[""],
                              "datree":{"ES":{"AN":{"dats":{},"SE":{"dats":{},"MA":{"dats":{"MR":{"dats":{}} }}}}}},
// pyramidal data collecting system                 "dats":{"urlp":"","ppl2014":5973685,"yes":0,"no":0,"nul":0""}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var kyxini = {"ccsdiv":[],"lngdiv":[],"ccslng":{},"ccsdia":{},"ccsnat":{},"lngccs":{},"contval":{},"contdiv":[{}],"ccscont":{},
   "lstobj": (lst,dat)=>{var obj={};lst.forEach((elt)=>{obj[elt]=JSON.parse(JSON.stringify(dat));});return obj;}, // {AD:'',AE:'',...}
   "objpop": (obj,lsts)=>{Object.keys(obj).forEach((elt,idx,arr)=>{lsts[elt].forEach((val)=>{arr[idx][val]="";})});
                          /*console.log("objpop: ",obj);*/ return obj;}, // objpop(->lstobj,ccslng)
   "xyz":{"lngs":{},"ccs_com":{},"ccs_ofi":{},"ccs_dem":{},"ccs_cap":{},"ccs_admz":{} },
   "nat":{"lngs":{},"ccs_com":{},"ccs_ofi":{},"ccs_dem":{},"ccs_cap":{},"ccs_admz":{"ES":{"spa":["país","autonomía"]}}},
   "eng":{"lngs":{},"ccs_com":{},"ccs_ofi":{},"ccs_dem":{},"ccs_cap":{},"ccs_admz":{"ES":{"eng":["country","community"]}}},
   "fra":{"lngs":{},"ccs_com":{},"ccs_ofi":{},"ccs_dem":{},"ccs_cap":{},"ccs_admz":{} }
   };
var kyxwrld = {
"ES":{"dat":{"divs":["AN"]},
      "AN":{"dat":{},
            "SE":{"dat":{}
    }
  }
},
"MA":{}
};
var kyxapps = {
    "kyx/dev":{"jss":"","jsc":"","htm":"","css":"","eng":{},"spa":{}}, // admin search
    "kyx/srx":{"jss":"","jsc":"","htm":"","css":"","eng":{},"spa":{}}, // admin search
    "kyx/lrn":{"jss":"","jsc":"","htm":"","css":"","eng":{},"spa":{}}, // admin search
  };
var tenapps = {
   "keyax_org":{"website":{"jss":"","jsc":"","htm":"","css":"","eng":{},"spa":{}},
                "markets":{"jss":"","jsc":"","htm":"","css":""},
                "account":{"jss":"","jsc":"","htm":"","css":""}
               },
 };

 var tosave = [];
 const fs = require('fs');
 const path = require('path');

 var countries = fs.readFileSync(path.join(__dirname,'./')+'countriesunescaped.json', 'utf8');  // mzfs. 0.212ms fs. 0.202ms
 var countriesq = countries.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
 var countriesqp = JSON.parse(countriesq); // 0.150ms
 var recs = JSON.stringify(countriesqp[0]); // 0.140ms
 console.log("countriesqp.length:",countriesqp.length); // 2.810ms

 var ccsdiv =
 ["ad","ae","af","ag","ai","al","am","ao","aq","ar",
 "as","at","au","aw","ax","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bm","bn","bo","br","bs","bt","bv",
 "bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cr","cu","cv","cx","cy","cz","de",
 "dj","dk","dm","do","dz","ec","ee","eg","er","es","et","fi","fj","fk","fm","fo","fr","ga","gb","gd","ge",
 "gf","gg","gh","gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id",
 "ie","il","im","in","io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw",
 "ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","mk","ml","mm",
 "mn","mo","mp","mq","mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","nf","ng","ni","nl","no","np",
 "nr","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","ps","pt","pw","py","qa","re","ro","rs",
 "ru","rw","sa","sb","sc","sd","se","sg","si","sj","sk","sl","sm","sn","so","sr","st","sv","sy","sz",
 "tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tr","tt","tv","tw","tz","ua","ug","us","uy",
 "uz","va","vc","ve","vg","vi","vn","vu","wf","ws","ye","yt","za","zm","zw","ac","sh","cw","sx","bl","mf","eh","ss","um","xk"];
// "eu" "su"->"ru" "tp"->"tl" "ac"+"sh"+"uk"->"gb" "yu" |||  CW SX   BL MF  SS EH  XK kosovo.kv UM usminor islands not used
// "an" Antilles .nl->("bq"->.nl BES islands not used)+"aw" Aruba indep+"cw"Curaçao indep+"sx" StMartin indep
//"BL"->.fr St-Barth,"MF"->.fr StMartin not used, "XK","SS"southsudan removed, "EH"westSahara reserved,
ccsdiv.forEach((xcc,idx,aray)=>{aray[idx]=aray[idx].toUpperCase();});
ccsdiv=ccsdiv.sort();  console.log("ccsdiv length: ",ccsdiv.length); console.log("ccsdiv sorted: ",JSON.stringify(ccsdiv)); //  250 ccs

var lngdiv =  // "ipa" "ipr" ipa arabic // 188 elements
 ["aar","abk","afr","aka","amh","arb","arg","asm","ava",
 "ave","aym","aze","bak","bam","bel","ben","bih","bis","bod","bos","bre","bul","cat","ces","cha","che","chu",
 "chv","cor","cos","cre","cym","dan","deu","div","dzo","ell","eng","eng","epo","est","eus","ewe","fao","fas",
 "fij","fin","fra","fry","ful","gla","gle","glg","glv","grn","guj","hat","hau","hbs","heb","her","hin","hmo",
 "hrv","hun","hye","ibo","ido","iii","iku","ile","ina","ind","ipk","isl","ita","jav","jpn","kal","kan","kas",
 "kat","kau","kaz","khm","kik","kin","kir","kom","kon","kor","kua","kur","lao","lat","lav","lim","lin","lit",
 "ltz","lub","lug","mah","mal","mar","mkd","mlg","mlt","mol","mon","mri","msa","mya","nau","nav","nbl","nde",
 "ndo","nep","nld","nno","nob","nor","nya","oci","oji","ori","orm","oss","pan","pli","pol","por","pus","que",
 "roh","ron","run","rus","sag","san","sin","slk","slv","sme","smo","sna","snd","som","sot","spa","sqi","srd",
 "srp","ssw","sun","swa","swe","tah","tam","tat","tel","tgk","tgl","tha","tir","ton","tsn","tso","tuk","tur",
 "twi","uig","ukr","urd","uzb","ven","vie","vol","wln","wol","xho","yid","yor","zgh","zha","zho","zul",
 "ara","prs","bar","pap","bjz","lua","gsw","rar","cmn","cmp","hif","nfr","arc","ckb","nrf","jam","gil","zdj",
 "ber","cal","mfe","hgm","kwn","loz","mey","pih","smi","niu","nzs","tpi","fil","pau","crs","tkl","tet","tvl","nso",
 "bwg","kck","khi","ndc","toi","zib"];
 //zho chinese macrolanguage:Mandarin Chinese [cmn],(Pinyin Chinese Mandarin[cmp]),Min Dong Chinese [cdo],Jinyu Chinese [cjy],Pu-Xian Chinese [cpx],Huizhou Chinese [czh],
 //Min Zhong Chinese [czo],Gan Chinese [gan],Hakka Chinese [hak],Xiang Chinese [hsn],Min Bei Chinese [mnp],Min Nan Chinese [nan],Yue Chinese [yue],Wu Chinese [wuu].
 // "glb" all langs "flt" flattened tree // "nat" national=native=official=general "reg" regional=local
// console.log("languages list lngdiv:",lngdiv.length); // 231 as lngeng lngfra

/* // extract continent + subregion
var conts={};countriesqp.forEach((x)=>{
     if(!conts[x.region])conts[x.region]={};
     if(!conts[x.region][x.subregion])conts[x.region][x.subregion]=[];
     conts[x.region][x.subregion].push(x.cca2)
})
console.log("conts:\n",JSON.stringify(conts));
*/
var deps =  //  46 dependent territories from 250 ccsdiv & 248 mledoze unescaped + ac sh -> gb
{
  "NZ":["CK","NU","TK"],  // Ross Islands in Antartica
  "NO":["BV","SJ"],      //
  "GB":["AC","AI","BM","IO","VG","KY","FK","GI","MS","PN","SH","TC","GS","GG","JE","IM"],
  "US":["GU","MP","PR","VI","AS","UM"],
  "AU":["CX","CC","NF"],
  "CN":["HK","MO"],
  "DK":["FO","GL"],
  "FI":["AX"],
  "FR":["BL","MF","PM","WF","PF","NC","TF"],
  "NL":["AW","CW","SX"],
  "MA":["EH"]
};

var cont_val = {"lng":"nap","geo":"wrld","app":"kyx/ini","list":"cont/vals","vals":{  //  "ttags":"wrld cont part vals",
  "afri":{"north":["DZ","EG","EH","LY","MA","SD","TN"],
          "west" :["AC","BF","BJ","CI","CV","GH","GM","GN","GW","LR","ML","MR","NE","NG","SH","SL","SN","TG"],
          "centr":["AO","CF","CM","CD","CG","GA","GQ","SS","ST","TD"],
          "east": ["BI","KM","DJ","ER","ET","IO","KE","MG","MZ","MU","MW","YT","RE","RW","SO","SC","TZ","UG","ZM","ZW"],
          "south":["BW","LS","NA","SZ","ZA"]},
  "amer":{"north":["BM","CA","GL","PM","UM","US"],
          "centr":["BZ","CR","GT","HN","MX","NI","PA","SV"],
          "carib":["AW","AI","AG","BS","BL","BB","CU","CW","KY","DM","DO","GP","GD","HT","JM","KN","LC","MF","MS","MQ","PR","SX","TC","TT","VC","VG","VI"],
          "south":["AR","BO","BR","CL","CO","EC","FK","GF","GY","PE","PY","GS","SR","UY","VE"]},
  "asia":{"west": ["AE","AM","AZ","BH","GE","IQ","IL","JO","KW","LB","OM","PS","QA","SA","SY","TR","YE"],
          "centr":["KZ","KG","TJ","TM","UZ"],
          "east": ["CN","HK","JP","KR","MO","MN","KP","TW"],
          "south":["AF","BD","BT","IN","IR","LK","MV","NP","PK"],
          "seast":["BN","ID","KH","LA","MM","MY","PH","SG","TH","TL","VN"]},
  "euro":{"north":["AX","DK","EE","FI","FO","GB","GG","IM","IE","IS","JE","LT","LV","NO","SJ","SE"],
          "west": ["AT","BE","CH","DE","FR","LI","LU","MC","NL"],
          "east": ["BG","BY","CY","CZ","HU","XK","MD","PL","RO","RU","SK","UA"],
          "south":["AL","AD","BA","ES","GI","GR","HR","IT","MK","MT","ME","PT","SM","RS","SI","VA"]},
  "ocea":{"austnz":["AU","CC","CX","NF","NZ"],
          "melanesia":["FJ","NC","PG","SB","VU"],
          "polynesia":["AS","CK","NU","PN","PF","TK","TO","TV","WF","WS"],
          "micronesia":["FM","GU","KI","MH","MP","NR","PW"]},
 "antartica":["AQ","TF","BV","HM"]
}}

var contdiv =  //  "lng":"nap",  cont/part | euro/south ->   axie ~ desc
[{"geo":"afri/north","app":"kyx/ini","list":"cont/part","divs":["DZ","EG","EH","LY","MA","SD","TN"]},
 {"geo":"afri/west", "app":"kyx/ini","list":"cont/part","divs":["AC","BF","BJ","CI","CV","GH","GM","GN","GW","LR","ML","MR","NE","NG","SH","SL","SN","TG"]},
 {"geo":"afri/centr","app":"kyx/ini","list":"cont/part","divs":["AO","CD","CF","CG","CM","GA","GQ","SS","ST","TD"]},
 {"geo":"afri/east", "app":"kyx/ini","list":"cont/part","divs":["BI","DJ","ER","ET","IO","KE","KM","MG","MU","MW","MZ","RE","RW","SO","SC","TZ","UG","YT","ZM","ZW"]},
 {"geo":"afri/south","app":"kyx/ini","list":"cont/part","divs":["BW","LS","NA","SZ","ZA"]},
 {"geo":"amer/north","app":"kyx/ini","list":"cont/part","divs":["BM","CA","GL","PM","UM","US"]},
 {"geo":"amer/centr","app":"kyx/ini","list":"cont/part","divs":["BZ","CR","GT","HN","MX","NI","PA","SV"]},
 {"geo":"amer/carib","app":"kyx/ini","list":"cont/part","divs":["AI","AG","AW","BB","BL","BS","CU","CW","DM","DO","GD","GP","HT","JM","KN","KY","LC","MF","MS","MQ","PR","SX","TC","TT","VC","VG","VI"]},
 {"geo":"amer/south","app":"kyx/ini","list":"cont/part","divs":["AR","BO","BR","CL","CO","EC","FK","GF","GS","GY","PE","PY","SR","UY","VE"]},
 {"geo":"asia/west", "app":"kyx/ini","list":"cont/part","divs":["AE","AM","AZ","BH","GE","IQ","IL","JO","KW","LB","OM","PS","QA","SA","SY","TR","YE"]},
 {"geo":"asia/centr","app":"kyx/ini","list":"cont/part","divs":["KZ","KG","TJ","TM","UZ"]},
 {"geo":"asia/east", "app":"kyx/ini","list":"cont/part","divs":["CN","HK","JP","KR","MO","MN","KP","TW"]},
 {"geo":"asia/south","app":"kyx/ini","list":"cont/part","divs":["AF","BD","BT","IN","IR","LK","MV","NP","PK"]},
 {"geo":"asia/seast","app":"kyx/ini","list":"cont/part","divs":["BN","ID","KH","LA","MM","MY","PH","SG","TH","TL","VN"]},
 {"geo":"euro/north","app":"kyx/ini","list":"cont/part","divs":["AX","DK","EE","FI","FO","GB","GG","IE","IM","IS","JE","LT","LV","NO","SE","SJ"]},
 {"geo":"euro/west", "app":"kyx/ini","list":"cont/part","divs":["AT","BE","CH","DE","FR","LI","LU","MC","NL"]},
 {"geo":"euro/east", "app":"kyx/ini","list":"cont/part","divs":["BG","BY","CY","CZ","HU","MD","PL","RO","RU","SK","UA","XK"]},
 {"geo":"euro/south","app":"kyx/ini","list":"cont/part","divs":["AD","AL","BA","ES","GI","GR","HR","IT","ME","MK","MT","PT","SI","SM","RS","VA"]},
 {"geo":"ocea/austnz", "app":"kyx/ini","list":"cont/part","divs":["AU","CC","CX","NF","NZ"]},
 {"geo":"ocea/melanesia", "app":"kyx/ini","list":"cont/part","divs":["FJ","NC","PG","SB","VU"]},
 {"geo":"ocea/polynesia", "app":"kyx/ini","list":"cont/part","divs":["AS","CK","NU","PF","PN","TK","TO","TV","WF","WS"]},
 {"geo":"ocea/micronesia","app":"kyx/ini","list":"cont/part","divs":["FM","GU","KI","MH","MP","NR","PW"]},
 {"geo":"antartica/nap","app":"kyx/ini","list":"cont/part","divs":["AQ","BV","HM","TF"]}
];

var euroeu = {"lng":"nap","geo":"euro/eu","app":"kyx/ini","list":"cont/eu","divs":[]};
    euroeu.divs = ["AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GR","HR","HU",
                   "IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK","GB"];
var euronoeu = {"lng":"nap","geo":"euro/noeu","app":"kyx/ini","list":"cont/noeu","divs":[]};
    euronoeu.divs = ["AD","AL","AX","BA","BY","CH","FO","GG","GI","IM","IS","JE","LI","MC",
                     "MD","ME","MK","NO","RS","RU","SJ","SM","UA","VA","XK"];

 //var ccs_div = {"colid":"geo/ini","tree":"geo/wrld/divs","divs":["es","ma"]};
 var ccs_div = {"lng":"ini","geo":"ini","app":"kyx/ini", "list":"ccs/div", "divs":[]}; ccs_div.divs = ccsdiv;
 var lng_div = {"lng":"ini","geo":"ini","app":"kyx/ini", "list":"lng/div", "divs":[]}; lng_div.divs = lngdiv.sort();
 var ccs_lng = {"lng":"ini","geo":"ini","app":"kyx/ini","list":"ccs/lng", "vals":{}};
 var ccs_nat = {"lng":"ini","geo":"ini","app":"kyx/ini","list":"ccs/nat", "vals":{}};
 var lng_ccs = {"lng":"ini","geo":"ini","app":"kyx/ini","list":"lng/ccs", "vals":{}}; //lngdiv.forEach((x)=>{lng_ccs.vals[x]=[];});
 var ccs_cont= {"lng":"ini","geo":"ini","app":"kyx/ini","list":"ccs/cont","vals":{}};

 /* var countcc; var clist=[],cerror={};
 ccs_div.divs.forEach((cc)=>{countcc++;countriesqp.forEach((cdat)=>{if(cdat.cca2==cc.toUpperCase())clist.push(cdat.cca2);})
                         if(cc.toUpperCase()!=clist[clist.length-1]){cerror[cc]="cc not found in unescaped list!:";}});
 */
 kyxini.contval = cont_val.vals; tosave.push(cont_val);
 kyxini.contdiv = contdiv; tosave = tosave.concat(contdiv);
 ccs_cont.vals = kyxini.lstobj(kyxini.ccsdiv,{});  // create country list filter ccsdiv
 contdiv.forEach((reg)=>{reg.divs.forEach((ccs)=>{ccs_cont.vals[ccs]=reg.geo;}) });
 kyxini.ccscont = ccs_cont.vals; tosave.push(ccs_cont);
 tosave.push(euroeu,euronoeu);
 // console.log("tosave:",tosave.length,tosave[tosave.length-1]);

 tosave.push(ccs_div,lng_div,);
 kyxini.ccsdiv = ccs_div.divs; kyxini.lngdiv = lng_div.divs;

 ccs_lng.vals = kyxini.lstobj(kyxini.ccsdiv,[]);
 ccs_nat.vals = kyxini.lstobj(kyxini.ccsdiv,{});
 lng_ccs.vals = kyxini.lstobj(kyxini.lngdiv,[]);
 countriesqp.forEach((cdat)=>{var ccod = cdat.cca2;
                              ccs_lng.vals[ccod] = Object.keys(cdat.languages);
                              ccs_lng.vals[ccod].forEach((lngx,idx,aray)=>
                                     {
                                      if(lngx=="ara")aray[idx]="arb"; if(lngx=="ber")aray[idx]="zgh";
                                      ccs_nat.vals[ccod][aray[idx]]="";
                                      if(!lng_ccs.vals[aray[idx]]){lng_ccs.vals[aray[idx]]=[];
                                                        console.log("lng added: ",aray[idx]);}
                                      lng_ccs.vals[aray[idx]].push(ccod);
                                 } );
                            } );
tosave.push(ccs_lng,ccs_nat,lng_ccs);
kyxini.ccslng = ccs_lng.vals; // console.log("ccs_lng.vals: ",ccs_lng.vals); // {ES:['spa','cat','eus','glg','oci'],...}
kyxini.ccsnat = ccs_nat.vals; // console.log("ccs_nat.vals: ",ccs_nat.vals); // {MA:{arb:'',zgh:''},...}
kyxini.lngccs = lng_ccs.vals; // console.log("lng_ccs.vals: ",lng_ccs.vals); // {ita:['IT','CH','SM','VA'],...}
var cnt=0;Object.keys(lng_ccs.vals).forEach((key,index)=>{if(lng_ccs.vals[key].length > 0)cnt++});console.log("active lngccs: ",cnt); //cnt->155 lngs

 kyxini.eng.ccs_com = kyxini.lstobj(kyxini.ccsdiv,"");
 kyxini.eng.ccs_ofi = kyxini.lstobj(kyxini.ccsdiv,"");
 kyxini.eng.ccs_dem = kyxini.lstobj(kyxini.ccsdiv,"");
 kyxini.eng.ccs_cap = kyxini.lstobj(kyxini.ccsdiv,"");
 kyxini.nat.ccs_com = kyxini.objpop(kyxini.lstobj(kyxini.ccsdiv,{}),kyxini.ccslng);  // objpop(->lstobj,ccslng)
 kyxini.nat.ccs_ofi = kyxini.objpop(kyxini.lstobj(kyxini.ccsdiv,{}),kyxini.ccslng);  // objpop(->lstobj,ccslng)
 countriesqp.forEach((cdat)=>{var ccod = cdat.cca2;
                              kyxini.eng.ccs_com[ccod]=cdat.name.common;
                              kyxini.eng.ccs_ofi[ccod]=cdat.name.official;
                              kyxini.eng.ccs_dem[ccod]=cdat.demonym;
                              kyxini.eng.ccs_cap[ccod]=cdat.capital;
                              Object.keys(cdat.name.native).forEach((lng)=>{var lngd = lng;
                                 if(lngd=="ara")lngd="arb"; if(lngd=="ber")lngd="zgh";
                                 kyxini.nat.ccs_com[ccod][lngd] = cdat.name.native[lng].common;
                                 kyxini.nat.ccs_ofi[ccod][lngd] = cdat.name.native[lng].official;}); // ->  [key, value]
                              Object.keys(cdat.translations).forEach((lng)=>{var lngd = lng;
                                 if(lngd=="ara")lngd="arb"; if(lngd=="ber")lngd="zgh";
                                 if(!kyxini[lngd])kyxini[lngd]=JSON.parse(JSON.stringify(kyxini.xyz));
                                 kyxini[lngd].ccs_com[ccod] = cdat.translations[lng].common;
                                 kyxini[lngd].ccs_ofi[ccod] = cdat.translations[lng].official;}); // ->  [key, value]
                      } );

// console.log("Object.keys(kyxini): ",Object.keys(kyxini)); // 'eng','spa','fra','deu','nld','fin','ita','por','rus','jpn','hrv','cym'
// console.log("kyxini.rus): ",JSON.stringify(kyxini.rus));
// console.log("kyxini.nat.ccs_com: ",kyxini.fra.ccs_com);

var listnat =  [{"VALUE":"eng","LEXIC":"English"},{"VALUE":"fra","LEXIC":"Français"},{"VALUE":"aar","LEXIC":"Afaraf"},{"VALUE":"abk","LEXIC":"Аҧсуа"},{"VALUE":"ave","LEXIC":"Avesta"},{"VALUE":"afr","LEXIC":"Afrikaans"},{"VALUE":"aka","LEXIC":"Akan"},{"VALUE":"amh","LEXIC":"አማርኛ"},{"VALUE":"arg","LEXIC":"Aragonés"},{"VALUE":"arb","LEXIC":"‫العربية"},{"VALUE":"asm","LEXIC":"অসমীয়া"},{"VALUE":"ava","LEXIC":"авар мацӀ ; магӀарул"},{"VALUE":"aym","LEXIC":"Aymar aru"},{"VALUE":"aze","LEXIC":"Azərbaycan dili"},{"VALUE":"bak","LEXIC":"башҡорт теле"},{"VALUE":"bel","LEXIC":"Беларуская"},{"VALUE":"bul","LEXIC":"български език"},{"VALUE":"bih","LEXIC":"भोजपुरी"},{"VALUE":"bis","LEXIC":"Bislama"},{"VALUE":"bam","LEXIC":"Bamanankan"},{"VALUE":"ben","LEXIC":"বাংলা"},{"VALUE":"bod","LEXIC":"བོད་ཡིག"},{"VALUE":"bre","LEXIC":"Brezhoneg"},{"VALUE":"bos","LEXIC":"Bosanski jezik"},{"VALUE":"cat","LEXIC":"Català"},{"VALUE":"che","LEXIC":"нохчийн мотт"},{"VALUE":"cha","LEXIC":"Chamoru"},{"VALUE":"cos","LEXIC":"Corsu ; lingua corsa"},{"VALUE":"cre","LEXIC":"ᓀᐦᐃᔭᐍᐏᐣ"},{"VALUE":"ces","LEXIC":"Česky ; čeština"},{"VALUE":"chu","LEXIC":"Словѣньскъ"},{"VALUE":"chv","LEXIC":"чӑваш чӗлхи"},{"VALUE":"cym","LEXIC":"Cymraeg"},{"VALUE":"dan","LEXIC":"Dansk"},{"VALUE":"deu","LEXIC":"Deutsch"},{"VALUE":"div","LEXIC":"‫ދިވެހި"},{"VALUE":"dzo","LEXIC":"རྫོང་ཁ"},{"VALUE":"ewe","LEXIC":"Ɛʋɛgbɛ"},{"VALUE":"ell","LEXIC":"Ελληνικά"},{"VALUE":"eng","LEXIC":"English"},{"VALUE":"epo","LEXIC":"Esperanto"},{"VALUE":"spa","LEXIC":"Español; castellano"},{"VALUE":"est","LEXIC":"Eesti keel"},{"VALUE":"eus","LEXIC":"Euskara"},{"VALUE":"fas","LEXIC":"‫فارسی"},{"VALUE":"ful","LEXIC":"Fulfulde"},{"VALUE":"fin","LEXIC":"Suomen kieli"},{"VALUE":"fij","LEXIC":"Vosa Vakaviti"},{"VALUE":"fao","LEXIC":"Føroyskt"},{"VALUE":"fra","LEXIC":"Français ; langue fr"},{"VALUE":"fry","LEXIC":"Frysk"},{"VALUE":"gle","LEXIC":"Gaeilge"},{"VALUE":"gla","LEXIC":"Gàidhlig"},{"VALUE":"glg","LEXIC":"Galego"},{"VALUE":"grn","LEXIC":"Avañe'ẽ"},{"VALUE":"guj","LEXIC":"ગુજરાતી"},{"VALUE":"glv","LEXIC":"Ghaelg"},{"VALUE":"hau","LEXIC":"‫هَوُسَ"},{"VALUE":"heb","LEXIC":"‫עברית"},{"VALUE":"hin","LEXIC":"हिन्दी ; हिंदी"},{"VALUE":"hmo","LEXIC":"Hiri Motu"},{"VALUE":"hrv","LEXIC":"Hrvatski"},{"VALUE":"hat","LEXIC":"Kreyòl ayisyen"},{"VALUE":"hun","LEXIC":"magyar"},{"VALUE":"hye","LEXIC":"Հայերեն"},{"VALUE":"her","LEXIC":"Otjiherero"},{"VALUE":"ina","LEXIC":"Interlingua"},{"VALUE":"ind","LEXIC":"Bahasa Indonesia"},{"VALUE":"ile","LEXIC":"Interlingue"},{"VALUE":"ibo","LEXIC":"Igbo"},{"VALUE":"iii","LEXIC":"ꆇꉙ"},{"VALUE":"ipk","LEXIC":"Iñupiaq ; Iñupiatun"},{"VALUE":"ido","LEXIC":"Ido"},{"VALUE":"isl","LEXIC":"Íslenska"},{"VALUE":"ita","LEXIC":"Italiano"},{"VALUE":"iku","LEXIC":"ᐃᓄᒃᑎᑐᑦ"},{"VALUE":"jpn","LEXIC":"日本語 (にほんご)"},{"VALUE":"jav","LEXIC":"Basa Jawa"},{"VALUE":"kat","LEXIC":"ქართული"},{"VALUE":"kon","LEXIC":"KiKongo"},{"VALUE":"kik","LEXIC":"Gĩkũyũ"},{"VALUE":"kua","LEXIC":"Kuanyama"},{"VALUE":"kaz","LEXIC":"Қазақ тілі"},{"VALUE":"kal","LEXIC":"Kalaallisut ; kalaal"},{"VALUE":"khm","LEXIC":"ភាសាខ្មែរ"},{"VALUE":"kan","LEXIC":"ಕನ್ನಡ"},{"VALUE":"kor","LEXIC":"한국어 (韓國語) ; 조선말 (朝鮮語"},{"VALUE":"kau","LEXIC":"Kanuri"},{"VALUE":"kas","LEXIC":"कश्मीरी ; كشميري"},{"VALUE":"kur","LEXIC":"Kurdî ; كوردی"},{"VALUE":"kom","LEXIC":"коми кыв"},{"VALUE":"cor","LEXIC":"Kernewek"},{"VALUE":"kir","LEXIC":"кыргыз тили"},{"VALUE":"lat","LEXIC":"Latine ; lingua lati"},{"VALUE":"ltz","LEXIC":"Lëtzebuergesch"},{"VALUE":"lug","LEXIC":"Luganda"},{"VALUE":"lim","LEXIC":"Limburgs"},{"VALUE":"lin","LEXIC":"Lingála"},{"VALUE":"lao","LEXIC":"ພາສາລາວ"},{"VALUE":"lit","LEXIC":"Lietuvių kalba"},{"VALUE":"lub","LEXIC":"kiluba"},{"VALUE":"lav","LEXIC":"Latviešu valoda"},{"VALUE":"mlg","LEXIC":"Fiteny malagasy"},{"VALUE":"mah","LEXIC":"Kajin M̧ajeļ"},{"VALUE":"mri","LEXIC":"Te reo Māori"},{"VALUE":"mkd","LEXIC":"македонски јазик"},{"VALUE":"mal","LEXIC":"മലയാളം"},{"VALUE":"mon","LEXIC":"Монгол"},{"VALUE":"mol","LEXIC":"лимба молдовеняскэ"},{"VALUE":"mar","LEXIC":"मराठी"},{"VALUE":"msa","LEXIC":"Bahasa Melayu ; بهاس"},{"VALUE":"mlt","LEXIC":"Malti"},{"VALUE":"mya","LEXIC":"ဗမာစာ"},{"VALUE":"nau","LEXIC":"Ekakairũ Naoero"},{"VALUE":"nob","LEXIC":"Norsk bokmål"},{"VALUE":"nde","LEXIC":"isiNdebele"},{"VALUE":"nep","LEXIC":"नेपाली"},{"VALUE":"ndo","LEXIC":"Owambo"},{"VALUE":"nld","LEXIC":"Nederlands"},{"VALUE":"nno","LEXIC":"Norsk nynorsk"},{"VALUE":"nor","LEXIC":"Norsk"},{"VALUE":"nbl","LEXIC":"Ndébélé"},{"VALUE":"nav","LEXIC":"Diné bizaad ; Dinékʼ"},{"VALUE":"nya","LEXIC":"ChiCheŵa ; chinyanja"},{"VALUE":"oci","LEXIC":"Occitan"},{"VALUE":"oji","LEXIC":"ᐊᓂᔑᓈᐯᒧᐎᓐ"},{"VALUE":"orm","LEXIC":"Afaan Oromoo"},{"VALUE":"ori","LEXIC":"ଓଡ଼ିଆ"},{"VALUE":"oss","LEXIC":"Ирон æвзаг"},{"VALUE":"pan","LEXIC":"ਪੰਜਾਬੀ ; پنجابی"},{"VALUE":"pli","LEXIC":"पािऴ"},{"VALUE":"pol","LEXIC":"Polski"},{"VALUE":"pus","LEXIC":"‫پښتو"},{"VALUE":"por","LEXIC":"Português"},{"VALUE":"que","LEXIC":"Runa Simi ; Kichwa"},{"VALUE":"roh","LEXIC":"Rumantsch grischun"},{"VALUE":"run","LEXIC":"kiRundi"},{"VALUE":"ron","LEXIC":"Română"},{"VALUE":"rus","LEXIC":"русский язык"},{"VALUE":"kin","LEXIC":"Kinyarwanda"},{"VALUE":"san","LEXIC":"संस्कृतम्"},{"VALUE":"srd","LEXIC":"sardu"},{"VALUE":"snd","LEXIC":"सिन्धी ; ‫سنڌي، سندھ"},{"VALUE":"sme","LEXIC":"Davvisámegiella"},{"VALUE":"sag","LEXIC":"Yângâ tî sängö"},{"VALUE":"sin","LEXIC":"සිංහල"},{"VALUE":"slk","LEXIC":"Slovenčina"},{"VALUE":"slv","LEXIC":"Slovenščina"},{"VALUE":"smo","LEXIC":"Gagana fa'a Samoa"},{"VALUE":"sna","LEXIC":"chiShona"},{"VALUE":"som","LEXIC":"Soomaaliga ; af Soom"},{"VALUE":"sqi","LEXIC":"Shqip"},{"VALUE":"srp","LEXIC":"српски језик"},{"VALUE":"ssw","LEXIC":"SiSwati"},{"VALUE":"sot","LEXIC":"seSotho"},{"VALUE":"sun","LEXIC":"Basa Sunda"},{"VALUE":"swe","LEXIC":"Svenska"},{"VALUE":"swa","LEXIC":"Kiswahili"},{"VALUE":"tam","LEXIC":"தமிழ்"},{"VALUE":"tel","LEXIC":"తెలుగు"},{"VALUE":"tgk","LEXIC":"тоҷикӣ ; toğikī ; ‫ت"},{"VALUE":"tha","LEXIC":"ไทย"},{"VALUE":"tir","LEXIC":"ትግርኛ"},{"VALUE":"tuk","LEXIC":"Türkmen ; Түркмен"},{"VALUE":"tgl","LEXIC":"Tagalog"},{"VALUE":"tsn","LEXIC":"seTswana"},{"VALUE":"ton","LEXIC":"faka Tonga"},{"VALUE":"tur","LEXIC":"Türkçe"},{"VALUE":"tso","LEXIC":"xiTsonga"},{"VALUE":"tat","LEXIC":"татарча ; tatarça ; "},{"VALUE":"twi","LEXIC":"Twi"},{"VALUE":"tah","LEXIC":"Reo Mā`ohi"},{"VALUE":"uig","LEXIC":"Uyƣurqə ; ‫ئۇيغۇرچ"},{"VALUE":"ukr","LEXIC":"українська мова"},{"VALUE":"urd","LEXIC":"‫اردو"},{"VALUE":"uzb","LEXIC":"O'zbek ; Ўзбек ; أۇز"},{"VALUE":"ven","LEXIC":"tshiVenḓa"},{"VALUE":"vie","LEXIC":"Tiếng Việt"},{"VALUE":"vol","LEXIC":"Volapük"},{"VALUE":"wln","LEXIC":"Walon"},{"VALUE":"wol","LEXIC":"Wollof"},{"VALUE":"xho","LEXIC":"isiXhosa"},{"VALUE":"yid","LEXIC":"‫ייִדיש"},{"VALUE":"yor","LEXIC":"Yorùbá"},{"VALUE":"zha","LEXIC":"Saɯ cueŋƅ ; Saw cuen"},{"VALUE":"zho","LEXIC":"中文, 汉语, 漢語"},{"VALUE":"zul","LEXIC":"isiZulu"},{"VALUE":"zgh","LEXIC":"ⵜⴰⵎⴰⵣⵉⵖⵜ"}]
var listeng = [{"VALUE":"aar","LEXIC":"Afar"},{"VALUE":"abk","LEXIC":"Abkhazian"},{"VALUE":"afr","LEXIC":"Afrikaans"},{"VALUE":"aka","LEXIC":"Akan"},{"VALUE":"amh","LEXIC":"Amharic"},{"VALUE":"arb","LEXIC":"Arabic"},{"VALUE":"arg","LEXIC":"Aragonese"},{"VALUE":"asm","LEXIC":"Assamese"},{"VALUE":"ava","LEXIC":"Avaric"},{"VALUE":"ave","LEXIC":"Avestan"},{"VALUE":"aym","LEXIC":"Aymara"},{"VALUE":"aze","LEXIC":"Azerbaijani"},{"VALUE":"bak","LEXIC":"Bashkir"},{"VALUE":"bam","LEXIC":"Bambara"},{"VALUE":"bel","LEXIC":"Belarusian"},{"VALUE":"ben","LEXIC":"Bengali"},{"VALUE":"bih","LEXIC":"Bihari"},{"VALUE":"bis","LEXIC":"Bislama"},{"VALUE":"bod","LEXIC":"Tibetan"},{"VALUE":"bos","LEXIC":"Bosnian"},{"VALUE":"bre","LEXIC":"Breton"},{"VALUE":"bul","LEXIC":"Bulgarian"},{"VALUE":"cat","LEXIC":"Catalan"},{"VALUE":"ces","LEXIC":"Czech"},{"VALUE":"cha","LEXIC":"Chamorro"},{"VALUE":"che","LEXIC":"Chechen"},{"VALUE":"chu","LEXIC":"Old Church Slavonic"},{"VALUE":"chv","LEXIC":"Chuvash"},{"VALUE":"cor","LEXIC":"Cornish"},{"VALUE":"cos","LEXIC":"Corsican"},{"VALUE":"cre","LEXIC":"Cree"},{"VALUE":"cym","LEXIC":"Welsh"},{"VALUE":"dan","LEXIC":"Danish"},{"VALUE":"deu","LEXIC":"German"},{"VALUE":"div","LEXIC":"Divehi"},{"VALUE":"dzo","LEXIC":"Dzongkha"},{"VALUE":"ell","LEXIC":"Greek"},{"VALUE":"eng","LEXIC":"English"},{"VALUE":"eng","LEXIC":"English"},{"VALUE":"epo","LEXIC":"Esperanto"},{"VALUE":"est","LEXIC":"Estonian"},{"VALUE":"eus","LEXIC":"Basque"},{"VALUE":"ewe","LEXIC":"Ewe"},{"VALUE":"fao","LEXIC":"Faroese"},{"VALUE":"fas","LEXIC":"Persian"},{"VALUE":"fij","LEXIC":"Fijian"},{"VALUE":"fin","LEXIC":"Finnish"},{"VALUE":"fra","LEXIC":"French"},{"VALUE":"fry","LEXIC":"Western Frisian"},{"VALUE":"ful","LEXIC":"Fulah"},{"VALUE":"gla","LEXIC":"Scottish Gaelic"},{"VALUE":"gle","LEXIC":"Irish"},{"VALUE":"glg","LEXIC":"Galician"},{"VALUE":"glv","LEXIC":"Manx"},{"VALUE":"grn","LEXIC":"Guarani"},{"VALUE":"guj","LEXIC":"Gujarati"},{"VALUE":"hat","LEXIC":"Haitian"},{"VALUE":"hau","LEXIC":"Hausa"},{"VALUE":"hbs","LEXIC":"Serbo-Croatian"},{"VALUE":"heb","LEXIC":"Hebrew"},{"VALUE":"her","LEXIC":"Herero"},{"VALUE":"hin","LEXIC":"Hindi"},{"VALUE":"hmo","LEXIC":"Hiri Motu"},{"VALUE":"hrv","LEXIC":"Croatian"},{"VALUE":"hun","LEXIC":"Hungarian"},{"VALUE":"hye","LEXIC":"Armenian"},{"VALUE":"ibo","LEXIC":"Igbo"},{"VALUE":"ido","LEXIC":"Ido"},{"VALUE":"iii","LEXIC":"Sichuan Yi"},{"VALUE":"iku","LEXIC":"Inuktitut"},{"VALUE":"ile","LEXIC":"Interlingue"},{"VALUE":"ina","LEXIC":"Interlingua"},{"VALUE":"ind","LEXIC":"Indonesian"},{"VALUE":"ipk","LEXIC":"Inupiaq"},{"VALUE":"isl","LEXIC":"Icelandic"},{"VALUE":"ita","LEXIC":"Italian"},{"VALUE":"jav","LEXIC":"Javanese"},{"VALUE":"jpn","LEXIC":"Japanese"},{"VALUE":"kal","LEXIC":"Kalaallisut"},{"VALUE":"kan","LEXIC":"Kannada"},{"VALUE":"kas","LEXIC":"Kashmiri"},{"VALUE":"kat","LEXIC":"Georgian"},{"VALUE":"kau","LEXIC":"Kanuri"},{"VALUE":"kaz","LEXIC":"Kazakh"},{"VALUE":"khm","LEXIC":"Khmer"},{"VALUE":"kik","LEXIC":"Kikuyu"},{"VALUE":"kin","LEXIC":"Kinyarwanda"},{"VALUE":"kir","LEXIC":"Kirghiz"},{"VALUE":"kom","LEXIC":"Komi"},{"VALUE":"kon","LEXIC":"Kongo"},{"VALUE":"kor","LEXIC":"Korean"},{"VALUE":"kua","LEXIC":"Kwanyama"},{"VALUE":"kur","LEXIC":"Kurdish"},{"VALUE":"lao","LEXIC":"Lao"},{"VALUE":"lat","LEXIC":"Latin"},{"VALUE":"lav","LEXIC":"Latvian"},{"VALUE":"lim","LEXIC":"Limburgish"},{"VALUE":"lin","LEXIC":"Lingala"},{"VALUE":"lit","LEXIC":"Lithuanian"},{"VALUE":"ltz","LEXIC":"Luxembourgish"},{"VALUE":"lub","LEXIC":"Luba-Katanga"},{"VALUE":"lug","LEXIC":"Ganda"},{"VALUE":"mah","LEXIC":"Marshallese"},{"VALUE":"mal","LEXIC":"Malayalam"},{"VALUE":"mar","LEXIC":"Marathi"},{"VALUE":"mkd","LEXIC":"Macedonian"},{"VALUE":"mlg","LEXIC":"Malagasy"},{"VALUE":"mlt","LEXIC":"Maltese"},{"VALUE":"mol","LEXIC":"Moldavian"},{"VALUE":"mon","LEXIC":"Mongolian"},{"VALUE":"mri","LEXIC":"Māori"},{"VALUE":"msa","LEXIC":"Malay"},{"VALUE":"mya","LEXIC":"Burmese"},{"VALUE":"nau","LEXIC":"Nauru"},{"VALUE":"nav","LEXIC":"Navajo"},{"VALUE":"nbl","LEXIC":"South Ndebele"},{"VALUE":"nde","LEXIC":"North Ndebele"},{"VALUE":"ndo","LEXIC":"Ndonga"},{"VALUE":"nep","LEXIC":"Nepali"},{"VALUE":"nld","LEXIC":"Dutch"},{"VALUE":"nno","LEXIC":"Norwegian Nynorsk"},{"VALUE":"nob","LEXIC":"Norwegian Bokmål"},{"VALUE":"nor","LEXIC":"Norwegian"},{"VALUE":"nya","LEXIC":"Chichewa"},{"VALUE":"oci","LEXIC":"Occitan"},{"VALUE":"oji","LEXIC":"Ojibwa"},{"VALUE":"ori","LEXIC":"Oriya"},{"VALUE":"orm","LEXIC":"Oromo"},{"VALUE":"oss","LEXIC":"Ossetian"},{"VALUE":"pan","LEXIC":"Panjabi"},{"VALUE":"pli","LEXIC":"Pāli"},{"VALUE":"pol","LEXIC":"Polish"},{"VALUE":"por","LEXIC":"Portuguese"},{"VALUE":"pus","LEXIC":"Pashto"},{"VALUE":"que","LEXIC":"Quechua"},{"VALUE":"roh","LEXIC":"Romansh"},{"VALUE":"ron","LEXIC":"Romanian"},{"VALUE":"run","LEXIC":"Kirundi"},{"VALUE":"rus","LEXIC":"Russian"},{"VALUE":"sag","LEXIC":"Sango"},{"VALUE":"san","LEXIC":"Sanskrit"},{"VALUE":"sin","LEXIC":"Sinhalese"},{"VALUE":"slk","LEXIC":"Slovak"},{"VALUE":"slv","LEXIC":"Slovene"},{"VALUE":"sme","LEXIC":"Northern Sami"},{"VALUE":"smo","LEXIC":"Samoan"},{"VALUE":"sna","LEXIC":"Shona"},{"VALUE":"snd","LEXIC":"Sindhi"},{"VALUE":"som","LEXIC":"Somali"},{"VALUE":"sot","LEXIC":"Sotho"},{"VALUE":"spa","LEXIC":"Spanish"},{"VALUE":"sqi","LEXIC":"Albanian"},{"VALUE":"srd","LEXIC":"Sardinian"},{"VALUE":"srp","LEXIC":"Serbian"},{"VALUE":"ssw","LEXIC":"Swati"},{"VALUE":"sun","LEXIC":"Sundanese"},{"VALUE":"swa","LEXIC":"Swahili"},{"VALUE":"swe","LEXIC":"Swedish"},{"VALUE":"tah","LEXIC":"Tahitian"},{"VALUE":"tam","LEXIC":"Tamil"},{"VALUE":"tat","LEXIC":"Tatar"},{"VALUE":"tel","LEXIC":"Telugu"},{"VALUE":"tgk","LEXIC":"Tajik"},{"VALUE":"tgl","LEXIC":"Tagalog"},{"VALUE":"tha","LEXIC":"Thai"},{"VALUE":"tir","LEXIC":"Tigrinya"},{"VALUE":"ton","LEXIC":"Tonga"},{"VALUE":"tsn","LEXIC":"Tswana"},{"VALUE":"tso","LEXIC":"Tsonga"},{"VALUE":"tuk","LEXIC":"Turkmen"},{"VALUE":"tur","LEXIC":"Turkish"},{"VALUE":"twi","LEXIC":"Twi"},{"VALUE":"uig","LEXIC":"Uighur"},{"VALUE":"ukr","LEXIC":"Ukrainian"},{"VALUE":"urd","LEXIC":"Urdu"},{"VALUE":"uzb","LEXIC":"Uzbek"},{"VALUE":"ven","LEXIC":"Venda"},{"VALUE":"vie","LEXIC":"Viêt Namese"},{"VALUE":"vol","LEXIC":"Volapük"},{"VALUE":"wln","LEXIC":"Walloon"},{"VALUE":"wol","LEXIC":"Wolof"},{"VALUE":"xho","LEXIC":"Xhosa"},{"VALUE":"yid","LEXIC":"Yiddish"},{"VALUE":"yor","LEXIC":"Yoruba"},{"VALUE":"zgh","LEXIC":"Tamazight"},{"VALUE":"zha","LEXIC":"Zhuang"},{"VALUE":"zho","LEXIC":"Chinese"},{"VALUE":"zul","LEXIC":"Zulu"}]
var listeng2 = [{"VALUE":"ara","LEXIC":"Arabic macrolanguage"},{"VALUE":"prs","LEXIC":"Dari"},{"VALUE":"bar","LEXIC":"Austro-Bavarian German"},{"VALUE":"pap","LEXIC":"Papiamento"},{"VALUE":"bjz","LEXIC":"Belizean Creole"},{"VALUE":"lua","LEXIC":"Tshiluba"},{"VALUE":"gsw","LEXIC":"Swiss German"},{"VALUE":"rar","LEXIC":"Cook Islands Māori"},{"VALUE":"cmn","LEXIC":"Mandarin"},{"VALUE":"hif","LEXIC":"Fiji Hindi"},{"VALUE":"nfr","LEXIC":"Guernésiais"},{"VALUE":"arc","LEXIC":"Aramaic"},
{"VALUE":"ckb","LEXIC":"Sorani"},{"VALUE":"nrf","LEXIC":"Jèrriais"},{"VALUE":"jam","LEXIC":"Jamaican Patois"},{"VALUE":"gil","LEXIC":"Gilbertese"},{"VALUE":"zdj","LEXIC":"Comorian"},{"VALUE":"ber","LEXIC":"Berber"},{"VALUE":"cal","LEXIC":"Carolinian"},{"VALUE":"mfe","LEXIC":"Mauritian Creole"},{"VALUE":"hgm","LEXIC":"Khoekhoe"},{"VALUE":"kwn","LEXIC":"Kwangali"},{"VALUE":"loz","LEXIC":"Lozi"},{"VALUE":"pih","LEXIC":"Norfuk"},{"VALUE":"smi","LEXIC":"Sami"},
{"VALUE":"niu","LEXIC":"Niuean"},{"VALUE":"nzs","LEXIC":"New Zealand Sign Language"},{"VALUE":"tpi","LEXIC":"Tok Pisin"},{"VALUE":"fil","LEXIC":"Filipino"},{"VALUE":"pau","LEXIC":"Palauan"},{"VALUE":"crs","LEXIC":"Seychellois Creole"},{"VALUE":"tkl","LEXIC":"Tokelauan"},{"VALUE":"tet","LEXIC":"Tetum"},{"VALUE":"tvl","LEXIC":"Tuvaluan"},{"VALUE":"nso","LEXIC":"Northern Sotho"},{"VALUE":"bwg","LEXIC":"Chibarwe"},{"VALUE":"kck","LEXIC":"Kalanga"},
{"VALUE":"khi","LEXIC":"Khoisan"},{"VALUE":"ndc","LEXIC":"Ndau"},{"VALUE":"toi","LEXIC":"Tonga"},{"VALUE":"zib","LEXIC":"Zimbabwean Sign Language"}]
var listfra = [{"VALUE":"aar","LEXIC":"Afar"},{"VALUE":"abk","LEXIC":"Abkhaze"},{"VALUE":"afr","LEXIC":"Afrikaans"},{"VALUE":"aka","LEXIC":"Akan"},{"VALUE":"amh","LEXIC":"Amharique"},{"VALUE":"arb","LEXIC":"Arabe"},{"VALUE":"arg","LEXIC":"Aragonais"},{"VALUE":"asm","LEXIC":"Assamais"},{"VALUE":"ava","LEXIC":"Avar"},{"VALUE":"ave","LEXIC":"Avestique"},{"VALUE":"aym","LEXIC":"Aymara"},{"VALUE":"aze","LEXIC":"Azéri"},{"VALUE":"bak","LEXIC":"Bachkir"},{"VALUE":"bam","LEXIC":"Bambara"},{"VALUE":"bel","LEXIC":"Biélorusse"},{"VALUE":"ben","LEXIC":"Bengali"},{"VALUE":"bih","LEXIC":"Bihari"},{"VALUE":"bis","LEXIC":"Bichelamar"},{"VALUE":"bod","LEXIC":"Tibétain"},{"VALUE":"bos","LEXIC":"Bosnien"},{"VALUE":"bre","LEXIC":"Breton"},{"VALUE":"bul","LEXIC":"Bulgare"},{"VALUE":"cat","LEXIC":"Catalan"},{"VALUE":"ces","LEXIC":"Tchèque"},{"VALUE":"cha","LEXIC":"Chamorro"},{"VALUE":"che","LEXIC":"Tchétchène"},{"VALUE":"chu","LEXIC":"Vieux-slave"},{"VALUE":"chv","LEXIC":"Tchouvache"},{"VALUE":"cor","LEXIC":"Cornique"},{"VALUE":"cos","LEXIC":"Corse"},{"VALUE":"cre","LEXIC":"Cri"},{"VALUE":"cym","LEXIC":"Gallois"},{"VALUE":"dan","LEXIC":"Danois"},{"VALUE":"deu","LEXIC":"Allemand"},{"VALUE":"div","LEXIC":"Maldivien"},{"VALUE":"dzo","LEXIC":"Dzongkha"},{"VALUE":"ell","LEXIC":"Grec moderne"},{"VALUE":"eng","LEXIC":"Anglais"},{"VALUE":"epo","LEXIC":"Espéranto"},{"VALUE":"est","LEXIC":"Estonien"},{"VALUE":"eus","LEXIC":"Basque"},{"VALUE":"ewe","LEXIC":"Ewe"},{"VALUE":"fao","LEXIC":"Féroïen"},{"VALUE":"fas","LEXIC":"Persan"},{"VALUE":"fij","LEXIC":"Fidjien"},{"VALUE":"fin","LEXIC":"Finnois"},{"VALUE":"fra","LEXIC":"Français"},{"VALUE":"fra","LEXIC":"Français"},{"VALUE":"fry","LEXIC":"Frison"},{"VALUE":"ful","LEXIC":"Peul"},{"VALUE":"gla","LEXIC":"Écossais"},{"VALUE":"gle","LEXIC":"Irlandais"},{"VALUE":"glg","LEXIC":"Galicien"},{"VALUE":"glv","LEXIC":"Mannois"},{"VALUE":"grn","LEXIC":"Guarani"},{"VALUE":"guj","LEXIC":"Gujarati"},{"VALUE":"hat","LEXIC":"Créole haïtien"},{"VALUE":"hau","LEXIC":"Haoussa"},{"VALUE":"hbs","LEXIC":"Serbo-croate"},{"VALUE":"heb","LEXIC":"Hébreu"},{"VALUE":"her","LEXIC":"Héréro"},{"VALUE":"hin","LEXIC":"Hindi"},{"VALUE":"hmo","LEXIC":"Hiri motu"},{"VALUE":"hrv","LEXIC":"Croate"},{"VALUE":"hun","LEXIC":"Hongrois"},{"VALUE":"hye","LEXIC":"Arménien"},{"VALUE":"ibo","LEXIC":"Igbo"},{"VALUE":"ido","LEXIC":"Ido"},{"VALUE":"iii","LEXIC":"Yi"},{"VALUE":"iku","LEXIC":"Inuktitut"},{"VALUE":"ile","LEXIC":"Occidental"},{"VALUE":"ina","LEXIC":"Interlingua"},{"VALUE":"ind","LEXIC":"Indonésien"},{"VALUE":"ipk","LEXIC":"Inupiak"},{"VALUE":"isl","LEXIC":"Islandais"},{"VALUE":"ita","LEXIC":"Italien"},{"VALUE":"jav","LEXIC":"Javanais"},{"VALUE":"jpn","LEXIC":"Japonais"},{"VALUE":"kal","LEXIC":"Groenlandais"},{"VALUE":"kan","LEXIC":"Kannada"},{"VALUE":"kas","LEXIC":"Cachemiri"},{"VALUE":"kat","LEXIC":"Géorgien"},{"VALUE":"kau","LEXIC":"Kanouri"},{"VALUE":"kaz","LEXIC":"Kazakh"},{"VALUE":"khm","LEXIC":"Khmer"},{"VALUE":"kik","LEXIC":"Kikuyu"},{"VALUE":"kin","LEXIC":"Kinyarwanda"},{"VALUE":"kir","LEXIC":"Kirghiz"},{"VALUE":"kom","LEXIC":"Komi"},{"VALUE":"kon","LEXIC":"Kikongo"},{"VALUE":"kor","LEXIC":"Coréen"},{"VALUE":"kua","LEXIC":"Kuanyama"},{"VALUE":"kur","LEXIC":"Kurde"},{"VALUE":"lao","LEXIC":"Lao"},{"VALUE":"lat","LEXIC":"Latin"},{"VALUE":"lav","LEXIC":"Letton"},{"VALUE":"lim","LEXIC":"Limbourgeois"},{"VALUE":"lin","LEXIC":"Lingala"},{"VALUE":"lit","LEXIC":"Lituanien"},{"VALUE":"ltz","LEXIC":"Luxembourgeois"},{"VALUE":"lub","LEXIC":"Luba-katanga"},{"VALUE":"lug","LEXIC":"Ganda"},{"VALUE":"mah","LEXIC":"Marshallais"},{"VALUE":"mal","LEXIC":"Malayalam"},{"VALUE":"mar","LEXIC":"Marathi"},{"VALUE":"mkd","LEXIC":"Macédonien"},{"VALUE":"mlg","LEXIC":"Malgache"},{"VALUE":"mlt","LEXIC":"Maltais"},{"VALUE":"mol","LEXIC":"Moldave"},{"VALUE":"mon","LEXIC":"Mongol"},{"VALUE":"mri","LEXIC":"Maori"},{"VALUE":"msa","LEXIC":"Malais"},{"VALUE":"mya","LEXIC":"Birman"},{"VALUE":"nau","LEXIC":"Nauruan"},{"VALUE":"nav","LEXIC":"Navajo"},{"VALUE":"nbl","LEXIC":"Nrebele"},{"VALUE":"nde","LEXIC":"Sindebele"},{"VALUE":"ndo","LEXIC":"Ndonga"},{"VALUE":"nep","LEXIC":"Népalais"},{"VALUE":"nld","LEXIC":"Néerlandais"},{"VALUE":"nno","LEXIC":"Norvégien Nynorsk"},{"VALUE":"nob","LEXIC":"Norvégien Bokmål"},{"VALUE":"nor","LEXIC":"Norvégien"},{"VALUE":"nya","LEXIC":"Chichewa"},{"VALUE":"oci","LEXIC":"Occitan"},{"VALUE":"oji","LEXIC":"Ojibwé"},{"VALUE":"ori","LEXIC":"Oriya"},{"VALUE":"orm","LEXIC":"Oromo"},{"VALUE":"oss","LEXIC":"Ossète"},{"VALUE":"pan","LEXIC":"Pendjabi"},{"VALUE":"pli","LEXIC":"Pali"},{"VALUE":"pol","LEXIC":"Polonais"},{"VALUE":"por","LEXIC":"Portugais"},{"VALUE":"pus","LEXIC":"Pachto"},{"VALUE":"que","LEXIC":"Quechua"},{"VALUE":"roh","LEXIC":"Romanche"},{"VALUE":"ron","LEXIC":"Roumain"},{"VALUE":"run","LEXIC":"Kirundi"},{"VALUE":"rus","LEXIC":"Russe"},{"VALUE":"sag","LEXIC":"Sango"},{"VALUE":"san","LEXIC":"Sanskrit"},{"VALUE":"sin","LEXIC":"Cingalais"},{"VALUE":"slk","LEXIC":"Slovaque"},{"VALUE":"slv","LEXIC":"Slovène"},{"VALUE":"sme","LEXIC":"Same du Nord"},{"VALUE":"smo","LEXIC":"Samoan"},{"VALUE":"sna","LEXIC":"Shona"},{"VALUE":"snd","LEXIC":"Sindhi"},{"VALUE":"som","LEXIC":"Somali"},{"VALUE":"sot","LEXIC":"Sotho du Sud"},{"VALUE":"spa","LEXIC":"Espagnol"},{"VALUE":"sqi","LEXIC":"Albanais"},{"VALUE":"srd","LEXIC":"Sarde"},{"VALUE":"srp","LEXIC":"Serbe"},{"VALUE":"ssw","LEXIC":"Swati"},{"VALUE":"sun","LEXIC":"Soundanais"},{"VALUE":"swa","LEXIC":"Swahili"},{"VALUE":"swe","LEXIC":"Suédois"},{"VALUE":"tah","LEXIC":"Tahitien"},{"VALUE":"tam","LEXIC":"Tamoul"},{"VALUE":"tat","LEXIC":"Tatar"},{"VALUE":"tel","LEXIC":"Télougou"},{"VALUE":"tgk","LEXIC":"Tadjik"},{"VALUE":"tgl","LEXIC":"Tagalog"},{"VALUE":"tha","LEXIC":"Thaï"},{"VALUE":"tir","LEXIC":"Tigrigna"},{"VALUE":"ton","LEXIC":"Tongien"},{"VALUE":"tsn","LEXIC":"Tswana"},{"VALUE":"tso","LEXIC":"Tsonga"},{"VALUE":"tuk","LEXIC":"Turkmène"},{"VALUE":"tur","LEXIC":"Turc"},{"VALUE":"twi","LEXIC":"Twi"},{"VALUE":"uig","LEXIC":"Ouïghour"},{"VALUE":"ukr","LEXIC":"Ukrainien"},{"VALUE":"urd","LEXIC":"Ourdou"},{"VALUE":"uzb","LEXIC":"Ouzbek"},{"VALUE":"ven","LEXIC":"Venda"},{"VALUE":"vie","LEXIC":"Vietnamien"},{"VALUE":"vol","LEXIC":"Volapük"},{"VALUE":"wln","LEXIC":"Wallon"},{"VALUE":"wol","LEXIC":"Wolof"},{"VALUE":"xho","LEXIC":"Xhosa"},{"VALUE":"yid","LEXIC":"Yiddish"},{"VALUE":"yor","LEXIC":"Yoruba"},{"VALUE":"zgh","LEXIC":"Amazighe"},{"VALUE":"zha","LEXIC":"Zhuang"},{"VALUE":"zho","LEXIC":"Chinois"},{"VALUE":"zul","LEXIC":"Zoulou"}];

var lng_nat = {"lng":"nat","geo":"nap","app":"kyx/ini","list":"lng","vals":{}};
lngdiv.forEach((x)=>{lng_nat.vals[x]="";});
listnat.forEach((x)=>{lng_nat.vals[x.VALUE]=x.LEXIC});
listeng2.forEach((x)=>{lng_nat.vals[x.VALUE]=x.LEXIC;lng_nat.vals["ara"]="مجموعة عربية";lng_nat.vals["zho"]="中国宏观语言";lng_nat.vals["cmp"]="Zhōngwén pīnyīn";});
var lng_eng = {"lng":"eng","geo":"nap","app":"kyx/ini","list":"lngs","vals":{}};
lngdiv.forEach((x)=>{lng_eng.vals[x]="";});
listeng.forEach((x)=>{lng_eng.vals[x.VALUE]=x.LEXIC});
listeng2.forEach((x)=>{lng_eng.vals[x.VALUE]=x.LEXIC;lng_eng.vals["zho"]="Chinese macrolanguage";lng_eng.vals["cmp"]="Chinese pinyin";});
var lng_fra = {"lng":"fra","geo":"nap","app":"kyx/ini","list":"lngs","vals":{}};
lngdiv.forEach((x)=>{lng_fra.vals[x]="";});
listfra.forEach((x)=>{lng_fra.vals[x.VALUE]=x.LEXIC});
listeng2.forEach((x)=>{lng_fra.vals[x.VALUE]=x.LEXIC;lng_fra.vals["ara"]="Arabe macrolangage";lng_fra.vals["zho"]="Chinois macrolangage";lng_fra.vals["cmp"]="Chinois pinyin";});
kyxini.nat.lngs = lng_nat; kyxini.eng.lngs = lng_eng; kyxini.fra.lngs = lng_fra; tosave.push(lng_nat,lng_eng,lng_fra);
// console.log("tosave:",tosave.length,tosave[tosave.length-3]);

var ccx = {"app":"kyx/ini","geox":"","zone":"adm0","divs":[],"mapa":{}, // "mapa":{"type":"MultiPolygon","coordinates":[]}
           "dat":{"lngs":[],"dial":[],"divlng":{},"ppl":{},"area":0,"cont":"","bord":[],"lock":"","deps":[],"latlng":[],
                  "url":"","curr":[],"post":"","fon":"","tld":[],"iso":"","cca3":"","cioc":"","ccn3":"","alts":[] } };

kyxini.ccsdiv.forEach((cc)=>{kyxwrld[cc]=JSON.parse(JSON.stringify(ccx))});
countriesqp.forEach((xdat)=>{ var ck = xdat.cca2;
                              kyxwrld[ck].geox = xdat.cca2;
                              kyxwrld[ck].dat.lngs = kyxini.ccslng[ck];
                              kyxwrld[ck].dat.area = xdat.area;
                              kyxwrld[ck].dat.cont = kyxini.ccscont[ck];
                              kyxwrld[ck].dat.bord = xdat.borders;
                              kyxwrld[ck].dat.lock = xdat.landlocked;
                              kyxwrld[ck].dat.latlng = xdat.latlng;
                              kyxwrld[ck].dat.fon = xdat.callingCode;
                              kyxwrld[ck].dat.curr = xdat.currency;
                              kyxwrld[ck].dat.tld = xdat.tld;
                              kyxwrld[ck].dat.iso = xdat.cca2;
                              kyxwrld[ck].dat.cca3 = xdat.cca3;
                              kyxwrld[ck].dat.cioc = xdat.cioc;
                              kyxwrld[ck].dat.ccn3 = xdat.ccn3;
                              kyxwrld[ck].dat.alts = xdat.altSpellings;
                              kyxini.eng.ccs_dem[ck] = xdat.demonym;
                              kyxini.eng.ccs_cap[ck] = xdat.capital;

                           });
console.log("kyxwrld.MA : ",kyxwrld.MA);  // divs mapa dial:dialects ppl:people url

var es1txt = fs.readFileSync(path.join(__dirname,'./')+'ES1.txt', 'utf8');
var es1matx=[]; var es1mat = es1txt.split("\n").forEach((dt,idx,aray)=>{es1matx[idx]=dt.split("\t");})
es1matx.forEach((lin)=>{let hasc=lin[1];if(lin.length>6){let pop=parseInt(lin[6].replace(/\,/g,''),10);
                                                         console.log("hasc:",hasc," -> ","pop :",pop);}  });
//console.log("country:",es1matx);
// Validation: georeference -> HASC:cc.rr.pp.vv -> {"cc":{"rr":{"pp":{"vv":{}}}}}} -> cc.pp.divs
// var res = "How are you    doing today?".replace(/[\s\t]+/g, " ").split(" ");

module.exports = {
  kyxini: () => {return kyxini},
  tosave: () => {return tosave}
}


function Filter(main,filtr){  // arrays
var result = main.filter(n => y.includes(filtr));  //intersection  y.has , union .concat , difference !y.has
return result; }

////console.log("CONTINENTS:" ,Object.entries(cont_val)  ); // only 1 level ->  [[key1,val1],[key2,obj2]]
//Object.entries(cont_val).forEach((key)=>{console.log("key:",key);}); // ->  [key, value]
//Object.keys(cdat.name.native).forEach((k,idx,aray)=>{console.log("key:",aray[idx]);}); // ->  [key, value]
//Object.entries(cdat.name.native).forEach((k)=>{console.log("key:",k[1].common);}); // ->  [key, value]
/*
Object.keys(obj).forEach((key, index) => { console.log(key);});
   Object.keys({ first: "John", last: "Doe" })  >>  [ 'first', 'last' ]
Object.keys(obj).map(key => console.log(`key=${key}  value=${obj[key]}`));
Object.entries(obj).forEach(([key, value]) => ...)  // Object.entries(obj) -> [[key1,val1],[key2,obj2]]  associative array
Object.entries(obj).reduce((a, [k, v]) => {a[k] = v * v; return a}, {})
Object.entries(obj).reduce((a, [k, v]) => (a[k] = v * v, a), {})
https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
const fn = v => v * 2;const newObj = Object.entries(myObject).reduce((acc, [k,v]) => Object.assign({}, acc, {[k]: fn(v)}), {});
*/
