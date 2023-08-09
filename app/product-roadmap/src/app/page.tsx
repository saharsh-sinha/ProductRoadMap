
"use client";

import Image from 'next/image'
import Roadmap from './roadmap'
import TimeLine from './timeline'
import TitleBar from './titlebar'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import RoadmapMarkers from './roadmap-markers';
import { DateModel } from './models/RoadMapItem';
import { ReleaseModel } from './models/release';
import { FlagModel } from './models/FlagModel';
import releasesJson from './releases.json'
import flagsJson from './flags.json'
import bg from './../../public/back-texture.png';

export default function Home() {
  const releases: ReleaseModel[] = releasesJson as unknown as ReleaseModel[];
  const flags: FlagModel[] = flagsJson as unknown as FlagModel[];
  // console.log(releases, flags);

  const [margin, setMargin] = useState();
  const [pixelsPerDay, setPixelsPerDay] = useState(0.5);
  const [flagsAreVisible, setFlagsVisibility] = useState(true);
  const [releasesAreVisible, setReleaseVisibility] = useState(true);
  const [featuresAreVisible, setFeatureVisibility] = useState(true);
  const [lineItemsAreVisible, setLineItemVisibility] = useState(false);
  // const [releases, setReleases] = useState(new Array<ReleaseModel>());
  // const [flags, setFlags] = useState(new Array<FlagModel>());

  let dates =new DateModel(); 
  
  let observerOptions = {
    root: null,
    rootMargin: "-38% 1000% -60% 1000%",
    threshold: 0,
  };
  let observer = new IntersectionObserver(moveIntoFocus, observerOptions);
  
  let markerObserverOptions = {
    root: null,
    rootMargin: "0% -23% 0% -23%",
    threshold: 0,
  };
  let markerObserver = new IntersectionObserver(makeMoreVisible, markerObserverOptions);

  dates.startDate = new Date(new Date(releases[0].startDate).getFullYear() - 2, new Date(releases[0].startDate).getMonth(), new Date(releases[0].startDate).getDay());
  dates.endDate = new Date(new Date(releases[releases.length-1].endDate).getFullYear() + 2, 11, 31);
  // console.log(dates);
  return (
    <main className="d-flex flex-column justify-content-start h-100v w-100v body-bg text-white overflow-y-hidden overflow-x-hidden"  style={{
      // backgroundImage: ` linear-gradient(45deg, rgba(245,70,66, 0.75), rgba(8,83,156, 0.75)), url(${bg.src})`,
      backgroundImage: ` linear-gradient(125deg, rgba(0,25,217, 0.85) 0%, rgba(0,0,0, 1) 15%, rgba(0,0,0, 1) 85%, rgba(142,0,200, 0.85) 100%), url(${bg.src})`,
      // backgroundImage: ` linear-gradient(125deg, rgba(0,25,217, 0.75), rgba(0,0,0, 0.75), rgba(0,0,0, 0.75), rgba(142,0,200, 0.75)), url(${bg.src})`,
    }}>
      <div className="">
        <TitleBar 
          pixelsPerDay={pixelsPerDay} onPixelPerDayChange={handleValueChange} 
          flagsAreVisible={flagsAreVisible} onFlagVisibilityChange={handleFlagVisibilityChange} 
          releasesAreVisible={releasesAreVisible} onReleaseVisibilityChange={handleReleaseVisibilityChange} 
          featuresAreVisible={featuresAreVisible} onFeatureVisibilityChange={handleFeatureVisibilityChange} 
          lineItemsAreVisible={lineItemsAreVisible} onLineItemVisibilityChange={handleLineItemVisibilityChange} 
        />
        
      </div>
      
      <div 
        style={{marginLeft: (margin*-1 + 800)}}
        className='transition-400ms'>
        <RoadmapMarkers
          flags={flags}  
          pixelsPerDay={pixelsPerDay}  
          dates={dates}
          focusport={markerObserver}
        ></RoadmapMarkers>
      </div>
      <div 
        className="overflow-y-auto overflow-x-auto d-flex flex-column fit-content-width map-body"
        style={{marginLeft: (margin*-1 + 800)}}
      >
        <div className="h-100 mt-4 roadmap-container">
          <Roadmap releases={releases} flags={flags} focusport={observer} markerport={markerObserver} pixelsPerDay={pixelsPerDay}  dates={dates}></Roadmap>
        </div>

        <div className="position-fixed">
          <TimeLine pixelsPerDay={pixelsPerDay} dates={dates} 
            splitInto={pixelsPerDay > 1 ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] : ["Q1", "Q2", "Q3", "Q4"]}
          
          ></TimeLine>
        </div>
      </div>
    </main>
  )

  function moveIntoFocus(entries: any) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        let offset = entry.target.style.marginLeft.replace('px','');
        setMargin(offset);
    } else {
    }
  }

  function makeMoreVisible(entries: any) {
    // console.log("makeMoreVisible", entries.length);
    entries.forEach((entry: IntersectionObserverEntry) => {
      // console.log(entry.isIntersecting, entry.target);
      if (entry.isIntersecting) {
        entry.target.classList.add("flag-highlight");
      } else {
        entry.target.classList.remove("flag-highlight");
      }
    });
   
  }

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    let mappedValue = rangeToPixelsPerDay[event.target.value];
    setPixelsPerDay(mappedValue);
  }

  function handleFlagVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('new val', event.target.value);
    setFlagsVisibility(!(event.target.value as unknown as boolean));
  }

  function handleReleaseVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('new val', event.target.value);
    setReleaseVisibility(!(event.target.value as unknown as boolean));
  }

  function handleFeatureVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('new val', event.target.value);
    setFeatureVisibility(!(event.target.value as unknown as boolean));
  }

  function handleLineItemVisibilityChange(event: ChangeEvent<HTMLInputElement>) {
    console.log('new val', event.target.value);
    setLineItemVisibility(!(event.target.value as unknown as boolean));
  }
  
}

const rangeToPixelsPerDay = {
  0: 0.25,
  1: 0.5,
  2: 1,
  3: 2,
  4: 3,
  5: 5
};
  