
"use client";

import { ReleaseModel, FeatureModel, LineItemModel, LineItemType } from '../app/models/release';
import { Send, Award, Stars, Bug, Flag } from 'react-bootstrap-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { numberOfDays } from './timeline';
import { useEffect, useRef } from 'react';
import { FlagModel } from './models/FlagModel';
import { DateModel, RoadMapItem, RoadMapItemType } from './models/RoadMapItem';

  
export default function Roadmap(props: {
    releases: ReleaseModel[],
    flags: FlagModel[],
    dates: DateModel,
    pixelsPerDay: number,
    focusport: IntersectionObserver,
    markerport: IntersectionObserver,
}) {
    let roadMapItems : RoadMapItem[] = [];
    props.releases.forEach(r => roadMapItems.push(r));
    props.flags.forEach(f => roadMapItems.push(f));
    
    roadMapItems.sort((a, b) => {
        if (a.startDate < b.startDate) return -1;
        else if (a.startDate > b.startDate) return 1;
        else {
            if (a.itemType == RoadMapItemType.flag) return -1;
            else if (b.itemType == RoadMapItemType.flag) return 1;
            else return 0
        };
    
    });
    
    let indexOfNextRelease = -1;
    if (roadMapItems && roadMapItems.length > 0){
        roadMapItems.forEach((r, i) => {
            if (indexOfNextRelease == -1 && r.startDate > (new Date())){
                indexOfNextRelease = i;
            }
        });
    }

    return (
        <>
            {roadMapItems.map((r, i) => 
                <RoadmapItem key={i} isNextRelease={i == indexOfNextRelease} markerport={props.markerport} dates={props.dates} pixelsPerDay={props.pixelsPerDay} roadmapItem={r} focusport={props.focusport} />
            )}
        </>)
}


export function RoadmapItem(props: {
    dates: DateModel,
    pixelsPerDay: number,
    roadmapItem: RoadMapItem,
    focusport: IntersectionObserver,
    markerport: IntersectionObserver,
    isNextRelease: boolean
}) {    
    if (props.roadmapItem.itemType == RoadMapItemType.release){
        return (
            <>
                <Release isNextRelease={props.isNextRelease}  dates={props.dates}  pixelsPerDay={props.pixelsPerDay} release={props.roadmapItem as ReleaseModel} focusport={props.focusport} />
            </>)
    } else {
        return (
            <>
                <ReleaseFlag  markerport={props.markerport}   dates={props.dates} pixelsPerDay={props.pixelsPerDay} flag={props.roadmapItem as FlagModel} />
            </>)
    }
}

export function ReleaseFlag(props: {
    dates: DateModel,
    pixelsPerDay: number,
    flag: FlagModel,
    markerport: IntersectionObserver
}) {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (ref.current) {
            props.markerport.observe(ref.current);
        }
        
        return () => {
            if (ref.current) {
                props.markerport.unobserve(ref.current);
            }
        }
    })

    return (
        <div  
            ref={ref} className={`transition-400ms fit-content-width p-2 my-2 mr-2 timeline-flag-label  ${props.flag.cssClass}`} 
            style={{marginLeft: props.pixelsPerDay * ( (numberOfDays(new Date(props.dates.startDate), new Date(props.flag.startDate)))) }}>
            <div className="d-flex flex-column pl-4 pr-4">
                <div className="h4">{props.flag.label}</div>
                <div className="release-date">
                    <i>
                        {/* {props.flag.endDateLabel} */}
                        { (!props.flag.startDateLabel || props.flag.startDateLabel == "") ? `${months[new Date(props.flag.startDate).getMonth()]} ${new Date(props.flag.startDate).getDay()+1} ${new Date(props.flag.startDate).getFullYear()}` : props.flag.startDateLabel}
                    </i>    
                </div>
                <div id="triangle-right" className={`${props.flag.cssClass}-tip`}></div>
            </div>
        </div>
    )
}

export function Release(props: {
    dates: DateModel,
    pixelsPerDay: number,
    release: ReleaseModel,
    focusport: IntersectionObserver,
    isNextRelease: boolean
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
        <div  
            ref={ref} className="release-card-bg release-card fit-content-width p-2 my-2 mr-2 transition-400ms" 
            style={{marginLeft: props.pixelsPerDay * ((numberOfDays(props.dates.startDate, props.release.endDate))) }}>
            <div className="d-flex">
                <div className="pr-2 h4"><Send /></div>
                <div className="h4">{props.release.releaseName}</div>
            </div>
            <div className="release-date">
                <div className="release-date-indicator"></div>
                <i className='pl-1'>
                    { (!props.release.endDateLabel || props.release.endDateLabel == "") ? `${months[new Date(props.release.endDate).getMonth()]} ${new Date(props.release.endDate).getDay()+1} ${new Date(props.release.endDate).getFullYear()}` : props.release.endDateLabel}
                </i>    
            </div>
            <Feature features={props.release.features}/>
        </div>
    )
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

export function Feature(props: {
    features: FeatureModel[]
}) {
    return (<div>
        {props.features.map((feature, i) => 
            (<div key={i} className="pl-2 {feature.cssClass}" >
                <div className="d-flex">
                    <div className="h5 pr-2"><Award /></div>
                    <OverlayTrigger
                        placement={'right'}
                        delay={{ show: 400, hide: 400 }}
                        overlay={
                            <Tooltip>
                                {feature.featureDescription}
                            </Tooltip>
                        }>

                        <div className="h6"><a href={feature.url} className="feature-name">{feature.featureName}</a></div>
                    </OverlayTrigger>
                </div>
                <div className='ml-2'>
                    <LineItem lineItems={feature.lineItems}/>
                </div>
            </div>)
        )}
        </div>)
}

export function LineItem(props: {
    lineItems: LineItemModel[]
}) {
   
    return (<div>
        {props.lineItems.map((lineItem, i) => 
            (<div key={i} className=" pl-2 d-flex">
                <div className="line-item-name">
                    <LineItemTypeIcon type={lineItem.type} />
                </div>
                <OverlayTrigger
                    placement={'right'}
                    delay={{ show: 400, hide: 400 }}
                    overlay={
                        <Tooltip>
                            {lineItem.lineItemDescription}
                        </Tooltip>
                    }>

                    <a href={lineItem.url} className="line-item-name pl-1">{lineItem.lineItemName}</a>
                </OverlayTrigger>
                
            </div>)
        )}
        </div>)
}

export function LineItemTypeIcon(props: {
    type: LineItemType
}) {
    if (props.type == LineItemType.bug) {
        return <Bug />;
    }
    else {
        return <Stars />
    }
}

// function getReleases1(): ReleaseModel[] {
//     var releaseModels: ReleaseModel[] = [];
//     let prevDate: Date = new Date(2019, 3, 15);
//     for (let i = 0; i < 20; i++) {
//         let release = new ReleaseModel();
//         release.releaseName = "Release " + (i + 1);
//         release.releaseDescription = "Release " + (i + 1) + " description";
//         release.startDate = prevDate; //  new Date(Math.ceil(2019 + (i*0.25)), Math.ceil(1 + i*0.25)%12, 15);
//         prevDate = addDays(prevDate, Math.floor(Math.random() * 11));
//         release.endDate = prevDate;
//         prevDate = addDays(prevDate, Math.floor(Math.random() * 365) + 90);
//         release.itemType = RoadMapItemType.release;
//         release.features = [];
//         let numberOffeatures = Math.ceil(Math.random() * 5);
//         for (let j = 0; j < numberOffeatures; j++) {
//             var feature = new FeatureModel();
//             feature.featureName = "Release " + (i + 1) + " Feature " + (j + 1);
//             feature.featureDescription = "Release " + (i + 1) + " Feature " + (j + 1) + " description";
//             feature.lineItems = [];
//             let numberOfLineItems = Math.ceil(Math.random() * 3);
//             for (let k = 0; k < numberOfLineItems; k++) {
//                 let lineItem = new LineItemModel();
//                 lineItem.lineItemName = "Release " + (i + 1) + " Feature " + (j + 1)  + " LineItem " + (k + 1);
//                 lineItem.lineItemDescription = lineItem.lineItemName + " description";
//                 lineItem.type = Math.random() > 0.8 ? LineItemType.bug : LineItemType.enhancement;
//                 feature.lineItems.push(lineItem);
//             }
//             release.features.push(feature);
//         }
//         releaseModels.push(release);
//     }

//     releaseModels.sort((a, b) => {
//         if (a.startDate < b.startDate) return -1;
//         else if (a.startDate > b.startDate) return 1;
//         else return 0;
//     });
//     return releaseModels;
// }

export function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

// export const releases: ReleaseModel[] = getReleases();
