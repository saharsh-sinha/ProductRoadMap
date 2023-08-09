import { DateModel } from "./models/RoadMapItem";

export const timeLines: TimeFrameModel[][]  = [];
export default function TimeLine(props: {
    dates: DateModel,
    pixelsPerDay: number,
    splitInto: string[],
}) {
    timeLines.push(getTimeFramesYear(props.dates.startDate, props.dates.endDate));
    return (
        <div className="d-flex flex-column flex-nowrap justify-content-start">
            {timeLines.map((timeLine, i) => (
                <div key={i} className="d-flex flex-row flex-nowrap justify-content-start">
                    {timeLine.map((timeFrame, j) => (
                        <div key={i*100+j} className={`h4 release-card transition-400ms ${j % 2 == 0 ? "timeline-header-bg-even" : "timeline-header-bg-odd"}`} 
                            style={{width: props.pixelsPerDay * numberOfDaysLocal(timeFrame), position: 'absolute', left: props.pixelsPerDay * numberOfDays(props.dates.startDate, timeFrame.startDate) }}>
                            {timeFrame.label}
                            <div className="flex" >
                            {
                                props.splitInto.map((split, idx) => (
                                    <div key={idx} className="sub-timeline">
                                        <div className="sub-timeline-marker"></div>
                                        <div className="sub-timeline-label">{split}</div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )

    function getTimeFramesYear(startDate: Date, endDate: Date): TimeFrameModel[] {
        var timeFrames: TimeFrameModel[] = [];
        var newTimeFrame = startDate;
        var year = newTimeFrame.getFullYear();
        while (newTimeFrame <= endDate){
            timeFrames.push(
                new TimeFrameModel(
                    new Date(newTimeFrame.getTime()) ,
                    new Date(year, 12, 31),
                    year.toString(),
            ));
            year++;
            newTimeFrame = new Date(year, 1, 1);
        }
        return timeFrames;
    }
    
    function numberOfDaysLocal(timeFrameModel: TimeFrameModel): number {
        return numberOfDays(timeFrameModel.startDate, timeFrameModel.endDate);
    }  
}

export function numberOfDays(startDate: Date, endDate: Date): number {
    let days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000*60*60*24);
    return days;
}  
    
export class TimeFrameModel {

    constructor(
        startDate: Date,
        endDate: Date,
        label: string) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.label = label;
    }

    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public label: string = "";
    
    
} 


// export const flags: FlagModel[] = getFlags();

// function getFlags(): FlagModel[] {
//     let flags: FlagModel[] = [];
//     let prevDate: Date = new Date(2019, 2, 15);
//     for (let i = 0; i < 30; i++) {
//         var flag = new FlagModel();
//         flag.label = 'flag ' + i;
//         flag.startDate = prevDate; //  new Date(Math.ceil(2019 + (i*0.25)), Math.ceil(1 + i*0.25)%12, 15);
//         prevDate = addDays(prevDate, Math.floor(Math.random() * 11));
//         flag.endDate = prevDate;
//         prevDate = addDays(prevDate, Math.floor(Math.random() * 365) + 90);
//         flag.itemType = RoadMapItemType.flag;
//         flags.push(flag);
//     }
//     return flags;
// }
