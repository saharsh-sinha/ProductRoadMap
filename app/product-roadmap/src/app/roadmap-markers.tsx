import { FlagModel } from "./models/FlagModel";
import { DateModel, RoadMapItemType } from "./models/RoadMapItem";
import { addDays } from "./roadmap";
import { TimeFrameModel, numberOfDays, timeLines } from "./timeline";


export default function RoadmapMarkers(props: {
    flags: FlagModel[],
    dates: DateModel,
    pixelsPerDay: number
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
                <div key={i} className="timeline-flag transition-400ms" style={{left: props.pixelsPerDay * numberOfDays(props.dates.startDate, flag.startDate) }}>
                 
                </div>
            ))
        }
    </div>)
    
    function numberOfDaysLocal(timeFrameModel: TimeFrameModel): number {
        return numberOfDays(timeFrameModel.startDate, timeFrameModel.endDate);
    }  
}