import { LightningElement, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class DoNotCall extends LightningElement {
     @api objectApiName;
}