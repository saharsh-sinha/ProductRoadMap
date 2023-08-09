export class DateModel {
    public startDateLabel: string = "asd";
    public endDateLabel: string = "fgh";
    
    public startDate: Date = new Date();
    public endDate: Date = new Date();

    // public getStartDateLabel(): string { return (this.startDateLabel == "" ? this.getDateString(this.startDate) : this.startDateLabel) };
    // public set startDateLabel(value: string) {  this.startDateLabel = value; };

    // public getEndDateLabel(): string { 
    //     console.log(this.endDateLabel, this.endDate); 
    //     return (this.endDateLabel == "" ? this.getDateString(this.endDate) : this.endDateLabel); 
    // };
    // public set endDateLabel(value: string) {  this._endDateLabel = value; };

    private getDateString(date: Date): string {
        return `${months[new Date(date).getMonth()]} ${new Date(date).getDay()+1} ${new Date(date).getFullYear()}`;
    }
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
