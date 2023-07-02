
const timelines = [
    { 
        timeline: "2020",
        subTimelines: ["Q1","Q2","Q3","Q4"]
    },
    { 
        timeline: "2021",
        subTimelines: ["Q1","Q2","Q3","Q4"]
    },
    { 
        timeline: "2022",
        subTimelines: ["Q1","Q2","Q3","Q4"]
    },
    { 
        timeline: "2023",
        subTimelines: ["Q1","Q2","Q3","Q4"]
    }
];

export default function TimeLine() {

    return (<div className="d-flex flex-row flex-nowrap justify-content-start">
        
        {timelines.map((timeline) => (
            <div className="d-flex flex-column justify-content-start w-50">
                <div className="card ">
                    {timeline.timeline}
                </div>
                <div className="d-flex flex-row flex-nowrap justify-content-start">
                    {timeline.subTimelines.map((subTimeline) => (
                        <div className="card w-50">
                            {subTimeline}
                        </div>
                    ))}
                </div>
            </div>
        ))}

    </div>)
}