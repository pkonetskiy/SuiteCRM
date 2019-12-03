/*********************************************************************************
 * SugarCRM Community Edition is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
 
 * SuiteCRM is an extension to SugarCRM Community Edition developed by Salesagility Ltd.
 * Copyright (C) 2011 - 2019 Salesagility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo and "Supercharged by SuiteCRM" logo. If the display of the logos is not
 * reasonably feasible for technical reasons, the Appropriate Legal Notices must
 * display the words "Powered by SugarCRM" and "Supercharged by SuiteCRM".
 ********************************************************************************/
if(typeof(SUGAR.collection)=="undefined"){SUGAR.collection=function(form_name,field_name,module,popupData){this.more_status=false;this.form=form_name;this.field=field_name;this.field_element_name=this.form+'_'+this.field;this.module=module;this.fields_count=0;this.extra_fields_count=0;this.first=true;this.cloneField=new Array();this.show_more_image=false;this.current_eval_code="";};SUGAR.collection.prototype={new_checkbox:function(id){if(document.getElementById(id).getAttribute('type')=='checkbox'){if(document.getElementById(id).value=='0'||document.getElementById(id).value==null||document.getElementById(id).value==''){document.getElementById(id).value='1';document.getElementById(id).setAttribute('checked','checked');}else{document.getElementById(id).value='0';document.getElementById(id).removeAttribute('checked');}}},correctnewpage:function(table){var tes=table.getElementsByTagName('textarea');for(var i=0;i<tes.length;i++){table.getElementsByTagName('textarea')[i].style.width='100%';}},add_change_control:function(id){if(document.getElementById(id).getAttribute('type')=='checkbox'){var oldonclick='';if(typeof(document.getElementById(id).attributes.onclick)!='undefined'){oldonclick=document.getElementById(id).attributes.onclick.value;}
var newonclick='collection'+this.field+'.field_row_change(this.id,"add");'+oldonclick;document.getElementById(id).setAttribute('onclick',newonclick);}else{var oldonchange='';if(typeof(document.getElementById(id).attributes.onchange)!='undefined'){oldonchange=document.getElementById(id).attributes.onchange.value;}
var newonchange='collection'+this.field+'.field_row_change(this.id,"add");'+oldonchange;document.getElementById(id).setAttribute('onchange',newonchange);this.change_class_sqsEnabled(id);}},change_class_sqsEnabled:function(id){if(document.getElementById(id).getAttribute('class'))
if(document.getElementById(id).getAttribute('class').indexOf('sqsEnabled')>=0){document.getElementById(id).setAttribute('style','margin-top: 0px; width: calc(100% - 84px);');var buttons=document.getElementById(id).nextElementSibling.nextElementSibling;if(buttons.getAttribute('class').indexOf('id-ff')>=0){var oldonclick=buttons.firstElementChild.getAttribute('onclick');var newonclick='collection'+this.field+'.field_row_change(this.id,"add");'+oldonclick;buttons.firstElementChild.setAttribute('onclick',newonclick);}}},field_row_change:function(id,doing){var change_raw_list=new Array();if(doing=='add'||doing=='clean'){var arr_for_id=id.split('_collection_');var change_raw_list=document.getElementById('collection_'+this.field+'_change').getAttribute('value').split(';');var found='-1';for(var s=0;s<=change_raw_list.length;s++){if(change_raw_list[s]==arr_for_id[1]){found=s;}}
if(found==='-1'&&doing==='add')change_raw_list[change_raw_list.length]=arr_for_id[1];if(found!=='-1'&&doing==='clean')change_raw_list.splice(found,1);}else if(doing=='open'){for(var s=0;s<=id;s++){change_raw_list[s]=s;}}
var list_row=change_raw_list.join(';');document.getElementById('collection_'+this.field+'_change').setAttribute('value',list_row);},select_rows:function(){var selected_rows=new Array();var k=0;for(var s=0;s<=this.fields_count;s++){if(document.getElementById('check_'+this.field+'_collection_'+s))
if(document.getElementById('check_'+this.field+'_collection_'+s).value=='1'){selected_rows[k]=s;k++;}}
return selected_rows;},save_remove_id:function(num){var id=document.getElementById('id_'+this.field+'_collection_'+num).getAttribute('value');var current_list_id=new Array();if(document.getElementById('collection_'+this.field+'_remove').getAttribute('value')!=''){current_list_id=document.getElementById('collection_'+this.field+'_remove').getAttribute('value').split(';');};if(id!=''){current_list_id[current_list_id.length]=id;var list_id=current_list_id.join(';')
document.getElementById('collection_'+this.field+'_remove').setAttribute('value',list_id);};},selected_remove:function(){var array_select_rows=new Array();array_select_rows=this.select_rows();for(var s=0;s<array_select_rows.length;s++){this.save_remove_id(array_select_rows[s]);this.remove(array_select_rows[s]);};},clean_current:function(field_id){if(field_id){var current_name='clean_'+this.field+'_collection_';var num=field_id.substring(current_name.length);this.save_remove_id(num);var row_elem=document.getElementById('lineFields_'+this.form+'_'+this.field+'_'+num);}else{var row_elem=document.getElementById('lineFields_'+this.form+'_'+this.field+'_'+this.fields_count);}
var input_elems=row_elem.getElementsByTagName('input');if(input_elems!="undefined")
for(var x=0;x<input_elems.length;x++){if(input_elems[x].id.length>0){if(document.getElementById(input_elems[x].id).getAttribute('name').indexOf('check_')===0){if(document.getElementById(input_elems[x].id).getAttribute('name').indexOf('_collection_0')===-1&&!num)
document.getElementById(input_elems[x].id).setAttribute('style','display: inline-block;');}else
if(document.getElementById(input_elems[x].id).getAttribute('hidden')){document.getElementById(input_elems[x].id).setAttribute('value','');}else{document.getElementById(input_elems[x].id).value='';document.getElementById(input_elems[x].id).innerHTML='';}}}
input_elems=row_elem.getElementsByTagName('textarea');if(input_elems!="undefined")
for(var x=0;x<input_elems.length;x++){document.getElementById(input_elems[x].id).value='';document.getElementById(input_elems[x].id).innerHTML='';}},remove:function(num){var div_el;div_el=document.getElementById('check_'+this.field+'_collection_'+num);var tr_to_remove=document.getElementById('lineFields_'+this.field_element_name+'_'+num);div_el.parentNode.parentNode.parentNode.removeChild(tr_to_remove);},add:function(values){this.fields_count++;var Field0=this.init_clone(values);this.cloneField[1].appendChild(Field0);if(document.getElementById('more_'+this.field_element_name)&&document.getElementById('more_'+this.field_element_name).style.display=='none'){document.getElementById('more_'+this.field_element_name).style.display='';}},init_clone:function(values){if(typeof this.cloneField[0]=='undefined'){return;}
if(typeof values=="undefined"){values=new Array();values['name']="";values['id']="";}
var count=this.fields_count;var Field0=SUGAR.isIE?SUGAR.collection.safe_clone(this.cloneField[0],true):this.cloneField[0].cloneNode(true);Field0.id="lineFields_"+this.field_element_name+"_"+count;for(var ii=0;ii<Field0.childNodes.length;ii++){if(typeof(Field0.childNodes[ii].tagName)!='undefined'&&Field0.childNodes[ii].tagName=="TD"){for(var jj=0;jj<Field0.childNodes[ii].childNodes.length;jj++){currentNode=Field0.childNodes[ii].childNodes[jj];this.process_node(Field0.childNodes[ii],currentNode,values);}}}
return Field0;},process_node:function(parentNode,currentNode,values){if(parentNode.getAttribute('field')!=null){var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');var tdfield=parentNode.getAttribute('field').replace(re,this.field+"_collection_"+this.fields_count);parentNode.setAttribute('field',tdfield);}
if(parentNode.className=='td_extra_field'){if(parentNode.id){parentNode.id='';}
var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');parentNode.innerHTML=parentNode.innerHTML.replace(re,this.field+"_collection_"+this.fields_count);}else if(currentNode.tagName&&currentNode.tagName=='SPAN'){currentNode.id=/_input/.test(currentNode.id)?this.field_element_name+'_input_div_'+this.fields_count:this.field_element_name+'_radio_div_'+this.fields_count;if(/_input/.test(currentNode.id)){currentNode.name='teamset_div';}
var input_els=currentNode.getElementsByTagName('input');for(var x=0;x<input_els.length;x++){if(typeof(input_els[x].id)=='undefined'||input_els[x].id==''){input_els[x].id=currentNode.id;}
if(input_els[x].tagName&&input_els[x].tagName=='INPUT'){this.process_node(parentNode,input_els[x],values);}}
var button_els=currentNode.getElementsByTagName('button');for(var x=0;x<button_els.length;x++){if(typeof(button_els[x].id)=='undefined'||button_els[x].id==''){button_els[x].id=currentNode.id;}
var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');button_els[x].id=button_els[x].id.replace(re,this.field+"_collection_"+this.fields_count);button_els[x].name=button_els[x].name.replace(re,this.field+"_collection_"+this.fields_count);if(button_els[x].getAttribute('onchange')){var current_attribute=button_els[x].getAttribute('onchange');current_attribute=current_attribute.replace(re,this.field+"_collection_"+this.fields_count);button_els[x].removeAttribute('onchange');button_els[x].setAttribute('onchange',current_attribute);};if(button_els[x].getAttribute('onclick')){var current_attribute=button_els[x].getAttribute('onclick');current_attribute=current_attribute.replace(re,this.field+"_collection_"+this.fields_count);button_els[x].removeAttribute('onclick');button_els[x].setAttribute('onclick',current_attribute);};if(button_els[x].getAttribute('onblur')){var current_attribute=button_els[x].getAttribute('onblur');current_attribute=current_attribute.replace(re,this.field+"_collection_"+this.fields_count);button_els[x].removeAttribute('onblur');button_els[x].setAttribute('onblur',current_attribute);};}
var datetime_els=currentNode.getAttribute('class');if(datetime_els==='dateTime'){var current_img=currentNode.innerHTML;var toreplace=this.field+"_collection_0_trigger";var re=new RegExp(toreplace,'g');currentNode.innerHTML=current_img.replace(re,this.field+"_collection_"+this.fields_count+"_trigger");var script_create=currentNode.parentElement.getElementsByTagName('script');var current_script=script_create[0].innerHTML;var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');script_create[0].innerHTML=current_script.replace(re,this.field+"_collection_"+this.fields_count);window.execScript?setTimeout(function(){execScript(script_create[0].innerHTML)},500):setTimeout(function(){window.eval(script_create[0].innerHTML)},500);}}else if(currentNode.tagName&&currentNode.tagName=='SCRIPT'){var current_script=currentNode.innerHTML;var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');currentNode.innerHTML=current_script.replace(re,this.field+"_collection_"+this.fields_count);}else if(currentNode.name){var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');var name=currentNode.name;var new_name=name.replace(re,this.field+"_collection_"+this.fields_count);var new_id=currentNode.id.replace(re,this.field+"_collection_"+this.fields_count);if(currentNode.type=='checkbox'){currentNode.setAttribute('value','0');var oldonclick='';if(typeof(currentNode.attributes.onclick)!='undefined'){oldonclick=currentNode.attributes.onclick.value;}
var newonclick='collection'+this.field+'.new_checkbox(this.id);'+oldonclick;currentNode.setAttribute('onclick',newonclick);}
switch(name){case toreplace:currentNode.name=new_name;currentNode.id=new_id;currentNode.value=values['name'];break;case"id_"+toreplace:currentNode.name=new_name.replace(RegExp('_0','g'),"_"+this.fields_count);currentNode.id=new_id.replace(RegExp('_0','g'),"_"+this.fields_count);currentNode.value=values['id'];break;case"btn_"+toreplace:currentNode.name=new_name;currentNode.attributes['onclick'].value=currentNode.attributes['onclick'].value.replace(re,this.field+"_collection_"+this.fields_count);currentNode.attributes['onclick'].value=currentNode.attributes['onclick'].value.replace(RegExp(this.field+"_collection_0",'g'),this.field+"_collection_"+this.fields_count);break;case"allow_new_value_"+toreplace:currentNode.name=new_name;currentNode.id=new_id;break;case"remove_"+toreplace:currentNode.name=new_name;currentNode.id=new_id;currentNode.setAttribute('collection_id',this.field_element_name);currentNode.setAttribute('remove_id',this.fields_count);currentNode.onclick=function(){collection[this.getAttribute('collection_id')].remove(this.getAttribute('remove_id'));};break;case"primary_"+this.field+"_collection":currentNode.id=new_id;currentNode.value=this.fields_count;currentNode.checked=false;currentNode.setAttribute('defaultChecked','');break;case"check_"+toreplace:currentNode.name=new_name;currentNode.id=new_id;currentNode.removeAttribute('hidden');break;default:if(currentNode.name.substring(currentNode.name.indexOf(toreplace))==toreplace){currentNode.name=new_name;currentNode.id=new_id;}else
alert(toreplace+'|'+currentNode.name+'|'+name+'|'+new_name);break;}}},create_clone:function(){var oneField=document.getElementById('lineFields_'+this.field_element_name+'_0');this.cloneField[0]=SUGAR.isIE?SUGAR.collection.safe_clone(oneField,true):oneField.cloneNode(true);this.cloneField[1]=oneField.parentNode;var clone_id=this.form+'_'+this.field+'_collection_0';},};SUGAR.collection.safe_clone=function(e,recursive)
{if(e.nodeName=="#text")
{return document.createTextNode(e.data);}
if(!e.tagName)return false;var newNode=document.createElement(e.tagName);if(!newNode)return false;var properties=['id','class','style','name','type','valign','border','width','height','top','bottom','left','right','scope','row','columns','src','href','className','align','nowrap'];if(SUGAR.isIE7&&e.tagName.toLowerCase()=='input')
{var properties=['id','class','style','name','type','valign','border','width','top','bottom','left','right','scope','row','columns','src','href','className','align','nowrap'];}
for(var i in properties)
{if(e[properties[i]])
{if((properties[i]!='style'||!SUGAR.isIE)&&(properties[i]!='href'||e.tagName=='a'||e.tagName=='iframe')){if(properties[i]=="type"){newNode.setAttribute(properties[i],e[properties[i]]);}else{newNode[properties[i]]=e[properties[i]];}}}}
if(recursive)
{for(var i in e.childNodes)
{if(e.childNodes[i].nodeName&&(!e.className||e.className!="yui-ac-container"))
{var child=SUGAR.collection.safe_clone(e.childNodes[i],true);if(child)newNode.appendChild(child);}}}
return newNode;}}