export class DateModel {
    startDate: Date = new Date();
    endDate: Date = new Date();
}

export class RoadMapItem extends DateModel {
    cssClass: string = '';
    itemType: RoadMapItemType  = RoadMapItemType.noop;
}

export enum RoadMapItemType {
    noop,
    release,
    flag,
}