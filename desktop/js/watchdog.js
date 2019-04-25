/* This file is part of Jeedom.
*
* Jeedom is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* Jeedom is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with Jeedom. If not, see <http://www.gnu.org/licenses/>.

*/

$("#bt_addespeasyAction").off('click').on('click', function(event)
{
  var _cmd = {type: 'action'};
  addCmdToTable(_cmd);
});
 $('#bt_addEvent').off('click').on('click', function () {
	$('#bt_calendartab').trigger('click');
    $('#md_modal').dialog({title: "{{Ajouter évènement}}"});
    $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=alarm&eqLogic_id=' + $('.eqLogicAttr[data-l1key=id]').value()).dialog('open');
});

$('#bt_media').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Info Media}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=media&iddevice='+ $('.eqLogicAttr[data-l1key=logicalId]').value()).dialog('open');
});

$('#bt_req').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Requêteur}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=req&iddevice='+ $('.eqLogicAttr[data-l1key=logicalId]').value()).dialog('open');
});
$('#bt_sante').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Liste}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=watchdog.master').dialog('open');
});

$('#bt_reminders').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Rappels/Alarmes}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=reminders').dialog('open');
});

$('#bt_history').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Historique}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=history').dialog('open');
});

$('#bt_routines').off('click').on('click', function ()
{
  $('#md_modal').dialog({title: "{{Routines}}"});
  $('#md_modal').load('index.php?v=d&plugin=watchdog&modal=routines').dialog('open');
});


 $('#bt_scan').off('click').on('click', function () {
    scanAmazonAlexa();
});

$('.eqLogicAttr[data-l1key=configuration][data-l2key=type]').on('change', function ()
{
  $icon = $('.eqLogicAttr[data-l1key=configuration][data-l2key=type]').value();
  if($icon != '' && $icon != null)
    $('#img_device').attr("src", 'plugins/watchdog/core/config/devices/' + $icon + '.png');
});

function scanAmazonAlexa()
{
  $.ajax({
      type: "POST", 
      url: "plugins/watchdog/core/ajax/watchdog.ajax.php", 
      data:
      {
          action: "scanAmazonAlexa",
      },
      dataType: 'json',
      error: function (request, status, error)
      {
          handleAjaxError(request, status, error);
      },
      success: function (data)
      { 
          if (data.state != 'ok') {
              $('#div_alert').showAlert({message: data.result, level: 'danger'});
              return;
          }
          window.location.reload();
      }
  });
}

$("#table_cmd").sortable({axis: "y", cursor: "move", items: ".cmd", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});


function addCmdToTable(_cmd)
{
  if (!isset(_cmd))
    var _cmd = {configuration: {}};

					var DefinitionDivPourCommandesPredefinies='style="display: none;"';
					if (init(_cmd.logicalId)=="")
					DefinitionDivPourCommandesPredefinies="";
								
  if ((init(_cmd.logicalId) == 'whennextreminder') || (init(_cmd.logicalId) == 'whennextalarm')) {
    return;
  }
  
  if (init(_cmd.type) == 'info')
  {
    var tr =
       '<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '">'
     +   '<td>'
     +     '<span class="cmdAttr" data-l1key="id"></span>'
     +   '</td>'
     +   '<td>'
     +     '<div class="row">'
     +       '<div class="col-lg-1">'
 //    +         '<a class="cmdAction btn btn-default btn-sm" data-l1key="chooseIcon"><i class="fa fa-flag"></i> Icone</a>'
     +         '<span class="cmdAttr" data-l1key="display" data-l2key="icon" style="margin-left : 10px;"></span>'
     +       '</div>'
     +   '<div class="col-lg-8">'
     +     '<input class="cmdAttr form-control input-sm" data-l1key="name" placeholder="{{Nom du capteur}}"></td>'
     +   '<td>'
//     +     '<span class="type" type="' + init(_cmd.type) + '">' + jeedom.cmd.availableType() + '</span>'
     +     '<input class="cmdAttr form-control type input-sm" data-l1key="type" value="info" disabled style="margin-bottom : 5px;" />'
//     +     '<span class="subType" subType="' + init(_cmd.subType) + '"></span>'
     +   '</td>'
     +   '<td>'
//     +     '<small><span class="cmdAttr"  data-l1key="configuration" data-l2key="cmd"></span> Résultat de la commande <span class="cmdAttr"  data-l1key="configuration" data-l2key="taskname"></span> (<span class="cmdAttr"  data-l1key="configuration" data-l2key="taskid"></span>)</small>'

 //    +     '<span class="cmdAttr"  data-l1key="configuration" data-l2key="value"></span>'
     +   '</td>'
     +   '<td>'
  //   +     '<input class="cmdAttr form-control input-sm" data-l1key="unite" style="width : 90px;" placeholder="{{Unite}}">'
     +   '</td>'
     +   '<td>'
     +   '</td>'
     +   '<td>'
     +     '<span><label class="checkbox-inline"><input type="checkbox" class="cmdAttr checkbox-inline" data-l1key="isHistorized" checked/>{{Historiser}}</label></span> '
     +     '<span><label class="checkbox-inline"><input type="checkbox" class="cmdAttr checkbox-inline" data-l1key="isVisible" checked/>{{Afficher}}</label></span> '
     +   '</td>'
     + '<td>';

    if (is_numeric(_cmd.id))
    {
      tr += '<a class="btn btn-default btn-xs cmdAction expertModeVisible" data-action="configure"><i class="fa fa-cogs"></i></a> '
          + '<a class="btn btn-default btn-xs cmdAction" data-action="test"><i class="fa fa-rss"></i> {{Tester}}</a>';
    }

    tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>'
     +   '</td>'
     + '</tr>';

    $('#table_cmd tbody').append(tr);
    $('#table_cmd tbody tr:last').setValues(_cmd, '.cmdAttr');
  }

  if (init(_cmd.type) == 'action')
  {
    var tr =
       '<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '">'
     +   '<td>'
     +     '<span class="cmdAttr" data-l1key="id"></span>'
     +   '</td>'
     +   '<td>'
     +     '<div class="row">'
     +       '<div class="col-lg-1">'
 //    +         '<a class="cmdAction btn btn-default btn-sm" data-l1key="chooseIcon"><i class="fa fa-flag"></i> Icone</a>'
     +         '<span class="cmdAttr" data-l1key="display" data-l2key="icon" style="margin-left : 10px;"></span>'
     +       '</div>'
    +       '<div class="col-lg-8">'
    +         '<input class="cmdAttr form-control input-sm" data-l1key="name">'
    +       '</div>'
     +     '</div>';
 /*if (init(_cmd.logicalId)=="")
 {
 
  tr  +=    '<select class="cmdAttr form-control tooltips input-sm" data-l1key="value" style="display : none;margin-top : 5px;" title="{{La valeur de la commande vaut par défaut la commande}}">'
      +       '<option value="">Aucune</option>'
      +     '</select>';
 }*/
    tr  +=   '</td>';
	
	
	      tr  +=   '<td>';
//     +     '<span class="type" type="' + init(_cmd.type) + '">' + jeedom.cmd.availableType() + '</span>'
      //tr  +=     '<input class="cmdAttr form-control type input-sm" data-l1key="type" value="info" disabled style="margin-bottom : 5px;" />';
     // tr  +=     '<span class="subType" subType="' + init(_cmd.subType) + '"></span>';
     // tr  +=   '</td>';
	
	
	
	/*
	tr  +='<td>';


//	+     '<input class="cmdAttr form-control type input-sm" data-l1key="type" value="info" disabled style="margin-bottom : 0px;" />'
//     +     '<span class="type" type="' + init(_cmd.type) + '">' + jeedom.cmd.availableType() + '</span>'
     //+     '<input';
 //if (init(_cmd.logicalId)!="")
 //tr  +='type="hidden"';
*/
	tr  +='<input class="cmdAttr form-control type input-sm" data-l1key="type" value="action" disabled />';
	tr  +='<div '+DefinitionDivPourCommandesPredefinies+'>';
	tr  +=     '<span class="subType" subType="' + init(_cmd.subType) + '"></span>';
	//tr  +=     '<input class="cmdAttr" data-l1key="configuration" data-l2key="virtualAction" value="1" style="display:none;" />';
	tr  +=   '</div></td>';
	tr  +=   '<td>'
	+     '<input class="cmdAttr form-control input-sm"';
 if (init(_cmd.logicalId)!="")
 tr  +='readonly';

 if (init(_cmd.logicalId)=="refresh")
 tr  +=' style="display:none;" ';

	 
tr+= ' data-l1key="configuration" data-l2key="request">';
  //   +   '</td>'
  //   +   '<td>'
     //+     '<small><small><span class="cmdAttr"  data-l1key="configuration" data-l2key="value"></span></small></small><br><br>';
 
  if ((init(_cmd.subType) == 'other') && (init(_cmd.logicalId)!="refresh"))

  {
    tr +=
	     '<input class="cmdAttr form-control input-sm" data-l1key="configuration" data-l2key="infoName" placeholder="{{Nom de la Commande Info}}" style="width : 250px;" />';
  }

    tr +=   '</td>';
	tr +=   '<td>';
	
 if ((init(_cmd.logicalId)=="")||(init(_cmd.logicalId)=="volume"))
 {
	tr +=     '<input class="cmdAttr form-control input-sm" data-l1key="unite"  style="width : 100px;" placeholder="{{Unité}}" title="{{Unité}}" >';
	 //   + '<input class="tooltips cmdAttr form-control input-sm expertModeVisible" data-l1key="configuration" data-l2key="listValue" placeholder="{{Liste de valeur|texte séparé par ;}}" title="{{Liste}}" style="margin-top : 5px;">'
	tr +=     '<input class="tooltips cmdAttr form-control input-sm" data-l1key="configuration" data-l2key="minValue" placeholder="{{Min}}"  title="{{Min}} style="margin-top : 3px;"> ';
    tr +=   '</td>';
	tr +=   '<td>';
	tr +=     '<input class="tooltips cmdAttr form-control input-sm" data-l1key="configuration" data-l2key="maxValue" placeholder="{{Max}}" title="{{Max}} style="margin-top : 3px;">';
 }
 else
 {
    tr +=   '</td>';
	tr +=   '<td>';
	  }
	  
	tr +=   '</td>'
     +   '<td>'
     +     '<span><label class="checkbox-inline"><input type="checkbox" class="cmdAttr checkbox-inline" data-l1key="isVisible" checked/>{{Afficher}}</label></span> '
     +   '</td>'
     + '<td>';

    if (is_numeric(_cmd.id))
    {
      tr += '<a class="btn btn-default btn-xs cmdAction expertModeVisible" data-action="configure"><i class="fa fa-cogs"></i></a> ';
		   if (!((init(_cmd.name)=="Routine")||(init(_cmd.name)=="xxxxxxxx"))) //Masquer le bouton Tester
			  tr += '<a class="btn btn-default btn-xs cmdAction" data-action="test"><i class="fa fa-rss"></i> {{Tester}}</a>';
	}
    tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>'
     + '  </td>'
     + '</tr>';

    $('#table_cmd tbody').append(tr);
    var tr = $('#table_cmd tbody tr:last');
    jeedom.eqLogic.builSelectCmd(
    {
      id: $(".li_eqLogic.active").attr('data-eqLogic_id'),
      filter: {type: 'i'},
      error: function (error)
      {
        $('#div_alert').showAlert({message: error.message, level: 'danger'});
      },
      success: function (result)
      {
        tr.find('.cmdAttr[data-l1key=value]').append(result);
        tr.setValues(_cmd, '.cmdAttr');
        jeedom.cmd.changeType(tr, init(_cmd.subType));
      }
    });
  }
}

jeedom.plugin.getDeamonCookieInfo = function(_params)
{
    var paramsRequired = ['id'];
    var paramsSpecifics = {
        global: false,
    };
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/watchdog/core/ajax/watchdog.ajax.php';
    paramsAJAX.data = {
        action: 'getDeamonCookieInfo',
        id: _params.id
    };
    $.ajax(paramsAJAX);
};

jeedom.plugin.deamonCookieStart = function(_params)
{
    var paramsRequired = ['id'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/watchdog/core/ajax/watchdog.ajax.php';
    paramsAJAX.data = {
        action: 'deamonCookieStart',
        id: _params.id,
        debug: _params.debug || 0,
        forceRestart: _params.forceRestart || 0
    };
    $.ajax(paramsAJAX);
};

jeedom.plugin.deamonCookieStop = function(_params)
{
    var paramsRequired = ['id'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/watchdog/core/ajax/watchdog.ajax.php';
    paramsAJAX.data = {
        action: 'deamonCookieStop',
        id: _params.id
    };
    $.ajax(paramsAJAX);
};



jeedom.plugin.VerifiePresenceCookie = function(_params)
{
    var paramsRequired = ['id'];
    var paramsSpecifics = {};
    try {
        jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
    } catch (e) {
        (_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
        return;
    }
    var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
    var paramsAJAX = jeedom.private.getParamsAJAX(params);
    paramsAJAX.url = 'plugins/watchdog/core/ajax/watchdog.ajax.php';
    paramsAJAX.data = {
        action: 'VerifiePresenceCookie',
        id: _params.id
    };
    $.ajax(paramsAJAX);
};

 /*************************Node************************************************/

 jeedom.plugin.node = function() {
 };

 jeedom.plugin.node.action = function (_params) { //Delete reminder
 	var paramsRequired = ['action','node_id'];
 	var paramsSpecifics = {};
 	try {
 		jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
 	} catch (e) {
 		(_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
 		return;
 	}

 	var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
 	var paramsAJAX = jeedom.private.getParamsAJAX(params);
 	paramsAJAX.url = 'plugins/watchdog/desktop/php/watchdogProxy.php';
 	paramsAJAX.data = {
 		request: _params.action+'reminder?id='+_params.node_id+'&type=action&action='+_params.action,
 	};
 	$.ajax(paramsAJAX);
 }

 jeedom.plugin.node.action2 = function (_params) {  //Lancement d'une routine
 	var paramsRequired = ['action','node_id','node_id2'];
 	var paramsSpecifics = {};
 	try {
 		jeedom.private.checkParamsRequired(_params || {}, paramsRequired);
 	} catch (e) {
 		(_params.error || paramsSpecifics.error || jeedom.private.default_params.error)(e);
 		return;
 	}
 	var params = $.extend({}, jeedom.private.default_params, paramsSpecifics, _params || {});
 	var paramsAJAX = jeedom.private.getParamsAJAX(params);
 	paramsAJAX.url = 'plugins/watchdog/desktop/php/watchdogProxy.php';
 	paramsAJAX.data = {
 		request: 'routine?device='+_params.node_id2+'&routine='+_params.node_id,
 	};
 	$.ajax(paramsAJAX);
 }

