import { FlagModel } from "./models/FlagModel";
import { RoadMapItemType } from "./models/RoadMapItem";
import { addDays, releases } from "./roadmap";


export const startDate: Date = new Date("2017-06-16");
const endDate: Date = new Date("2028-01-16");
const yearBreakdown: boolean = true;
const quarterBreakdown: boolean = true;
const monthBreakdown: boolean = true;
const weekBreakdown: boolean = true;
const dayWidthPx = 1;

export default function TimeLine() {
    let timeLines: TimeFrameModel[][]  = [];
    let startDate = new Date(releases[0].startDate.getFullYear() - 2, releases[0].startDate.getMonth(), releases[0].startDate.getDay());
    let endDate = new Date(releases[releases.length-1].endDate.getFullYear() + 2, 11, 31);
    timeLines.push(getTimeFramesYear(startDate, endDate));
    // console.log(timeLines);
    return (<div className="d-flex flex-column flex-nowrap justify-content-start">
        {timeLines.map((timeLine) => (
            <div className="d-flex flex-row flex-nowrap justify-content-start">
                {timeLine.map((timeFrame) => (
                    <div className="card" style={{width: dayWidthPx * numberOfDaysLocal(timeFrame), position: 'absolute', left: numberOfDays(startDate, timeFrame.startDate) }}>
                        {timeFrame.label}
                        <div className="timeline-marker">
                            {/* <div>{timeFrame.label}</div> */}
                        </div>
                    </div>
                ))}
            </div>
        ))}
        {
            flags.map(flag => (
                <div className="timeline-flag" style={{left: numberOfDays(startDate, flag.startDate) }}>
                    
                    <div className="triangle-bottomleft"><div className="timeline-flag-label">
                        {flag.label}
                    </div></div>
                </div>
            ))
        }
    </div>)

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
    let days = (endDate.getTime() - startDate.getTime()) / (1000*60*60*24);
    return days;
}  
    
class TimeFrameModel {

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
    
    get numberOfDays(): number {
        let days = (endDate.getTime()-startDate.getTime())/(1000*60*60*24);
        console.log(endDate.getTime(), startDate.getTime(), days);
        return days;
    }  
} 


const flags: FlagModel[] = getFlags();

function getFlags(): FlagModel[] {
    let flags: FlagModel[] = [];
    let prevDate: Date = new Date(2019, 2, 15);
    for (let i = 0; i < 30; i++) {
        var flag = new FlagModel();
        flag.label = 'flag ' + i;
        flag.startDate = prevDate; //  new Date(Math.ceil(2019 + (i*0.25)), Math.ceil(1 + i*0.25)%12, 15);
        prevDate = addDays(prevDate, Math.floor(Math.random() * 11));
        flag.endDate = prevDate;
        prevDate = addDays(prevDate, Math.floor(Math.random() * 365) + 90);
        flag.itemType = RoadMapItemType.flag;
        flags.push(flag);
    }
    return flags;
}
