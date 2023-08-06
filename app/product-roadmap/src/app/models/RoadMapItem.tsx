export class RoadMapItem {
    cssClass: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    itemType: RoadMapItemType  = RoadMapItemType.noop;
}

export enum RoadMapItemType {
    noop,
    release,
    flag,
}