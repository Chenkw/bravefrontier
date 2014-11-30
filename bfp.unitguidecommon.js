/*Global object variabled*/
var aheadName=[];
var deserialdata = {};
var ovdata2 = {};
var gURL = 'https://www.googleapis.com/fusiontables/v1/query';
var gKey = 'AIzaSyCyF9yZ9Lyl57HAQXtzrd3yONewk4-fGSg';
var gTable = '1l6-hvkORxoKtJ8uVI3L9NqfK1Yhv1C1QewM9PLKp';
var prevStatsMod=[0,0,0,0,0];
var sphereHTML='<option value="0,0.3,0.3,0.3">Alter Blade</option><option value="0,0.75,0,0">Angelic Foil</option><option value="0,0.3,0.3,0">Batootha</option><option value="0,0.15,0,0">Beast Blade</option><option value="0.1,0.1,0.1,0.1">Brave Crest</option><option value="0.1,0.1,0.1,0.1">Burny\'s Soul Stone</option><option value="0,0.1,0.1,0">Cordelicite</option><option value="0.3,0.3,0,0">Dandelga</option><option value="0,0.5,0.5,0.5">Divine Stone</option><option value="0.3,0,0.3,0">Drevas</option><option value="0,0,0.75,0">Exyl Shield</option><option value="0.1,0,0.1,0">Flesh Armor</option><option value="0,0,0.5,0.5">Gilded Pearl</option><option value="0.1,0,0.1,0">Goddess Seal</option><option value="0,0,0,0.15">Holy Cane</option><option value="0.15,0,0,0">Holy Robe</option><option value="0.1,0.05,0.1,0.05">Ihsir\'s Guise</option><option value="0.25,0.25,0.25,0.25">Legwand</option><option value="0.3,0,0,0.3">Lexida</option><option value="0.1,0,0.1,0.1">Limbo Stone</option><option value="0.3,0.3,0.3,0.3">Malice Jewel</option><option value="0,0.75,0.75,0">Masamune</option><option value="0.05,0.05,0.05,0.05">Mech Sword</option><option value="0.2,0.2,0.2,0.2">Medulla Gem</option><option value="0,0.5,0,0">Muramasa</option><option value="0.2,0.25,0.2,0.2">Providence Ring</option><option value="0,0,0.5,0">Royal Shield</option><option value="0.15,0.15,0.15,0.15">Sacred Jewel</option><option value="0,1,1,1">Wicked Blade</option>';
var hpModHTML='<option value="0.1">10%</option><option value="0.2">20%</option><option value="0.25">25%</option><option value="0.3">30%</option>';
var atkModHTML='<option value="0.2">20%</option><option value="0.25">25%</option><option value="0.3">30%</option><option value="0.5">50%</option><option value="0.65">65%</option><option value="0.75">75%</option>';
var defModHTML='<option value="-0.5">-50%</option><option value="0.05">5%</option><option value="0.1">10%</option><option value="0.2">20%</option><option value="0.25">25%</option><option value="0.5">50%</option>';
var recModHTML='<option value="0.1">10%</option><option value="0.05">5%</option><option value="0.1">10%</option><option value="0.2">20%</option><option value="0.25">25%</option><option value="0.5">50%</option>';

/*Escape regex string*/
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/*Recalculates everything based on leaderskill / allskill / sphere(s) */
function totalStatsMod() {
    var lsMod=[$('#lsHP').val(),$('#lsATK').val(),$('#lsDEF').val(),$('#lsREC').val()];
    var asMod=[$('#asHP').val(),$('#asATK').val(),$('#asDEF').val(),$('#asREC').val()];
    if ($('#pimpHP').length)
    	var pMod=[$('#pimpHP').text(),$('#pimpATK').text(),$('#pimpDEF').text(),$('#pimpREC').text()]
    else
    	var pMod=[0,0,0,0];
    var sphereA=$("#sphereA").val().split(",");
    var sphereB=$("#sphereB").val().split(",");
    var totalMod=[];
    /*Combines Modifiers*/
    for (i=0;i<4;i++) {
	tmp=parseFloat(lsMod[i])+parseFloat(asMod[i])+parseFloat(sphereA[i])+parseFloat(sphereB[i]);
	totalMod.push(tmp.toFixed(2));
    }
    if ($('#pimpBtn').val()=="true")
      totalMod.push(1)
    else
      totalMod.push(0)
    var pFlip=(totalMod[4]==prevStatsMod[4]) ? 0 : (totalMod[4]>prevStatsMod[4]) ? 1 : -1;
    /*Make changes*/
    $('.hpMod').each( function(){
	if ( $(this).text() != "-" ) {
	    bCalc=( parseInt($(this).text())/(1+parseFloat(prevStatsMod[0])) )+(parseInt(pMod[0])*pFlip);
	    $(this).text(Math.round( bCalc*(1+parseFloat(totalMod[0])))); }
	})
    
    $('.atkMod').each( function(){
	if ( $(this).text() != "-" ) {
	    bCalc=( parseInt($(this).text())/(1+parseFloat(prevStatsMod[1])) )+(parseInt(pMod[1])*pFlip);
	    $(this).text(Math.round( bCalc*(1+parseFloat(totalMod[1])))); }
	})
    
    $('.defMod').each( function(){
	if ( $(this).text() != "-" ) {
	    bCalc=( parseInt($(this).text())/(1+parseFloat(prevStatsMod[2])) )+(parseInt(pMod[2])*pFlip);
	    $(this).text(Math.round( bCalc*(1+parseFloat(totalMod[2])))); }
	})
    
    $('.recMod').each( function(){
	if ( $(this).text() != "-" ) {
	    bCalc=( parseInt($(this).text())/(1+parseFloat(prevStatsMod[3])) )+(parseInt(pMod[3])*pFlip);
	    $(this).text(Math.round( bCalc*(1+parseFloat(totalMod[3])))); }
	})
    
    /*Replace previous mod with current mod*/
    prevStatsMod=totalMod;
}

/*Bootstrap alerts*/
function bfpAlert(aTitle,aBody) {
    $("#alertSpace").html('<i class="fa fa-fire-extinguisher"></i> <strong>'+aTitle+':</strong> '+aBody);
    $("#alertmodal").modal("show");
}

/*JQ Param handling*/
function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return '';
    }
    else{
       return decodeURIComponent(results[1]) || '';
    }
}

/*returns position in json obj array*/
function findidloc(locobj,locval ) {
    for(var i=0; i < locobj.length; i++) {
	if (locobj[i]['id']==locval) {
	    return i;
	}
    }
}

/*2nd style convert of Google JSON REST*/
function sconvertJSON( serialObj ) {
    var s = serialObj || {};
    if( !s.columns && !s.rows )
    {
	console.error("sconvertJSON() >>  was not passed a serialized obj");
	return [];
    }
    var obj = [];
    for(var i=0; i < s.rows.length; i++)
    {
	var temp = {};
	for(var j=0; j < s.columns.length; j++)
	{ /*check for NaN values*/
	    if (isNaN(s.rows[i][j]) && ((s.columns[j].toLowerCase().search("range") != -1)||(s.columns[j].toLowerCase().search("hits") != -1)||(s.columns[j].toLowerCase().search("fill") != -1)||(s.columns[j].toLowerCase().search("zel") != -1)||(s.columns[j].toLowerCase().search("hp") != -1)||(s.columns[j].toLowerCase().search("atk") != -1)||(s.columns[j].toLowerCase().search("def") != -1)||(s.columns[j].toLowerCase().search("rec") != -1)||(s.columns[j].toLowerCase().search("cost") != -1))) {
		    temp[s.columns[j].toLowerCase()] = "-";
	    } else {
	    temp[s.columns[j].toLowerCase()] = s.rows[i][j];
	    }
	}
	obj.push(temp);
    }
    return obj;
}

/*AJAX Call to Google URL Shortener API*/
function gooShorten(URLtoShort,linkAsset) {
    $.ajax({
	    type: 'POST',
	    async: false,
	    url: 'https://www.googleapis.com/urlshortener/v1/url?fields=id&key='+gKey,
	    contentType: 'application/json; charset=utf-8',
	    data: '{ longUrl: "'+ URLtoShort +'"}',
		success : function(text)
	         {
	             	linkAsset.html('<a href="'+text.id+'">'+text.id+'</a>');
	         }
	})
}

/*check valid json*/
function isValidJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//Returns EvoIMG
function getEvoIMG(evoMat) {
    /*Evo IMG Array*/
var evoQuery = [
['Fire Nymph','icon171.png'],
['Water Nymph','icon172.png'],
['Earth Nymph','icon173.png'],
['Thunder Nymph','icon174.png'],
['Light Nymph','icon175.png'],
['Dark Nymph','icon176.png'],
['Fire Spirit','icon177.png'],
['Water Spirit','icon178.png'],
['Earth Spirit','icon179.png'],
['Thunder Spirit','icon180.png'],
['Light Spirit','icon181.png'],
['Dark Spirit','icon182.png'],
['Fire Idol','icon183.png'],
['Water Idol','icon184.png'],
['Earth Idol','icon185.png'],
['Thunder Idol','icon186.png'],
['Light Idol','icon187.png'],
['Dark Idol','icon188.png'],
['Fire Totem','icon189.png'],
['Water Totem','icon190.png'],
['Earth Totem','icon191.png'],
['Thunder Totem','icon192.png'],
['Light Totem','icon193.png'],
['Dark Totem','icon194.png'],
['Mimic','icon201.png'],
['Bat Mimic','icon202.png'],
['Dragon Mimic','icon305.png'],
['Fire Pot','icon306.png'],
['Water Pot','icon307.png'],
['Earth Pot','icon308.png'],
['Thunder Pot','icon309.png'],
['Light Pot','icon310.png'],
['Dark Pot','icon311.png'],
['Miracle Totem','icon332.png'],
['Metal Mimic','icon481.png'],
['Fire Ghost','icon254.png'],
['Water Ghost','icon257.png'],
['Earth Ghost','icon260.png'],
['Thunder Ghost','icon263.png'],
['Light Ghost','icon266.png'],
['Metal Ghost','icon198.png'],
['Metal King','icon199.png'],
['Metal God','icon200.png'],
['Fire Bulb','icon8037.png'],
['Water Bulb','icon8038.png'],
['Earth Bulb','icon8039.png'],
['Thunder Bulb','icon8040.png'],
['Light Bulb','icon8041.png'],
['Dark Bulb','icon8042.png'],
['Miracle Bulb','icon8043.png'],
['Soul Crystal','iconitem11010.png'],
['Turbo Cyclaw','icon8106.png'],
['None','iconblank.gif']];

	/*find match*/
	for(var i=0; i < evoQuery.length; i++) {
	    if ( evoQuery[i][0] == evoMat ) {
		return "https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/"+evoQuery[i][1];
	    }
	}
	return "https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/iconblank.gif";
} /*End getEvoIMG*/

/*Query unit and openCard*/
      function openCard(whatunit) {
	/*Loader*/
	$('#unitCardHome').html('<h4><i class="fa fa-cog fa-spin"></i> Summoning '+whatunit+' ... please wait</h4><div class="progress progress-striped active"><div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only">100% Complete</span></div></div>');
	/*Choose Main Card n Show Card Modal*/
	$('#cardModal').modal('show');
	$('.nav-tabs a[href="#unitCardHome"]').tab('show');
	/*update state*/
	    var state = { stateUnit: whatunit };
	    history.pushState(state, "test state", "?unit="+encodeURIComponent(whatunit) );
	/*Google analytics*/
	var compileURL=location.host + location.pathname + "?unit=" + encodeURIComponent(whatunit);
	ga('send', 'pageview', {
  		'page': compileURL,
  		'title': 'Brave Frontier PROs Unit Card - ' + whatunit
	});
	
	/*Resets Prev Stats*/
	prevStatsMod=[0,0,0,0,0];
	/*Fix Apostrophe*/
	var whatunit = whatunit.replace("'","\\'");
	var qunitname = "'" + whatunit + "'";
	/*Query*/
	var query2 = "SELECT * FROM " + gTable + 
	    " WHERE 'Name' = " + qunitname;
	var encodedQuery2 = encodeURIComponent(query2);
	
	/*Construct URL*/
	var url2 = [gURL];
	url2.push('?sql=' + encodedQuery2);
	url2.push('&key=' + gKey);
	url2.push('&callback=?');

	/*Send the JSONP request*/
	$.ajax({
	  url: url2.join(''),
	  dataType: 'jsonp',
	  success: function (data2) {
	    /*alert(JSON.stringify(data2));*/
	    ovdata2 = sconvertJSON(data2);
	      var ovid = ovdata2[0]["id"];
	      var ovname = ovdata2[0]["name"];
	      /* strInputString = strInputString.replace(/'/g, "\\'"); */
	      var ovseries = ovdata2[0]["series"];
	      var ovicon = ovdata2[0]["icon"];
	      var ovimage = ovdata2[0]["image"];
	      var ovelement = ovdata2[0]["element"];
	      var ovcost = ovdata2[0]["cost"];
	      var ovhits = ovdata2[0]["hits"];
	      var ovbbhits = ovdata2[0]["bb hits"];
	      var ovsbbhits = ovdata2[0]["sbb hits"];
	      var ovbbfill = ovdata2[0]["bb fill"];
	      var ovsbbfill = ovdata2[0]["sbb fill"];
	      var ovbbtype = ovdata2[0]["bb type"];
	      var ovsbbtype = ovdata2[0]["sbb type"];
	      var ovleaderskill = ovdata2[0]["leader skill"];
	      var ovbbskill = ovdata2[0]["bb skill"];
	      var ovsbbskill = ovdata2[0]["sbb skill"];
	      var ovbfpronotes = ovdata2[0]["bfpro notes"];
	      var ovGlobal = ovdata2[0]["global release"];
	      var ovJapan = ovdata2[0]["japan release"];
	      var ovevo = [];
	      // Query Evo
	      for(var i=0; i < 5; i++) {
		    /*find match*/
		    ovevo.push( ovdata2[0]['evo '+(i+1)] );
	      }
	      var ovevozel = ovdata2[0]["evo zel"];
	      var ovmaxlvl = ovdata2[0]["max lvl"];
	      var ovacquire = ovdata2[0]["acquire"];
	      var ovrarity = ovdata2[0]["rarity"];
	      var ovweightedlord = Math.round(ovdata2[0]["weighted stats (lord)"]);
	      var ovhplord = ovdata2[0]["hp lord"];
	      var ovatklord = ovdata2[0]["atk lord"];
	      var ovdeflord = ovdata2[0]["def lord"];
	      var ovreclord = ovdata2[0]["rec lord"];
	      var ovhpanima = ovdata2[0]["hp anima"];
	      var ovatkanima = ovdata2[0]["atk anima"];
	      var ovdefanima = ovdata2[0]["def anima"];
	      var ovrecanima = ovdata2[0]["rec anima"];
	      var ovhpbreaker = ovdata2[0]["hp breaker"];
	      var ovatkbreaker = ovdata2[0]["atk breaker"];
	      var ovdefbreaker = ovdata2[0]["def breaker"];
	      var ovrecbreaker = ovdata2[0]["rec breaker"];
	      var ovhpguardian = ovdata2[0]["hp guardian"];
	      var ovatkguardian = ovdata2[0]["atk guardian"];
	      var ovdefguardian = ovdata2[0]["def guardian"];
	      var ovrecguardian = ovdata2[0]["rec guardian"];
	      var ovhporacle = ovdata2[0]["hp oracle"];
	      var ovatkoracle = ovdata2[0]["atk oracle"];
	      var ovdeforacle = ovdata2[0]["def oracle"];
	      var ovrecoracle = ovdata2[0]["rec oracle"];
	      var ovhprange = (ovdata2[0]["hp range"]=="-") ? 0 : ovdata2[0]["hp range"];
	      var ovstatsrange = (ovdata2[0]["stats range"]=="-") ? 0 : ovdata2[0]["stats range"];
	      var ovvideo = ovdata2[0]["video"];
	      var ovgender = ovdata2[0]["gender"];
	      var ovtypepref = ovdata2[0]["type pref"];
	      var ovshareURL='<span id="cardShareURL" class="text-danger"><i class="fa fa-spinner fa-spin"></i> Generating sharing link</span>';
	      /*Type preference string generation*/
	      var ovtypeprefHTML="";
	      if (ovtypepref.length!=0) {
		  for (var i=0; i<ovtypepref.length;i++) {
		      switch (ovtypepref.charAt(i).toUpperCase()) {
		    case "L":
			ovtypeprefHTML+="Lord";
			break;
		    case "A":
			ovtypeprefHTML+="Anima";
			break;
		    case "B":
			ovtypeprefHTML+="Breaker";
			break;
		    case "G":
			ovtypeprefHTML+="Guardian";
			break;
		    case "O":
			ovtypeprefHTML+="Oracle";
			break;
		}
		if (i!=4) {
		    ovtypeprefHTML+=' &nbsp;<i class="fa fa-angle-right text-muted"></i> &nbsp;';
		}
		  }
	      }
	      /*Sprite check*/
	      var ovsprite = "https://googledrive.com/host/0B4hJr8BXxvFZQk1JcFBvT2xEMUk/sprite"+ovid+".gif";
	      $('#unitSpriteShow').attr('src',ovsprite);
	      $('#unitSpriteShow').error(function() {
		  $(this).attr('src',"https://googledrive.com/host/0B4hJr8BXxvFZQk1JcFBvT2xEMUk/spriteNone.gif");
		})
	      var ovnext = "";
	      var ovprevious = "";
	    /*NaN Check*/
	    if (isNaN(ovweightedlord)) { ovweightedlord = "-" }
	    /*Evo trail variable*/
	    var evotrail=[];
	    for (var i=0; i < deserialdata.length; i++)  {
		if (deserialdata[i]["series"] == ovseries) {
		    evotrail.push({
			'evo1':deserialdata[i]["evo 1"],
			'evo2':deserialdata[i]["evo 2"],
			'evo3':deserialdata[i]["evo 3"],
			'evo4':deserialdata[i]["evo 4"],
			'evo5':deserialdata[i]["evo 5"],
			'rarity':deserialdata[i]["rarity"],
			'name':deserialdata[i]["name"],
			'id':deserialdata[i]["id"]
			})
		}
	    }
	    /*Object Array Sort*/
	    evotrail=evotrail.sort(function(a,b) {
		    return a.rarity-b.rarity;
	    })
	    /*Assembling HTML*/
	    var evotrailHTML='';
	    var evoUnitIdx=0;
	    for(var i=0; i < evotrail.length; i++) {
		if ($(evotrail[i]['name']).text()==ovname) {
		    evotrailHTML+='<span style="background:#99FF99;">'+evotrail[i]['name']+' ('+evotrail[i]['rarity']+'<i class="fa fa-star-o"></i>)</span> ';
		    evoUnitIdx=i;
		}
		else { evotrailHTML+=evotrail[i]['name']+' ('+evotrail[i]['rarity']+'<i class="fa fa-star-o"></i>) ';
		}
		/*insert caret for all but last*/
		if (i < evotrail.length-1) {
		    evotrailHTML+='<i class="fa fa-caret-right text-muted"></i> ';
		}
	    }
	    /*Card HTML output*/
	      var ovHTML = 
	      '<table class="table table-bordered table-condensed small" style="border-top:0px;"><tr><td style="text-align:center;vertical-align:middle;border:0px;"><img src="'+ovicon+'" width="60"/></td>'
	      +'<td colspan="5" style="border:0px;"><h4><kbd>'+ovid+'</kbd>';
	      if (ovgender == 'Male') { ovHTML+=' <i class="fa fa-male text-primary"></i> '; }
	      else if (ovgender == 'Female') { ovHTML+=' <i class="fa fa-female text-danger"></i> '; }
	      else if (ovgender == 'Genderless') { ovHTML+=' <i class="fa fa-android text-success"></i> '; }
	      else if (ovgender == 'Paired(FF)') { ovHTML+=' <i class="fa fa-female text-danger"></i><i class="fa fa-female text-danger"></i> '; }
	      else if (ovgender == 'Paired(MM)') { ovHTML+=' <i class="fa fa-male text-primary"></i><i class="fa fa-male text-primary"></i> '; }
	      else if (ovgender == 'Paired(FM)') { ovHTML+=' <i class="fa fa-male text-primary"></i><i class="fa fa-female text-danger"></i> '; }
	      else { ovHTML+='<span class="fa-stack"><i class="fa fa-android fa-stack-1x text-muted fa-fw"></i><i class="fa fa-question fa-stack-1x fa-inverse fa-fw"></i></span>'; }
	      ovHTML+='<b>'+ovname+'</b><br/><small><b>'+ovrarity+'</b><i class="fa fa-star"></i> &middot; <b>Cost:</b> '+ovcost+' &middot; <b>Max lv:</b> '+ovmaxlvl;
	      /*Release status*/
	      if (ovGlobal.toLowerCase()!='false') {
		  ovHTML+=' &middot; <div class="release"><i class="fa fa-check text-success"></i> <b class="text-success">Global</b></div>';
	      } else {
		  ovHTML+=' &middot; <div class="release"><i class="fa fa-times text-danger"></i> <b class="text-danger">Global</b></div>';
	      }
	  	if (ovJapan.toLowerCase()!='false') {
		  ovHTML+=' <div class="release"><i class="fa fa-check text-success"></i> <b class="text-success">日本</b></div>';
	      } else {
		  ovHTML+=' <div class="release"><i class="fa fa-times text-danger"></i> <b class="text-danger">日本</b></div>';
	      }
	      if ( ovvideo != "" ) {
		  ovHTML+=' &middot; <a href="#" src="'+ovvideo+'" class="videoBtn"><i class="fa fa-video-camera"></i></a>';
	      }
	      ovHTML+='</small></h4></td></tr>';
	      ovHTML+='<tr><td colspan="6" class="purple"><i class="fa fa-share-alt"></i> <b>Sharing URL: </b>'+ovshareURL+'</td></tr>';
	      ovHTML+='<tr><td class="active"><b>Hits</b></td><td colspan="5"><span style="display:inline-block;"><b>Normal:</b> '+ovhits+'</span><span style="display:inline-block;"> &nbsp;&middot;&nbsp; <b>BB:</b> '+ovbbhits+' ('+ovbbfill+'<img style="height:15px;vertical-align:top" src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon_bc.png"/>)</span>';
	      if (ovrarity >= 6) {
		ovHTML+='<span style="display:inline-block;"> &nbsp;&middot;&nbsp; <b>SBB:</b> '+ovsbbhits+' ('+ovsbbfill+'<img style="height:15px;vertical-align:top" src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon_bc.png"/>)</span>';
	      }
	      ovHTML+='</td></tr>';
	      ovHTML+='<tr><td class="active"><b class="visible-xs-block">LS</b><b class="hidden-xs">Leader skill</b></td><td colspan="5">'+ovleaderskill+'</td></tr>'
	      +'<tr><td class="active"><b>BB</b><b class="hidden-xs"> skill</b></td><td colspan="5">'+ovbbskill+' &nbsp;&middot;&nbsp; <b>Type:</b> '+ovbbtype+'</td></tr>';
	      if (ovrarity > 5) {
		    ovHTML+='<tr><td class="active"><b>SBB</b><b class="hidden-xs"> skill</b></td><td colspan="5">'+ovsbbskill+' &nbsp;&middot;&nbsp; <b>Type:</b> '+ovsbbtype+'</td></tr>'
	      }
	      /*Raw data integration buttons*/
		if ( (ovGlobal.toLowerCase()!="false") || (ovJapan.toLowerCase()!="false") )
			ovHTML+='<tr><td colspan="6" style="vertical-align:middle;">';
	     	if (ovGlobal.toLowerCase()!="false")
	     		ovHTML+='<a class="btn btn-xs btn-info" href="skillseffectsguideglobal?unitid='+encodeURIComponent(ovid)+'" target="rawskills"><i class="fa fa-external-link"></i> Global</a> ';
	     	if (ovJapan.toLowerCase()!="false")	
	     		ovHTML+='<a class="btn btn-xs btn-info" href="skillseffectsguidejapan?unitid='+encodeURIComponent(ovid)+'" target="rawskills"><i class="fa fa-external-link"></i> 日本</a>';
		if ( (ovGlobal.toLowerCase()!="false") || (ovJapan.toLowerCase()!="false") )
			ovHTML+=' <span class="text-danger" style="display:inline-block"><i class="fa fa-warning"></i> Technical skills data.</span></td></tr>';
	ovHTML+='<tr><td colspan="6" class="btn-default" style="text-align:center;"><strong>Evolution</strong></td></tr>'
	+'<tr><td colspan="6">'+evotrailHTML+'</td></tr>';
	ovHTML+='<tr><td colspan="3" style="vertical-align:middle;">';
	      if ( (evoUnitIdx==0) || (evotrail[evoUnitIdx-1]['evo1']=='None') ) {
		ovHTML+='No prior evo / No known materials';
	      } else {
		ovHTML+='<i class="fa fa-level-up fa-lg"></i><span class="hidden-xs"> Evolve from</span> ';
		for(var i=0; i < 5; i++) {
		      if (evotrail[evoUnitIdx-1]['evo'+(i+1)]!='None') {
			ovHTML+='<img src="'+getEvoIMG(evotrail[evoUnitIdx-1]['evo'+(i+1)])+'" width="24" alt="'+evotrail[evoUnitIdx-1]['evo'+(i+1)]+'"/> '; }
		 }
	      }
	ovHTML+='</td><td class="text-right" colspan="3" style="vertical-align:middle;">';
	      if (ovevo[0] != 'None') {
		  for(var i=0; i < 5; i++) {
		      if (ovevo[i] != 'None') {
			    ovHTML+='<img src="'+getEvoIMG(ovevo[i])+'" width="24" alt="'+ovevo[i]+'"/> '; }
		  }
		  ovHTML+='<span class="hidden-xs">Evolve to</span> <i class="fa fa-level-up fa-lg"></i>';
	      } else {
		  ovHTML+='No further evo / No known materials';
	      }
	      ovHTML+='</td></tr><tr><td class="btn-default"></td>'
	      +'<td class="btn-default" width="17%"><strong>HP</strong></td>'
	      +'<td class="btn-default" width="17%"><strong>ATK</strong></td>'
	      +'<td class="btn-default" width="17%"><strong>DEF</strong></td>'
	      +'<td class="btn-default" width="17%"><strong>REC</strong></td>'
	      +'<td class="btn-default" width="17%"><strong>Wt Stats</strong></td></tr>'
	      +'<tr><td class="active"><strong>Lord';
	      if (ovbfpronotes.indexOf('#lordonly')>-1) { ovHTML+=' only' };
	      ovHTML+='</strong></td><td class="hpMod">'+ovhplord+'</td>'
	      +'<td class="atkMod">'+ovatklord+'</td>'
	      +'<td class="defMod">'+ovdeflord+'</td>'
	      +'<td class="recMod">'+ovreclord+'</td>'
	      +'<td>'+ovweightedlord+'</td></tr>';
	      /*Omit display for lord type only units*/
	      if (ovbfpronotes.indexOf('#lordonly')==-1) {
	      ovHTML+='<tr><td class="active"><strong>Anima</strong></td><td class="bg-success"><span class="hpMod">'+ovhpanima+'</span><small class="hidden-xs text-muted"> &#177; '+ovhprange+'</small></td>'
	      +'<td class="atkMod">'+ovatkanima+'</td>'
	      +'<td class="defMod">'+ovdefanima+'</td>'
	      +'<td class="bg-warning"><span class="recMod">'+ovrecanima+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td>&nbsp;</td></tr>'
	      +'<tr><td class="active"><strong>Breaker</strong></td><td class="hpMod">'+ovhpbreaker+'</td>'
	      +'<td class="bg-success"><span class="atkMod">'+ovatkbreaker+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td class="bg-warning"><span class="defMod">'+ovdefbreaker+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td class="recMod">'+ovrecbreaker+'</td>'
	      +'<td>&nbsp;</td></tr>'
	      +'<tr><td class="active"><strong>Guardian</strong></td><td class="hpMod">'+ovhpguardian+'</td>'
		+'<td class="bg-warning"><span class="atkMod">'+ovatkguardian+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
		+'<td class="bg-success"><span class="defMod">'+ovdefguardian+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td class="recMod">'+ovrecguardian+'</td>'
	      +'<td>&nbsp;</td></tr>'
	      +'<tr><td class="active"><strong>Oracle</strong></td><td class="bg-warning"><span class="hpMod">'+ovhporacle+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td class="atkMod">'+ovatkoracle+'</td>'
	      +'<td class="defMod">'+ovdeforacle+'</td>'
		+'<td class="bg-success"><span class="recMod">'+ovrecoracle+'</span><small class="hidden-xs text-muted"> &#177; '+ovstatsrange+'</small></td>'
	      +'<td>&nbsp;</td></tr>';
	      }
	      /*IMP MAX Addition*/
	      if (ovdata2[0]["hp pimp"]!="") {
	      ovHTML+='<tr><td class="active va"><b>Max PIMP</b></td>'
	      +'<td class="btn-default va"><img src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon554.png" width="22" height="22"> <i class="fa fa-plus"></i><span id="pimpHP">'+ovdata2[0]["hp pimp"]+'</span><small class="hidden-xs"> ('+(ovdata2[0]["hp pimp"]/50)+'x)</small></td>'
	      +'<td class="btn-default va"><img src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon551.png" width="22" height="22"> <i class="fa fa-plus"></i><span id="pimpATK">'+ovdata2[0]["atk pimp"]+'</span><small class="hidden-xs"> ('+(ovdata2[0]["atk pimp"]/20)+'x)</small></td>'
	      +'<td class="btn-default va"><img src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon552.png" width="22" height="22"> <i class="fa fa-plus"></i><span id="pimpDEF">'+ovdata2[0]["def pimp"]+'</span><small class="hidden-xs"> ('+(ovdata2[0]["def pimp"]/20)+'x)</small></td>'
	      +'<td class="btn-default va"><img src="https://googledrive.com/host/0B4hJr8BXxvFZZVVOZWswdnlnYTg/icon553.png" width="22" height="22"> <i class="fa fa-plus"></i><span id="pimpREC">'+ovdata2[0]["rec pimp"]+'</span><small class="hidden-xs"> ('+(ovdata2[0]["rec pimp"]/20)+'x)</small></td>'
	      +'<td class="btn-default"><button type="button" class="btn btn-success btn-xs" id="pimpBtn" value="false">Pimp it!</button></td></tr>';
	      }
	/*BossMarv PRO Tips!*/
	if ((ovtypepref!="") && (ovtypepref.length==5)) {
	    ovHTML+='<tr><td colspan="6"><i class="fa fa-graduation-cap"></i> <b><a href="https://www.facebook.com/markrvhie.luceropimentel" target="_blank">BossMarv</a>\'s type pref: &nbsp;</b> '+ovtypeprefHTML+'</td></tr>';
	}
	
	ovHTML+='<tr data-toggle="collapse" data-target=".modRows"><td colspan="6" class="btn-info" style="text-align:center;"><i class="fa fa-caret-down"></i> Apply leader / ally skills and spheres <i class="fa fa-caret-down"></i></td></tr>'	      
	+'<tr class="modRows collapse out"><td class="active"><b>Leader skill</b></td><td colspan="5">'
	+'<div class="form-inline"><select id="lsHP" class="form-control lskill input-sm sp2"><option value="0">HP</option>'+hpModHTML+'</select>'
	+'<select class="form-control lskill input-sm sp2" id="lsATK"><option value="0">ATK</option>'+atkModHTML+'</select>'
	+'<select class="form-control lskill input-sm sp2" id="lsDEF"><option value="0">DEF</option>'+defModHTML+'</select>'
	+'<select class="form-control lskill input-sm sp2" id="lsREC"><option value="0">REC</option>'+recModHTML+'</select>'
	+'</div></td></tr>'
	
	+'<tr class="modRows collapse out"><td class="active"><b>Ally skill</b></td><td colspan="5">'
	+'<div class="form-inline"><select id="asHP" class="form-control askill input-sm sp2"><option value="0">HP</option>'+hpModHTML+'</select>'
	+'<select class="form-control askill input-sm sp2" id="asATK"><option value="0">ATK</option>'+atkModHTML+'</select>'
	+'<select class="form-control askill input-sm sp2" id="asDEF"><option value="0">DEF</option>'+defModHTML+'</select>'
	+'<select class="form-control askill input-sm sp2" id="asREC"><option value="0">REC</option>'+recModHTML+'</select>'
	+'</div></td></tr>'
	    +'<tr class="modRows collapse out"><td class="active"><b>Spheres</b></td><td colspan="5">'
	+'<div class="form-inline"><select class="form-control input-sm sp2" id="sphereA"><option value="0,0,0,0">Sphere A - None</option>'+sphereHTML+'</select>'
	+'<select class="form-control input-sm sp2" id="sphereB"><option value="0,0,0,0">Sphere B - None</option>'+sphereHTML+'</select>'
	+'</div></td></tr>'
	
	+'<tr><td class="active"><strong>Acquire</strong></td><td colspan="5">'+ovacquire+'</td></tr>'
	+'<tr><td colspan="6" style="height:50px;"><i class="fa fa-quote-left"></i><strong> Notes: </strong>';
	if (ovbfpronotes!='') {
	    ovHTML+=ovbfpronotes;
	} else {
	    ovHTML+='<i>None at the moment.<i>'
	}
	ovHTML+='</td></tr></table>'
	    /*Next & Previous links*/
	    +'<div class="row">';
	    if (ovid > 1) {
		var ovprevious = deserialdata[findidloc(deserialdata,ovid)-1]["name"];
		ovHTML+='<div class="col-md-6 text-primary pull-left"><h4 id="previousUnit"><i class="fa fa-arrow-left"></i>  '+ovprevious+'</h4></div>';
	    }
	    var ovnext = findidloc(deserialdata,ovid);
	    if (ovnext < deserialdata.length-1) {
		ovnext = deserialdata[findidloc(deserialdata,ovid)+1]["name"];
		ovHTML+='<div class="col-md-6 text-primary pull-right"><h4 class="text-right" id="nextUnit">'+ovnext+' <i class="fa fa-arrow-right"></i></h4> </div>';
	    }
	    ovHTML+='</div>';
	    $('#unitCardHome').html(ovHTML);
	    /*image accordion*/
	    $('#unitimageacc').html('<img src="'+ovimage+'" class="img-responsive" />');
	    /*Evolutionary Generation*/
	    var evoTabHTML='<div class="col-xs-12 col-sm-12 col-md-12">';
	    for (i=0; i<evotrail.length;i++) {
		evoTabHTML+='<div class="col-xs-6 col-sm-6 col-md-4 text-center">';
		evoTabHTML+='<img src="https://googledrive.com/host/0B4hJr8BXxvFZQk1JcFBvT2xEMUk/sprite'+evotrail[i]['id']+'.gif" height="140"/>';
		evoTabHTML+='<div class="text-center"><h6 style="line-height:15px;"><a href="#" class="unitName">'+evotrail[i]['name'].replace(/(<([^>]+)>)/ig,"")+'</a></h6><h6><kbd>Unit '+evotrail[i]['id']+'</kbd>&nbsp;'+evotrail[i]['rarity']+'<i class="fa fa-star-o"></i></h6></div></div>'
	    }
	    $('#evoTab').html(evoTabHTML+'</div>');
	    setTimeout(gooShorten(location.protocol + '//' + compileURL, $('#cardShareURL')), 2000);
	  }
	})
} /*End openCard fn*/