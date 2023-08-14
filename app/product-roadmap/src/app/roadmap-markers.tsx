import { useEffect, useRef, useState } from "react";
import { FlagModel } from "./models/FlagModel";
import { DateModel } from "./models/RoadMapItem";
import { TimeFrameModel, numberOfDays } from "./timeline";
import { getLeftOffset } from "./roadmap";


export default function RoadmapMarkers(props: {
    flags: FlagModel[],
    dates: DateModel,
    pixelsPerDay: number,
    focusport: IntersectionObserver,
    leftOffset: number,
    timeLines: TimeFrameModel[]
}) {
    return (<div className="d-flex flex-column flex-nowrap justify-content-start roadmap-markers vw100-width">
        {
        // props.timeLines.map((timeFrame, i) => (
        //     // timeLine.map((timeFrame, j) => (
        //         <div key={i*100 + i} className="transition-400ms" 
        //             style={{
        //                 width: props.pixelsPerDay * numberOfDaysLocal(timeFrame), 
        //                 position: 'absolute', 
        //                 left: props.pixelsPerDay * numberOfDays(props.dates.startDate, timeFrame.startDate) }}>
        //             <div className="timeline-marker" />
        //         </div>
        //     // ))
        // ))
        }
        {
            props.flags.map((flag, i) => (
                <FlagMarker 
                    key={i} 
                    flag={flag} 
                    focusport={props.focusport} 
                    dates={props.dates} 
                    pixelsPerDay={props.pixelsPerDay} 
                    leftOffset={props.leftOffset}/> 
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
    focusport: IntersectionObserver,
    leftOffset: number
}) {

    const ref = useRef<HTMLDivElement>(null);
    const [flagDivWidth, setFlagDivWidth] = useState(0);
    
    useEffect(() => {
        if (ref.current) {
            props.focusport.observe(ref.current);
            setFlagDivWidth(ref.current.getBoundingClientRect().width);
        }
        
        return () => {
            if (ref.current) {
                props.focusport.unobserve(ref.current);
            }
        }
    })
    const width: number = Math.max(1, props.pixelsPerDay * numberOfDays(new Date(props.flag.startDate), new Date(props.flag.endDate)));
    const daysSinceStart = numberOfDays(new Date(props.dates.startDate), new Date(props.flag.startDate));
    return (
        <div 
            ref={ref} 
            className={`timeline-flag-pole transition-400ms ${props.flag.cssClass}`} 
            style={{
                width: width,
                left: getLeftOffset(flagDivWidth, props, daysSinceStart)
                // left: props.pixelsPerDay * numberOfDays(props.dates.startDate, props.flag.startDate) 
            }} />
    )
} 