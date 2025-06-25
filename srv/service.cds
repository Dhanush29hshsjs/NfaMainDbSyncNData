using { proj_schema as my } from '../db/schema';
// @requires: 'authenticated-user'
service PanApproval {
 entity PAN_Details_APR as projection on my.PAN_Details where created_by = 'rajendraakshay1@gmail.com' and ltrim(rtrim(task_id))!='' and status = 'pending for Approval';
 entity PAN_WEB_EVENT_APR as projection on my.PAN_WEB_EVENT;
 entity PAN_TYPE_APR as projection on my.PAN_TYPE;
 entity PAN_vendor_data_APR as projection on my.PAN_vendor_data;
 entity PAN_vendor_response_APR as projection on my.PAN_vendor_response;
 entity PAN_PAYMENT_TERM_DETAILS_APR as projection on my.PAN_PAYMENT_TERM_DETAILS;
 entity PAN_PRICE_DETAILS_APR as projection on my.PAN_PRICE_DETAILS;
 entity PAN_WORKFLOW_HISTORY_APR as projection on my.PAN_WORKFLOW_HISTORY;
 entity PAN_attachments_APR as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop_APR as projection on my.PAN_Payment_Method_Drop;
 entity PAN_Comments_APR as projection on my.PAN_Comments;
 entity vendorTaxDetails_APR as projection on my.vendorTaxDetails;
 entity approversKeys as projection on my.approversKeys;
  function getdata(data:String) returns String;
 function approve(data:String,email:String) returns String;
 function wf_data(panno:String,comment : String) returns String;
 function reject(data:String,email:String) returns String;
 function getDataForUserAndProject(user:String,project:String) returns String;
//  entity generaldetails_TAB as projection on my.generaldetails;
//  entity vendor_response_TAB as projection on my.vendor_response;
//  entity price_degit config --list tails_TAB as projection on my.price_details;
//  entity vendordata_TAB as projection on my.vendordata;
}
service CatalogService {
    @odata.draft.enabled
 entity tab1 as projection on my.PAN_Details where created_by = 'rajendraakshay1@gmail.com' and ltrim(rtrim(task_id))!='';
 entity tab2 as projection on my.PAN_WEB_EVENT;
 entity tab3 as projection on my.PAN_TYPE;
 entity vendor_data as projection on my.PAN_vendor_data;
 entity Fvendor_responseoo as projection on my.PAN_vendor_response;
 entity PAYMENT_TERM_DETAILS as projection on my.PAN_PAYMENT_TERM_DETAILS;
 entity PAN_PRICE_DETAILS as projection on my.PAN_PRICE_DETAILS;
 entity WORKFLOW_HISTORY as projection on my.PAN_WORKFLOW_HISTORY;
 entity attachments as projection on my.PAN_attachments;
//  entity PAN_Payment_Method_Drop as projection on my.PAN_Payment_Method_Drop;
entity PAN_Comments as projection on my.PAN_Comments;
 entity approversKeys as projection on my.approversKeys;
    function sendforapproval(data:String) returns LargeString;
    function comment(data:String) returns LargeString;
}