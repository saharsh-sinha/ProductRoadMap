import { useEffect, useRef, useState } from "react";
import { DateModel } from "./models/RoadMapItem";
import { getLeftOffset } from "./roadmap";

// export const timeLines: TimeFrameModel[][]  = [];
export default function TimeLine(props: {
    dates: DateModel,
    pixelsPerDay: number,
    splitInto: string[], 
    leftOffset: number,
    timeLines: TimeFrameModel[]
}) {
    console.log(props.timeLines);
    const ref = useRef<HTMLDivElement>(null);
    const [divWidth, setDivWidth] = useState(0);
    useEffect(() => {
        if (ref.current) {
            setDivWidth(ref.current.getBoundingClientRect().width);
        }
    })
    return (
        <div className="d-flex flex-column flex-nowrap justify-content-start ">
            {props.timeLines.map((timeFrame, i) => (
                <div key={i} className="d-flex flex-row flex-nowrap justify-content-start">
                    <div 
                        ref={ref} 
                        key={i*100+i} 
                        className="h4 timeline-card transition-400ms bg-skin-fill " 
                        style={{
                            width: props.pixelsPerDay * numberOfDaysLocal(timeFrame), 
                            position: 'absolute', 
                            transitionDelay: (i*50) + "ms",
                            left: getLeftOffset(divWidth, props, (props.pixelsPerDay * numberOfDays(props.dates.startDate, timeFrame.startDate)))
                        }}>
                        <span className="text-skin-base ">{timeFrame.label}</span>
                        <div className="flex" >
                        {   
                            props.splitInto.map((split, idx) => (
                                <div key={idx} className="sub-timeline">
                                    <div className="sub-timeline-marker" style={{borderLeft: idx > 0 ? "2px solid #222": "0px"}}></div>
                                    <div className="sub-timeline-label text-skin-base">{split}</div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    {/* ))} */}
                </div>
            ))}
        </div>
    )

    function numberOfDaysLocal(timeFrameModel: TimeFrameModel): number {
        return numberOfDays(timeFrameModel.startDate, timeFrameModel.endDate);
    }  
}

export function numberOfDays(startDate: Date, endDate: Date, logMessage: string | null = null): number {
    let days = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000*60*60*24);
    if (logMessage) {
        console.log(logMessage, days, startDate, endDate);
    }
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
