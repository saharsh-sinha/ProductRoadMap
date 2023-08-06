import { RoadMapItem } from "./RoadMapItem";

export class ReleaseModel extends RoadMapItem {
    
    releaseName: string = '';
    releaseDescription: string = '';

    url: string = '';

    features: FeatureModel[] = [];
}

export class FeatureModel {
    
    constructor() { }

    featureName: string = '';
    featureDescription: string = '';

    url: string = '';

    lineItems: LineItemModel[] = [];
}

export class LineItemModel {
    
    constructor() { }

    lineItemName: string = '';
    lineItemDescription: string = '';
    
    url: string = '';
}