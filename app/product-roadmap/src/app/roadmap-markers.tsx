import { useEffect, useRef } from "react";
import { FlagModel } from "./models/FlagModel";
import { DateModel } from "./models/RoadMapItem";
import { TimeFrameModel, numberOfDays, timeLines } from "./timeline";


export default function RoadmapMarkers(props: {
    flags: FlagModel[],
    dates: DateModel,
    pixelsPerDay: number,
    focusport: IntersectionObserver
}) {
    return (<div className="d-flex flex-column flex-nowrap justify-content-start absolutely-positioned roadmap-markers">
        {timeLines.map((timeLine, i) => (
            timeLine.map((timeFrame, j) => (
                <div key={i*100 + j} className="transition-400ms" 
                    style={{width: props.pixelsPerDay * numberOfDaysLocal(timeFrame), position: 'absolute', left: props.pixelsPerDay * numberOfDays(props.dates.startDate, timeFrame.startDate) }}>
                    <div className="timeline-marker">
                    </div>
                </div>
            ))
        ))}
        {
            props.flags.map((flag, i) => (

                <FlagMarker key={i} flag={flag} focusport={props.focusport} dates={props.dates} pixelsPerDay={props.pixelsPerDay}/> 
                // <div key={i} ref={ref} className="timeline-flag transition-400ms" style={{left: props.pixelsPerDay * numberOfDays(props.dates.startDate, flag.startDate) }}>
                 
                // </div>
            ))
        }
    </div>)
    
    function numberOfDaysLocal(timeFrameModel: TimeFrameModel): number {
        return numberOfDays(timeFrameModel.startDate, timeFrameModel.endDate);
    }  
}

export function FlagMarker(props: {
    flag: FlagModel,
    dates: DateModel,
    pixelsPerDay: number,
    focusport: IntersectionObserver

}) {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ref.current) {
            props.focusport.observe(ref.current);
        }
        
        return () => {
            if (ref.current) {
                props.focusport.unobserve(ref.current);
            }
        }
    })

    return (
    <div ref={ref} className={`timeline-flag transition-400ms ${props.flag.cssClass}-tip`} style={{left: props.pixelsPerDay * numberOfDays(props.dates.startDate, props.flag.startDate) }} />
    )
} 