import { IInputFieldResponse } from "~/components/molecules/InputFields/types/IInputFields";
import { ISettings } from "~/components/molecules/InputFields/types/IUseInputMaster";

export const form1 = JSON.parse(`{
    "taskId": "313935",
    "taskName": "Corporate Details",
    "taskKey": "corporateDetails",
    "formData": [
      {
        "id": "testexpression",
        "name": "Test Expression",
        "type": "expression",
        "value": "test",
        "expression": "test",
        "formCategory": "",
        "navigation": "",
        "onLoad": true
      },
      {
        "id": "templatecheckbox",
        "name": "Template Checkbox",
        "type": "checkbox",
        "required": true,
        "options": [
          {
            "key": "",
            "value": "Template 1"
          },
          {
            "key": "Template 2",
            "value": "Template 2"
          },
          {
            "key": "Template 3",
            "value": "Template 3"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "multiSelect": true,
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "singleupload",
        "name": "Single upload",
        "type": "upload",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "uploadtype": "0"
      },
      {
        "id": "approvalremarks",
        "name": "Approval Remarks",
        "type": "remarks"
      },
      {
        "id": "languagesknown",
        "name": "Languages known",
        "type": "dropdown",
        "options": [
          {
            "key": "0",
            "value": "Hindi"
          },
          {
            "key": "1",
            "value": "English"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "multiSelect": true,
        "autocomplete": true,
        "formCategory": "",
        "navigation": "",
        "selectoption": true
      },
      {
        "id": "multipleuploads",
        "name": "Multiple Uploads",
        "type": "upload",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "multipleFiles": true,
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "uploadtype": "0"
      },
      {
        "id": "leadtype",
        "name": "Lead Type",
        "type": "dropdown",
        "required": true,
        "options": [
          {
            "key": "0",
            "value": "Please choose one..."
          },
          {
            "key": "1",
            "value": "Open"
          },
          {
            "key": "2",
            "value": "Close"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "multiSelect": true,
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "selectoption": true
      },
      {
        "id": "corporateid",
        "name": "Corporate Id",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "defaultValue": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "panno",
        "name": "Pan No",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "panauthentication",
        "dependencyEvent": "onchange",
        "min": 0,
        "max": 10,
        "retainInfo": true,
        "formCategory": "",
        "navigation": "",
        "regex": "[A-Z]{5}[0-9]{4}[A-Z]{1}",
        "regexerrormsg": "Enter Valid PAN No",
        "lengtherrormsg": "Pan No should be 10 character",
        "uppercase": true
      },
      {
        "id": "panauthentication",
        "name": "Pan Authentication",
        "type": "feature",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "restUrl": "/v1/karza/pan-authentication",
        "outputJson": {
          "popupFlag": false,
          "rerunFlag": false,
          "saveForm": true,
          "fieldMap": {
            "applicantname": "applicantname",
            "panname": "panname",
            "karzapanauthenticationapistatus": "Gst Search Pan Api Status"
          }
        },
        "requestJson": {
          "fieldMap": {
            "panno": "PAN NO."
          }
        },
        "errormsg": "Error message is displayed here 2",
        "successmsg": "Success message is displayed here 2"
      },
      {
        "id": "whatsyourluckycolour",
        "name": "What's your lucky colour?",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "colorpicker": true
      },
      {
        "id": "applicantname",
        "name": "Name",
        "type": "text",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "panname",
        "name": "Pan Name",
        "type": "text",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "tradename",
        "name": "Trade Name",
        "type": "text",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "defaultValue": "super",
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "columncount": 2,
        "lowercase": true
      },
      {
        "id": "turnoverslab",
        "name": "Turnover Slab",
        "type": "dropdown",
        "required": true,
        "options": [
          {
            "key": "1",
            "value": "INR 5 - 10 Crores"
          },
          {
            "key": "2",
            "value": "INR 10 - 15 Crores"
          },
          {
            "key": "3",
            "value": "INR 15 - 20 Crores"
          },
          {
            "key": "Others",
            "value": "Others"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": "",
        "apponly": true,
        "selectoption": true
      },
      {
        "id": "otherturnoverslabreadonly",
        "name": "Other Turnover Slab Readonly",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onchange",
        "visibilityField": "readonly",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "otherturnoverslabonload",
        "name": "Other Turnover Slab Onload",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onload",
        "visibilityField": "show",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "otherturnoverslabdefault",
        "name": "Other Turnover Slab Default",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onchange",
        "visibilityField": "defaultvalue",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "defaultValue": "100",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "otherturnoverslabreq",
        "name": "Other Turnover Slab Req",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onchange",
        "visibilityField": "required",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "otherturnoverslabhide",
        "name": "Other Turnover Slab Hide",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onchange",
        "visibilityField": "hide",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "otherturnoverslabshow",
        "name": "Other Turnover Slab Show",
        "type": "text",
        "visibilityCondition": "turnoverslab",
        "visibilityEvent": "onchange",
        "visibilityField": "show",
        "visibilityOperation": "equals",
        "visibilityOperationMatchValue": "Others",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "entitytype",
        "name": "Entity Type",
        "type": "dropdown",
        "options": [
          {
            "key": "0",
            "value": "Please choose one..."
          },
          {
            "key": "1",
            "value": "Private Limited"
          },
          {
            "key": "2",
            "value": "Public Limited"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "retainInfo": true,
        "autocomplete": true,
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "selectoption": true
      },
      {
        "id": "registeredaddress",
        "name": "Registered Address",
        "type": "text",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "gender",
        "name": "Gender",
        "type": "radio-buttons",
        "required": true,
        "options": [
          {
            "key": "Male",
            "value": "Male"
          },
          {
            "key": "Female",
            "value": "Female"
          },
          {
            "key": "Others",
            "value": "Others"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "defaultValue": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "chooseagstn",
        "name": "Choose a GSTN",
        "type": "dropdown",
        "required": true,
        "options": [
          {
            "key": "0",
            "value": "Please choose one..."
          },
          {
            "key": "1",
            "value": "22AAAAA0000A1Z5"
          },
          {
            "key": "2",
            "value": "22BRY563556A1Z5"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "selectoption": true
      },
      {
        "id": "emailid",
        "name": "Email Id",
        "type": "email",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "primarygstn",
        "name": "Primary GSTN",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "minvalue": 10,
        "maxvalue": 1000,
        "defaultValue": "740",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "valueerrormsg": "Min value is 10 and Max value should be 1000",
        "slider": true
      },
      {
        "id": "industry",
        "name": "Industry",
        "type": "dropdown",
        "required": true,
        "options": [
          {
            "key": "0",
            "value": "Please choose one..."
          },
          {
            "key": "1",
            "value": "FMCG"
          },
          {
            "key": "2",
            "value": "SSEG"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true,
        "selectoption": true
      },
      {
        "id": "country",
        "name": "Country",
        "type": "dropdown",
        "options": [
          {
            "key": "1",
            "value": "INDIA"
          },
          {
            "key": "2",
            "value": "Pakistan"
          }
        ],
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "state",
        "dependencyEvent": "onchange",
        "formCategory": "",
        "navigation": "",
        "selectoption": true
      },
      {
        "id": "state",
        "name": "State",
        "type": "dropdown",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "city",
        "dependencyEvent": "onchange",
        "restUrl": "/states?column=name,id&country_id={country}",
        "formCategory": "",
        "navigation": "",
        "selectoption": true
      },
      {
        "id": "city",
        "name": "City",
        "type": "dropdown",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "restUrl": "/city?column=name,id&state_id={state}",
        "formCategory": "",
        "navigation": "",
        "selectoption": true
      },
      {
        "id": "number1",
        "name": "Number 1",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "number3",
        "dependencyEvent": "onchange",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "number2",
        "name": "Number 2",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "number3",
        "dependencyEvent": "onchange",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "number3",
        "name": "Addition of 2 Fields",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "subof2fields",
        "dependencyEvent": "onchange",
        "expression": "{number1}+{number2}",
        "intermediateExpression": "{number1}+{number2}",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "rfield1",
        "name": "R Field1",
        "type": "text",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": "",
        "apponly": true,
        "uppercase": true
      },
      {
        "id": "rfield2",
        "name": "R Field 2",
        "type": "text",
        "required": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": "",
        "apponly": true,
        "lowercase": true
      },
      {
        "id": "subof2fields",
        "name": "Sub of 2 fields",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "minof2fields",
        "dependencyEvent": "onchange",
        "expression": "{number1}-{number2}",
        "intermediateExpression": "{number1}-{number2}",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "multiple1field",
        "name": "Multiple 1 Field",
        "type": "decimal",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "multiplefieldsresult",
        "dependencyEvent": "onchange",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "multiple2field",
        "name": "Multiple 2 Field",
        "type": "decimal",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "multiplefieldsresult",
        "dependencyEvent": "onchange",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "multiplefieldsresult",
        "name": "Multiple Fields Result",
        "type": "decimal",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "divide2fieldsresult",
        "dependencyEvent": "onchange",
        "expression": "{multiple1field}*{multiple2field}",
        "intermediateExpression": "{multiple1field}*{multiple2field}",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "divide2fieldsresult",
        "name": "Divide 2 Fields Result",
        "type": "decimal",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "expression": "{multiple1field}/{multiple2field}",
        "intermediateExpression": "{multiple1field}/{multiple2field}",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "field1",
        "name": "Field 1",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "resultoffield1",
        "dependencyEvent": "onchange",
        "defaultValue": "Test",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "resultoffield1",
        "name": "Result of Field1",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "expression": "({field1}===@Test@?@1@:@2@)",
        "intermediateExpression": "IF({field1}=@Test@,@1@,@2@)",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "email",
        "name": "Email",
        "type": "email",
        "required": true,
        "visibilityCondition": "panno",
        "visibilityEvent": "onchange",
        "visibilityField": "hide",
        "visibilityOperation": "notequals",
        "visibilityOperationMatchValue": "1234567",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "apponly": true
      },
      {
        "id": "minof2fields",
        "name": "Min of 2 fields",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "maxof2fields",
        "dependencyEvent": "onchange",
        "expression": "wf_minimum({number1},{number2})",
        "intermediateExpression": "wf_minimum({number1},{number2})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "maxof2fields",
        "name": "Max of 2 fields",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "complexformula",
        "dependencyEvent": "onchange",
        "expression": "wf_maximum({number1},{number2})",
        "intermediateExpression": "wf_maximum({number1},{number2})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "dateofbirth",
        "name": "Date of Birth",
        "type": "date",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "calculatemonth",
        "dependencyEvent": "onchange",
        "format": "111000",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "calculatemonth",
        "name": "Calculate Month",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "calculatedays",
        "dependencyEvent": "onchange",
        "expression": "wf_calculateMonth({dateofbirth})",
        "intermediateExpression": "wf_calculateMonth({dateofbirth})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "calculatedays",
        "name": "Calculate Days",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "age",
        "dependencyEvent": "onchange",
        "expression": "wf_calculate_days({dateofbirth})",
        "intermediateExpression": "wf_calculate_days({dateofbirth})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "age",
        "name": "Age",
        "type": "integer",
        "readOnly": true,
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "expression": "wf_calculateYears({dateofbirth})",
        "intermediateExpression": "wf_calculateYears({dateofbirth})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "complexformula",
        "name": "Complex Formula",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "expression": "{number1}+wf_maximum({number3},{subof2fields})",
        "intermediateExpression": "{number1}+wf_maximum({number3},{subof2fields})",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": ""
      },
      {
        "id": "rfield4",
        "name": "R field4",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "rfield3",
        "name": "R field3",
        "type": "text",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "Visibility",
        "navigation": ""
      },
      {
        "id": "slidernumber",
        "name": "Slider Number",
        "type": "integer",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "tagOperation": "",
        "tagAssociatedValue": "",
        "formCategory": "",
        "navigation": "",
        "slider": true
      },
      {
        "id": "sliderdecimal",
        "name": "Slider Decimal",
        "type": "decimal",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formCategory": "",
        "navigation": "",
        "slider": true
      },
      {
        "id": "simpletextarea",
        "name": "Simple Text Area",
        "type": "multi-line-text",
        "placeholder": "hola amigos",
        "visibilityCondition": "",
        "visibilityEvent": "",
        "visibilityField": "",
        "visibilityOperation": "",
        "dependencyCondition": "",
        "dependencyEvent": "",
        "formatted": true,
        "formCategory": "",
        "navigation": "",
        "rowcount": 100,
        "columncount": 3
      }
    ],
    "msg": "Form Data returned for assinged task.",
    "repeaterData": [
      {
        "id": "testrepeater",
        "name": "Test Repeater",
        "type": "repeater",
        "options": [
          {
            "key": "rfield1",
            "value": "rfield1"
          },
          {
            "key": "rfield2",
            "value": "rfield2"
          },
          {
            "key": "rfield3",
            "value": "rfield3"
          },
          {
            "key": "rfield4",
            "value": "rfield4"
          }
        ],
        "columnSize": 4,
        "readOnly": false,
        "displayLabel": false,
        "retainInfo": false,
        "floatingbutton": false
      }
    ],
    "formCategoryData": {
      "id": "label",
      "name": "Label",
      "type": "formCategory",
      "value": "Visibility",
      "options": [
        {
          "key": "Visibility",
          "value": "Visibility"
        }
      ],
      "columnSize": 0,
      "readOnly": false,
      "displayLabel": false,
      "retainInfo": false,
      "floatingbutton": false
    },
    "taskList": [
      {
        "stageName": "Corporate Details",
        "taskData": [
          {
            "taskId": "corporateDetails",
            "taskName": "Corporate Details",
            "edit": false,
            "formKey": "corporatedetails",
            "phase": "Leads/Applications",
            "stage": "Corporate Details",
            "role": [
              "Super Admin",
              "Sales"
            ],
            "save": true,
            "submit": true,
            "applicationstatus": "Application In Progress",
            "submitted": false
          }
        ]
      },
      {
        "stageName": "Choose Lenders",
        "taskData": [
          {
            "taskId": "chooseLenders",
            "taskName": "Choose Lenders",
            "edit": false,
            "formKey": "chooselenders",
            "phase": "Leads/Applications",
            "stage": "Choose Lenders",
            "role": [
              "Super Admin",
              "Sales"
            ],
            "save": false,
            "submit": false,
            "applicationstatus": "Application In Progress",
            "submitted": false
          }
        ]
      },
      {
        "stageName": "Program Details",
        "taskData": [
          {
            "taskId": "programDetails",
            "taskName": "Program Details",
            "edit": false,
            "formKey": "programdetails",
            "phase": "Leads/Applications",
            "stage": "Program Details",
            "role": [
              "Super Admin",
              "Sales"
            ],
            "save": false,
            "submit": false,
            "applicationstatus": "Application In Progress",
            "submitted": false
          }
        ]
      },
      {
        "stageName": "Additional Details",
        "taskData": [
          {
            "taskId": "additionalDetails",
            "taskName": "Additional Details",
            "edit": false,
            "formKey": "additionaldetails",
            "phase": "Leads/Applications",
            "stage": "Additional Details",
            "role": [
              "Super Admin",
              "Sales"
            ],
            "save": false,
            "submit": false,
            "applicationstatus": "Application In Progress",
            "submitted": false
          }
        ]
      }
    ],
    "settings": {
      "editData": null,
      "approvalFlag": false,
      "columnSize": 3,
      "formKey": "corporatedetails",
      "stage": "Corporate Details",
      "financialAnalysis": false,
      "financialSpreading": false,
      "esddChecklist": false,
      "cashFlowAnalysis": false,
      "queryoption": false,
      "mobilereadonly": false,
      "defaultonvisibility": false,
      "formbasedcalculation": false,
      "apitrigger": false,
      "savereload": true
    }
  }`) as IMasterFormFieldsResponse

export interface IMasterFormFieldsResponse {
    formData: Array<IInputFieldResponse>;
    settings: ISettings;
    url: string;
}