
"use client";

import Roadmap from './roadmap'
import TimeLine, { TimeFrameModel } from './timeline'
import TitleBar from './titlebar'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import RoadmapMarkers from './roadmap-markers';
import { DateModel, RoadMapItem, RoadMapItemType } from './models/RoadMapItem';
import { ReleaseModel } from './models/release';
import { FlagModel } from './models/FlagModel';
import releasesJson from './releases.json'
import flagsJson from './flags.json'
import roadmapDefaultsJson from './roadmap-defaults.json'
import bg from './../../public/back-texture.png';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons'

export default function Home() {
  const releases: ReleaseModel[] = releasesJson as unknown as ReleaseModel[];
  const flags = flagsJson ;
  const [todayWasFlagged, setTodayWasFlagged] = useState(false);
  const [todayWasBroughtIntoView, setTodayWasBroughtIntoView] = useState(false);
  if (!todayWasFlagged) {
    flags.push({
      "label": "Today",
      "date": new Date().toISOString(),
      "color": "",
      "startDate": new Date().toISOString(),
      "startDateLabel": new Date().toDateString(),
      "endDate": new Date().toISOString(),
      "endDateLabel": new Date().toDateString(),
      "itemType": 2,
      "cssClass": "todays-flag",
      "today": true,
      "subLabel": ""
    });
    setTodayWasFlagged(true);
  }

  const leftMargin = document.body.offsetWidth * 0.15; 
  const [margin, setMargin] = useState(leftMargin);
  const [zoomLevel, setZoomLevel] = useState(roadmapDefaultsJson.defaultZoomLevel);
  const [pixelsPerDay, setPixelsPerDay] = useState(zoomLevelToPixelsPerDay[zoomLevel]);
  const [flagsAreVisible, setFlagsVisibility] = useState(roadmapDefaultsJson.flagsAreVisible);
  const [releasesAreVisible, setReleaseVisibility] = useState(roadmapDefaultsJson.releasesAreVisible);
  const [featuresAreVisible, setFeatureVisibility] = useState(roadmapDefaultsJson.featuresAreVisible);
  const [lineItemsAreVisible, setLineItemVisibility] = useState(roadmapDefaultsJson.lineItemsAreVisible);
  const [dateMarkersAreVisible, setDateMarkerVisibility] = useState(roadmapDefaultsJson.dateMarkersAreVisible);
  const [darkModeIsVisible, setDarkModeVisibility] = useState(roadmapDefaultsJson.darkModeIsVisible);
  const [todaysBoundingRect, setTodaysBoundingRect] = useState();
  const [timeLines, setTimeLines] = useState(new Array<TimeFrameModel>());
  // const [releases, setReleases] = useState(new Array<ReleaseModel>());
  // const [flags, setFlags] = useState(new Array<FlagModel>());

  let dates =new DateModel();
  const mapRef = useRef<HTMLDivElement>(null); 
  
  let observerOptions = {
    root: null,
    rootMargin: "-38% 0% -60% 0%",
    threshold: 0,
  };
  let observer = new IntersectionObserver(moveIntoFocus, observerOptions);
  
  let markerObserverOptions = {
    root: null,
    rootMargin: "0% -23% 0% -23%",
    threshold: 0,
  };
  let markerObserver = new IntersectionObserver(makeMoreVisible, markerObserverOptions);

  let roadMapItems : RoadMapItem[] = [];
  releases.forEach(r => roadMapItems.push(r));
  (flags as unknown as FlagModel[]).forEach(f => roadMapItems.push(f));
  
  roadMapItems.sort((a, b) => {
    if (a.endDate < b.endDate) return -1;
    else if (a.endDate > b.endDate) return 1;
    else {
        if (a.itemType == RoadMapItemType.flag) return -1;
        else if (b.itemType == RoadMapItemType.flag) return 1;
        else return 0 
    };

  });
  dates.startDate = new Date(new Date(roadMapItems[0].startDate).getFullYear() - 2, 0, 1);
  dates.endDate = new Date(new Date(roadMapItems[roadMapItems.length-1].endDate).getFullYear() + 2, 11, 31);

  if (timeLines && timeLines.length == 0) {
    setTimeLines(getTimeFramesYear(dates.startDate, dates.endDate));
  }

  console.log('dates', dates);

  useEffect(() => {
    if (mapRef.current && !todayWasBroughtIntoView && todaysBoundingRect != undefined) {
      // console.log("ref todaysBoundingRect", todaysBoundingRect);
      focusOnToday();
      setTodayWasBroughtIntoView(true);
  }
  });

  const focusOnToday = () => {
    setMargin(todaysBoundingRect?.x);
    setTimeout(() => {
      mapRef.current?.scrollTo({ "top": todaysBoundingRect?.y - 250, "behavior": "smooth"});
    }, 500);
  }

  const bubbleTodaysBoundingRect = (boundingRect: any) => {
    if (!todayWasBroughtIntoView){
      setTodaysBoundingRect(boundingRect);
    }
  }

  return (
    <>
      <main className={`
        d-flex flex-column justify-content-start h-100v w-100v
        bg-skin-fill text-skin-base 
        overflow-y-hidden overflow-x-hidden transition-400ms ${darkModeIsVisible ? "theme-dark" : ""}`}  style={{
        paddingTop:"1px"
        // backgroundImage: ` linear-gradient(125deg, rgba(0,25,217, 0.85) 0%, rgba(0,0,0, 1) 15%, rgba(0,0,0, 1) 85%, rgba(142,0,200, 0.85) 100%), url(${bg.src})`,
      }}>
        
        
        {/* <div 
          style={{marginLeft: (margin*-1 + leftMargin)}}
          className='transition-400ms'>
          <RoadmapMarkers
            flags={flags as unknown as FlagModel[]}  
            pixelsPerDay={pixelsPerDay}  
            dates={dates}
            focusport={markerObserver} 
            leftOffset={margin}
            timeLines={timeLines}/>
        </div> */}
        <div 
          ref={mapRef}
          className="overflow-y-auto overflow-x-auto d-flex flex-column map-body"
          // style={{marginLeft: (margin*-1 + leftMargin)}}
        >
          <div className="h-100 mt-4 roadmap-container">
            <Roadmap 
              bubbleTodaysBoundingRect={bubbleTodaysBoundingRect} 
              releases={releases} 
              flags={flags as unknown as FlagModel[]} 
              roadMapItems={roadMapItems} 
              focusport={observer} 
              markerport={markerObserver} 
              pixelsPerDay={pixelsPerDay} 
              dates={dates}
              flagsAreVisible={flagsAreVisible} 
              releasesAreVisible={releasesAreVisible} 
              featuresAreVisible={featuresAreVisible} 
              lineItemsAreVisible={lineItemsAreVisible} 
              dateMarkersAreVisible={dateMarkersAreVisible} 
              leftOffset={margin} />
          </div>

          <div className="position-fixed d-flex flex-column">
            <TimeLine 
              pixelsPerDay={pixelsPerDay} 
              dates={dates} 
              splitInto={roadmapDefaultsJson.zoomLevelTimelinesMap[zoomLevelToPixelsPerDay[zoomLevel].toString()]} 
              leftOffset={margin}
              timeLines={timeLines}
            />
            <div className="">
              <TitleBar 
                zoomLevel={zoomLevel} onZoomLevelChange={handleZoomLevelChange} 
                flagsAreVisible={flagsAreVisible} onFlagVisibilityChange={handleFlagVisibilityChange} 
                releasesAreVisible={releasesAreVisible} onReleaseVisibilityChange={handleReleaseVisibilityChange} 
                featuresAreVisible={featuresAreVisible} onFeatureVisibilityChange={handleFeatureVisibilityChange} 
                lineItemsAreVisible={lineItemsAreVisible} onLineItemVisibilityChange={handleLineItemVisibilityChange} 
                dateMarkersAreVisible={dateMarkersAreVisible} onDateMarkersVisibilityChange={handleDateMarkersAreVisibleVisibilityChange} 
                darkMode={darkModeIsVisible} onDarkModeChange={handleDarkModeChange} 
                setTodayWasBroughtIntoView={handleSetTodayWasBroughtIntoView}
                goToHome={focusOnToday}
              />
              
          </div>
          </div>
        </div>
        <button className='text-skin-base cast-a-shadow' onClick={scrollUp} style={{position: "fixed", top: "48vh", left: "1vw"}}><h1><ArrowLeftCircleFill/></h1></button>
        <button className='text-skin-base cast-a-shadow' onClick={scrollDown} style={{position: "fixed", top: "48vh", right: "1vw"}}><h1><ArrowRightCircleFill /></h1></button>
      </main>
      
    </>
    
  )

  function scrollUp() {
    mapRef.current?.scrollTo({ "top": mapRef.current?.scrollTop  - 400, "behavior": "smooth" });
  }

  function scrollDown() {
    mapRef.current?.scrollTo({ "top": mapRef.current?.scrollTop  + 400, "behavior": "smooth" });
  }

  function moveIntoFocus(entries: any) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        let offset = entry.target.dataset.days;
        setMargin(offset - leftMargin);
    } else {
    }
  }

  function makeMoreVisible(entries: any) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("flag-highlight");
      } else {
        entry.target.classList.remove("flag-highlight");
      }
    });
   
  }

  function handleZoomLevelChange(event: ChangeEvent<HTMLInputElement>) {
    setZoomLevel(event.target.value);
    let mappedValue = zoomLevelToPixelsPerDay[zoomLevel];
    setPixelsPerDay(mappedValue) ;
  }

  function handleSetTodayWasBroughtIntoView() {
    setTodayWasBroughtIntoView(true);
  }

  function handleFlagVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    setFlagsVisibility(!flagsAreVisible);
    console.log('new val setFlagsVisibility', flagsAreVisible);
  }

  function handleReleaseVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    setReleaseVisibility(!releasesAreVisible);
    console.log('new val setReleaseVisibility', releasesAreVisible);
  }

  function handleFeatureVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    setFeatureVisibility(!featuresAreVisible);
    console.log('new val setFeatureVisibility', featuresAreVisible);
  }

  function handleLineItemVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    setLineItemVisibility(!lineItemsAreVisible);
    console.log('new val setLineItemVisibility', lineItemsAreVisible);
  }

  function handleDateMarkersAreVisibleVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    setDateMarkerVisibility(!dateMarkersAreVisible);
    console.log('new val setLineItemVisibility', lineItemsAreVisible);
  }

  function handleDarkModeChange(event: ChangeEvent<HTMLInputElement>) {
    setDarkModeVisibility(!darkModeIsVisible);
  }
  
  function getTimeFramesYear(startDate: Date, endDate: Date): TimeFrameModel[] {
    var timeFrames: TimeFrameModel[] = [];
    var newTimeFrame = startDate;
    var year = newTimeFrame.getFullYear();
    while (newTimeFrame <= endDate){
        timeFrames.push(
            new TimeFrameModel(
                new Date(newTimeFrame.getTime()) ,
                new Date(year, 11, 31),
                year.toString(),
        ));
        year++;
        newTimeFrame = new Date(year, 0, 1);
    }
    return timeFrames;
}

}

const zoomLevelToPixelsPerDay = {
  0: 0.25,
  0.1: 0.25,
  0.2: 0.25,
  0.3: 0.25,
  0.4: 0.25,
  0.5: 0.25,
  0.6: 0.25,
  0.7: 0.25,
  0.8: 0.25,
  0.9: 0.25,
  1: 0.5,
  1.1: 0.5,
  1.2: 0.5,
  1.3: 0.5,
  1.4: 0.5,
  1.5: 0.5,
  1.6: 0.5,
  1.7: 0.5,
  1.8: 0.5,
  1.9: 0.5,
  2: 1,
  2.1: 1,
  2.2: 1,
  2.3: 1,
  2.4: 1,
  2.5: 1,
  2.6: 1,
  2.7: 1,
  2.8: 1,
  2.9: 1,
  3: 2,
  3.1: 2,
  3.2: 2,
  3.3: 2,
  3.4: 2,
  3.5: 2,
  3.6: 2,
  3.7: 2,
  3.8: 2,
  3.9: 2,
  4: 3,
  4.1: 3,
  4.2: 3,
  4.3: 3,
  4.4: 3,
  4.5: 3,
  4.6: 3,
  4.7: 3,
  4.8: 3,
  4.9: 3,
  5: 5,
  5.1: 5,
  5.2: 5,
  5.3: 5,
  5.4: 5,
  5.5: 5,
  5.6: 5,
  5.7: 5,
  5.8: 5,
  5.9: 5,
};
  