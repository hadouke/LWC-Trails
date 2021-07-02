({
    showCreateRecordModal : function(cmp, recordType, entityApiName, sObjectName) {
        let createRecordEvent = $A.get("e.force:createRecord");
        let whoObjects = ["Lead", "Contact"];

        if(createRecordEvent) {
            if(recordType){
                if(whoObjects.includes(sObjectName)){
                    createRecordEvent.setParams({
                        "entityApiName":entityApiName,
                        "recordTypeId": recordType.id,
                        "defaultFieldValues": {
                            "WhoId": cmp.get("v.recordId"),
                            "Subject": recordType.name
                        }
                    });
                } else {
                    createRecordEvent.setParams({
                        "entityApiName":entityApiName,
                        "recordTypeId": recordType.id,
                        "defaultFieldValues": {
                            "WhatId": cmp.get("v.recordId"),
                            "Subject": recordType.name
                        }
                    });
                }
            }
            createRecordEvent.fire();
        } else {
            cmp.set("v.errors", "Cannot create event");
        }
    },
    
    closeModal: function(cmp) {
        let closeEvent = $A.get("e.force:closeQuickAction");
        if(closeEvent){
            closeEvent.fire();
        } else {
            cmp.set("v.errors", "Cannot create event");
        }
	},

	getItems: function(cmp, response) {
        let mapOfRecordTypes = response.getReturnValue();
        cmp.set("v.mapOfRecordType", mapOfRecordTypes);
        let sObject = cmp.get('v.sObjectName');

        let items=[];
        for(let key in mapOfRecordTypes) {
            let item = {"label": mapOfRecordTypes[key], "value": key};
            items.push(item);
        }
        if(sObject === 'Lead') {
            let types = ["General", "Finance", "Financial Planning", "In-Home Property", "In-Home MRP"];
            items = items.filter((item) => types.includes(item.label));
        }
        return items;
    },

	catchError: function(cmp, response) {
        let errors = response.getError();
        let toastParams = {
            title: "Error",
            message: "Unknown error", // Default error message
            type: "error"
        };
        if (errors && Array.isArray(errors) && errors.length > 0) {
            toastParams.message = errors[0].message;
        }
        let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams(toastParams);
            toastEvent.fire();
     }
})