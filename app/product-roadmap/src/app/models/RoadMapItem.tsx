export class DateModel {
    public startDateLabel: string = "";
    public endDateLabel: string = "";
    
    public startDate: Date = new Date();
    public endDate: Date = new Date();
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

export const months  = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
}
