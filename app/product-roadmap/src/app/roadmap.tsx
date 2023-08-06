
"use client";

import { ReleaseModel, FeatureModel, LineItemModel } from '../app/models/release';
import { Send, Award, Justify, Link45deg, Flag } from 'react-bootstrap-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startDate, numberOfDays } from './timeline';
import { useEffect, useRef } from 'react';
import { FlagModel } from './models/FlagModel';
import { RoadMapItem, RoadMapItemType } from './models/RoadMapItem';

  
export default function Roadmap(props: {
    focusport: IntersectionObserver
}) {
    let roadMapItems : RoadMapItem[] = [];
    releases.forEach(r => roadMapItems.push(r));
    flags.forEach(f => roadMapItems.push(f));
    
    roadMapItems.sort((a, b) => {
        if (a.startDate < b.startDate) return -1;
        else if (a.startDate > b.startDate) return 1;
        else {
            if (a.itemType == RoadMapItemType.flag) return -1;
            else if (b.itemType == RoadMapItemType.flag) return 1;
            else return 0
        };
    
    });
    //console.log(roadMapItems);
    return (
        <>
            {roadMapItems.map(r => 
                <RoadmapItem roadmapItem={r} focusport={props.focusport} />
            )}
        </>)
}


export function RoadmapItem(props: {
    roadmapItem: RoadMapItem,
    focusport: IntersectionObserver
}) {
    // console.log(props.roadmapItem);
    
    if (props.roadmapItem.itemType == RoadMapItemType.release){
        return (
            <>
                <Release release={props.roadmapItem as ReleaseModel} focusport={props.focusport} />
            </>)
    } else {
        return (
            <>
                <ReleaseFlag flag={props.roadmapItem as FlagModel} />
            </>)
    }
}

export function ReleaseFlag(props: {
    flag: FlagModel
}) {
    console.log(props.flag);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div  
                ref={ref} className="fit-content-width p-2 my-2 mr-2 flag" 
                style={{marginLeft: (numberOfDays(startDate, props.flag.startDate)) }}>
                <div className="d-flex pl-4 pr-4">
                    <div className="pr-2 h6"><Flag /></div>
                    <div className="h6">{props.flag.label}</div>
                </div>
                <div className="release-date">
                    <i>
                        {months[props.flag.startDate.getMonth()]} {props.flag.startDate.getDay()+1}, {props.flag.startDate.getFullYear()}
                    </i>    
                </div>
            </div>
        </div>
    )
}

export function Release(props: {
    release: ReleaseModel,
    focusport: IntersectionObserver,
}) {
    console.log(props.release);
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
        <div  >
            <div  
                ref={ref} className="card fit-content-width p-2 my-2 mr-2" 
                style={{marginLeft: (numberOfDays(startDate, props.release.startDate)) }}>
                <div className="d-flex">
                    <div className="pr-2 h4"><Send /></div>
                    <div className="h4">{props.release.releaseName}</div>
                </div>
                <div className="release-date">
                    <i>
                        {months[props.release.startDate.getMonth()]} {props.release.startDate.getDay()+1}, {props.release.startDate.getFullYear()}
                    </i>    
                </div>
                <Feature features={props.release.features}/>
            </div>
        </div>
    )
}

const months  = {
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
        {props.features.map((feature) => 
            (<div className="pl-2">
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

                        <div className="h6"><a href={feature.url} className=" pl-2">{feature.featureName}</a></div>
                    </OverlayTrigger>
                    {/* <a href={feature.url} className=" pl-2"><Link45deg /></a> */}
                </div>
                {/* <LineItem lineItems={feature.lineItems}/> */}
            </div>)
        )}
        </div>)
}

export function LineItem(props: {
    lineItems: LineItemModel[]
}) {
   
    return (<div>
        {props.lineItems.map((lineItem) => 
            (<div className=" pl-2">
                {lineItem.lineItemName}
            </div>)
        )}
        </div>)
}



function getReleases(): ReleaseModel[] {
    var releaseModels: ReleaseModel[] = [];
    let prevDate: Date = new Date(2019, 3, 15);
    for (let i = 0; i < 20; i++) {
        let release = new ReleaseModel();
        release.releaseName = "Release " + (i + 1);
        release.releaseDescription = "Release " + (i + 1) + " description";
        release.startDate = prevDate; //  new Date(Math.ceil(2019 + (i*0.25)), Math.ceil(1 + i*0.25)%12, 15);
        prevDate = addDays(prevDate, Math.floor(Math.random() * 11));
        release.endDate = prevDate;
        prevDate = addDays(prevDate, Math.floor(Math.random() * 365) + 90);
        release.itemType = RoadMapItemType.release;
        release.features = [];
        for (let j = 0; j < 4; j++) {
            var feature = new FeatureModel();
            feature.featureName = "Release " + (i + 1) + " Feature " + (j + 1);
            feature.featureDescription = "Release " + (i + 1) + " Feature " + (j + 1) + " description";
            feature.lineItems = [new LineItemModel()];
            for (let k = 0; k < 20; k++) {
                
            }
            release.features.push(feature);
        }
        releaseModels.push(release);
    }


    return releaseModels;
}
function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

const releases: ReleaseModel[] = getReleases();

const flags: FlagModel[] = getFlags();

function getFlags(): FlagModel[] {
    let flags: FlagModel[] = [];
    for (let i = 0; i < 30; i++) {
        var flag = new FlagModel();
        flag.label = 'flag ' + i;
        flag.startDate = new Date(Math.ceil(2019 + (i*0.25)), Math.ceil(1 + i*0.25)%12, 15);
        flag.endDate = new Date(Math.ceil((2019 + (i*0.25))), Math.ceil(1 + i*0.25)%12, 15);
        flag.itemType = RoadMapItemType.flag;
        flags.push(flag);
    }
    return flags;
}
