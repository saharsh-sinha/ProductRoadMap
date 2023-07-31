

export const startDate: Date = new Date("2019-06-16");
const endDate: Date = new Date("2024-01-16");
const yearBreakdown: boolean = true;
const quarterBreakdown: boolean = true;
const monthBreakdown: boolean = true;
const weekBreakdown: boolean = true;
const dayWidthPx = 1;

export default function TimeLine() {
    let timeLines: TimeFrameModel[][]  = [];
    timeLines.push(getTimeFramesYear(startDate, endDate));

    return (<div className="d-flex flex-column flex-nowrap justify-content-start">
        {timeLines.map((timeLine) => (
            <div className="d-flex flex-row flex-nowrap justify-content-start">
                {timeLine.map((timeFrame) => (
                    <div  className="card" style={{width: dayWidthPx * numberOfDaysLocal(timeFrame)}}>
                        {timeFrame.label}
                        {/* {timeFrame.label + '|' + timeFrame.startDate.toDateString() + '|' + timeFrame.endDate.toDateString()} */}
                    </div>
                ))}
            </div>
        ))}
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
    let days = (endDate.getTime()-startDate.getTime())/(1000*60*60*24);
    console.log(endDate.getTime(), startDate.getTime(), days);
    return days;
}  

    // return (<div className="d-flex flex-row flex-nowrap justify-content-start">
        
    //     {Object.entries(timelines).map((timeline, subTimeLines) => (
    //         <div className="d-flex flex-column justify-content-start">
    //             <div className="card " style={{width: 4 * width}}>
    //                 {timeline}
    //             </div>
    //             <div className="d-flex flex-row flex-nowrap justify-content-start" >
    //                 {Object.entries(subTimeLines).map((subTimeline) => (
    //                     <div className="card" style={{width: width}}>
    //                         {subTimeline[0]}
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     ))}


class TimeFrameModel {

    /**
     *
     */
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