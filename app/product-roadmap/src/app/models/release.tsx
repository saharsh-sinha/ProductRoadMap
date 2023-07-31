
export class ReleaseModel {
    
    releaseName: string = '';
    releaseDescription: string = '';

    releaseStartDate: Date = new Date();
    releaseEndDate: Date = new Date();

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