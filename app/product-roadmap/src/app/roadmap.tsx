
"use client";

import { ReleaseModel, FeatureModel, LineItemModel, LineItemType } from '../app/models/release';
import { Send, Award, Stars, Bug } from 'react-bootstrap-icons';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { numberOfDays } from './timeline';
import { useEffect, useRef, useState } from 'react';
import { FlagModel } from './models/FlagModel';
import { DateModel, RoadMapItem, RoadMapItemType } from './models/RoadMapItem';
const releasePaddingPx: number = 50;
export default function Roadmap(props: {
    releases: ReleaseModel[],
    flags: FlagModel[],
    roadMapItems: RoadMapItem[],
    dates: DateModel,
    pixelsPerDay: number,
    focusport: IntersectionObserver,
    markerport: IntersectionObserver,
    bubbleTodaysBoundingRect: any,
    flagsAreVisible: boolean, 
    releasesAreVisible: boolean, 
    featuresAreVisible: boolean, 
    lineItemsAreVisible: boolean, 
    dateMarkersAreVisible: boolean ,
    leftOffset: number
}) {
    let indexOfNextRelease = -1;
    if (props.roadMapItems && props.roadMapItems.length > 0){
        props.roadMapItems.forEach((r, i) => {
            if (indexOfNextRelease == -1 && r.itemType == RoadMapItemType.release && new Date(r.startDate).getTime() > (new Date().getTime())){
                indexOfNextRelease = i;
            }
        });
    }
    return (
        <>
            {props.roadMapItems.map((r, i) => 
                <RoadmapItem 
                    bubbleTodaysBoundingRect={props.bubbleTodaysBoundingRect} 
                    key={i} 
                    isNextRelease={i == indexOfNextRelease} 
                    markerport={props.markerport} 
                    dates={props.dates} 
                    pixelsPerDay={props.pixelsPerDay} 
                    roadmapItem={r} 
                    focusport={props.focusport} 
                    flagsAreVisible={props.flagsAreVisible} 
                    releasesAreVisible={props.releasesAreVisible} 
                    featuresAreVisible={props.featuresAreVisible} 
                    lineItemsAreVisible={props.lineItemsAreVisible} 
                    dateMarkersAreVisible={props.dateMarkersAreVisible} 
                    leftOffset={props.leftOffset}
                    ordinal={i}
              />
            )}
        </>)
}


export function RoadmapItem(props: {
    dates: DateModel,
    pixelsPerDay: number,
    roadmapItem: RoadMapItem,
    focusport: IntersectionObserver,
    markerport: IntersectionObserver,
    isNextRelease: boolean,
    bubbleTodaysBoundingRect: any,
    flagsAreVisible: boolean, 
    releasesAreVisible: boolean, 
    featuresAreVisible: boolean, 
    lineItemsAreVisible: boolean, 
    dateMarkersAreVisible: boolean  ,
    leftOffset: number,
    ordinal: number
}) {    
    if (props.roadmapItem.itemType == RoadMapItemType.release){
        return (
            <>
                {(props.releasesAreVisible || props.featuresAreVisible || props.lineItemsAreVisible || props.dateMarkersAreVisible) && 
                <Release 
                    bubbleTodaysBoundingRect={props.bubbleTodaysBoundingRect} 
                    isNextRelease={props.isNextRelease}  
                    dates={props.dates}  
                    pixelsPerDay={props.pixelsPerDay} 
                    release={props.roadmapItem as ReleaseModel} 
                    focusport={props.focusport}
                    releasesAreVisible={props.releasesAreVisible} 
                    featuresAreVisible={props.featuresAreVisible} 
                    lineItemsAreVisible={props.lineItemsAreVisible} 
                    dateMarkersAreVisible={props.dateMarkersAreVisible} 
                    leftOffset={props.leftOffset}
                    ordinal={props.ordinal}
                />}
            </>)
    } else if (props.flagsAreVisible) {
        return (
            <ReleaseFlag 
                dateMarkersAreVisible={props.dateMarkersAreVisible} 
                markerport={props.markerport}   
                dates={props.dates} 
                pixelsPerDay={props.pixelsPerDay} 
                flag={props.roadmapItem as FlagModel} 
                leftOffset={props.leftOffset} 
                ordinal={props.ordinal}
            />)
    }
}

export function ReleaseFlag(props: {
    dates: DateModel,
    pixelsPerDay: number,
    flag: FlagModel,
    markerport: IntersectionObserver, 
    dateMarkersAreVisible: boolean,
    leftOffset: number,
    ordinal: number
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [flagDivWidth, setFlagDivWidth] = useState(0);
    
    useEffect(() => {
        if (ref.current) {
            props.markerport.observe(ref.current);
            setFlagDivWidth(ref.current.getBoundingClientRect().width);
        }
        
        return () => {
            if (ref.current) {
                props.markerport.unobserve(ref.current);
            }
        }
    })

    const daysSinceStart = numberOfDays(new Date(props.dates.startDate), new Date(props.flag.startDate));
    const width: number = Math.max(1, props.pixelsPerDay * numberOfDays(new Date(props.flag.startDate), new Date(props.flag.endDate)));
    // console.log('flag', props.flag.label, daysSinceStart);
    return (
        <div  
            ref={ref} 
            className={`transition-400ms fit-content-width pl-2 pr-2 my-2 mr-2 timeline-flag-label ${props.flag.cssClass}`} 
            style={{
                // transitionDelay: (props.ordinal * 20) + "ms",
                marginLeft: 0, 
                paddingTop: "0px!important", 
                paddingBottom: "0px!important",
                left: getLeftOffset(flagDivWidth, props, daysSinceStart) + width
            }}>
            <div className="text-skin-base d-flex flex-column pl-4 pr-4">
                <div className="h4">{props.flag.label}</div>
                {props.dateMarkersAreVisible && <div className="release-date">
                    <i>
                        { (!props.flag.startDateLabel || props.flag.startDateLabel == "") ? `${months[new Date(props.flag.startDate).getMonth()]} ${new Date(props.flag.startDate).getDate()} ${new Date(props.flag.startDate).getFullYear()}` : props.flag.startDateLabel}
                    </i>    
                </div>}
                {/* <div id="triangle-right" className={`${props.flag.cssClass}-tip`}></div> */}
            </div>
        </div>
    )
}

export function Release(props: {
    dates: DateModel,
    pixelsPerDay: number,
    release: ReleaseModel,
    focusport: IntersectionObserver,
    isNextRelease: boolean,
    bubbleTodaysBoundingRect: any, 
    releasesAreVisible: boolean, 
    featuresAreVisible: boolean, 
    lineItemsAreVisible: boolean, 
    dateMarkersAreVisible: boolean ,
    leftOffset: number,
    ordinal: number
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [releaseDivWidth, setReleaseDivWidth] = useState(0);
    useEffect(() => {
        if (ref.current) {
            props.focusport.observe(ref.current);
            if (props.isNextRelease) {
                props.bubbleTodaysBoundingRect(ref.current.getBoundingClientRect());
            }
            setReleaseDivWidth(ref.current.getBoundingClientRect().width);
        }
        
        return () => {
            if (ref.current) {
                props.focusport.unobserve(ref.current);
            }
        }
    })
    let daysSinceStart = numberOfDays(props.dates.startDate, props.release.endDate);
    
    // console.log('release', props.release.releaseName, daysSinceStart);
    return (
        <div ref={ref} 
            className='transition-400ms'
            style={{
                transitionDelay: (props.ordinal * 0) + "ms",
                paddingLeft: releasePaddingPx, 
                paddingRight: releasePaddingPx,
                width: "fit-content",
                position: "relative",
                left: getLeftOffset(releaseDivWidth, props, daysSinceStart) - releasePaddingPx
            }}
            data-days={daysSinceStart}
        >
            <div  
                className="bg-skin-fill text-skin-base release-card fit-content-width p-2 my-2 mr-2 transition-400ms" >
                {props.releasesAreVisible &&
                <div className="d-flex">
                    <div className="pr-2 h4"><Send /></div>
                    <div className="h4">{props.release.releaseName}</div>
                </div>}
                {!props.releasesAreVisible &&
                <div style={{height:"10px"}} />}
                {props.dateMarkersAreVisible && <div className="release-date">
                    <div className="release-date-indicator bg-skin-fill text-skin-base">
                        <i className='pl-1 pr-1'>
                            { (!props.release.endDateLabel || props.release.endDateLabel == "") ? `${months[new Date(props.release.endDate).getMonth()]} ${new Date(props.release.endDate).getDay()+1} ${new Date(props.release.endDate).getFullYear()}` : props.release.endDateLabel}
                        </i>    
                    </div>
                </div>}
                <Feature featuresAreVisible={props.featuresAreVisible} lineItemsAreVisible={props.lineItemsAreVisible}  features={props.release.features}/>
            </div>
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

export function getLeftOffset(
    divWidth: number, 
    props: { pixelsPerDay: number; leftOffset: number; }, 
    daysSinceStart: number) {
    return Math.min(
        document.body.clientWidth, 
        Math.max(
            (-1 * divWidth), 
            (-1 * props.leftOffset) + (props.pixelsPerDay * ((daysSinceStart)))));
}

export function Feature(props: {
    features: FeatureModel[], 
    featuresAreVisible: boolean, 
    lineItemsAreVisible: boolean 
}) {
    return (<div>
        {props.features.map((feature, i) => 
            (<div key={i} className={`pl-2 text-skin-base`} >
                {(props.featuresAreVisible &&
                <div className="d-flex">
                    <div className="h5 pr-2"><Award /></div>
                    <DangerousPopover url={feature.url} dispalyText={feature.featureName} popoverContent={feature.featureDescription} displayTextClass='h6'/>
                </div>
                )} 
                <div className='ml-2'>
                    <LineItem lineItemsAreVisible={props.lineItemsAreVisible} lineItems={feature.lineItems}/>
                </div>
            </div>)
        )}
        </div>)
}

export function DangerousPopover(props: {
    url: string,
    popoverContent: string,
    dispalyText: string,
    displayTextClass: string,
}) {

    return (<OverlayTrigger
        placement={'right'}
        delay={{ show: 400, hide: 400 }}
        overlay={
            <Popover id={`popover-positioned-${'right'}`}  className='bg-skin-fill text-skin-base' style={{ width:"1500px" }}>
            <Popover.Header as="h3"  className='bg-skin-fill text-skin-base'>Description</Popover.Header>
            <Popover.Body>
                <div className='bg-skin-fill text-skin-base' dangerouslySetInnerHTML={{__html: props.popoverContent}} />
            </Popover.Body>
            </Popover>
        }>
        <div className={props.displayTextClass}><a href={props.url} className="feature-name text-skin-base">{props.dispalyText}</a></div>
    </OverlayTrigger>)
}

export function LineItem(props: {
    lineItems: LineItemModel[], 
    lineItemsAreVisible: boolean 
}) {
   
    return (<div>
        {props.lineItemsAreVisible && props.lineItems.map((lineItem, i) => 
            (<div key={i} className=" pl-2 d-flex">
                <div className="line-item-name text-skin-base">
                    <LineItemTypeIcon type={lineItem.type} />
                </div>
                <DangerousPopover url={lineItem.url} dispalyText={lineItem.lineItemName} popoverContent={lineItem.lineItemDescription} displayTextClass='line-item-name pl-1'/>
            </div>)
        )}
        </div>)
}

export function LineItemTypeIcon(props: {
    type: LineItemType
}) {
    if (props.type == LineItemType.bug) {
        return <Bug className='text-skin-base'/>;
    }
    else {
        return <Stars className='text-skin-base'/>
    }
}

export function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

// export const releases: ReleaseModel[] = getReleases();
