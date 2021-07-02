public inherited sharing class RecordTypeController {
    
	public static Map<Id, String> recordTypeMap;
    
    @AuraEnabled
    public static Map<Id,String> fetchRecordTypeValues(String objectName) {
        List<Schema.RecordTypeInfo> recordTypes = Schema.getGlobalDescribe().get(objectName).getDescribe().getRecordTypeInfos();
        recordTypeMap = new Map<Id, String>();
        for(RecordTypeInfo rt : recordTypes) {
            if(rt.getName() != 'Master' && rt.getName().trim() != '') {
            	recordTypeMap.put(rt.getRecordTypeId(), rt.getName());
            }
        }
        System.debug('Apex class: ' + recordTypeMap);
        return recordTypeMap;
    }
}