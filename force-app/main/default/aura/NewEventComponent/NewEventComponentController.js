({
	init : function(cmp, event, helper) {
		let action = cmp.get("c.fetchRecordTypeValues");
        action.setParams({
            "objectName": "Event"
        });
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                let items = helper.getItems(cmp,response);
                cmp.set("v.options", items);
            } else {
                helper.catchError(cmp, response);
            }
        });
        $A.enqueueAction(action);
     },
    
    handleChange: function(cmp,event,helper) {
        var option = event.getParam("value");
        cmp.set('v.option', option);
    },
    
    createRecord: function(cmp, event, helper, sObjectRecord, sObjectType) {
        var option = cmp.get('v.option');
        var mapOfRecordTypes = cmp.get("v.mapOfRecordType");
        var recordType;

        if(option) {
            for(var key in mapOfRecordTypes) {
                if(option === key) {
                	recordType = {"id": key, "name": mapOfRecordTypes[key]};
                	break;
                }
            }

            helper.closeModal(cmp);
            helper.showCreateRecordModal(cmp, recordType, "Event", cmp.get('v.sObjectName'));
        } else {
            cmp.set("v.errors", "Choose an option.");
        }
    },
    
    closeModal: function(cmp, event, helper) {
        helper.closeModal(cmp);
        cmp.set("v.options", null);
        cmp.set("v.option", null);
    }
})