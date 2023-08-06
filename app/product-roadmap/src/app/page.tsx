
"use client";

import Image from 'next/image'
import Roadmap from './roadmap'
import TimeLine from './timeline'
import TitleBar from './titlebar'
import { useRef, useState } from 'react';

export default function Home() {
  
  let observerOptions = {
    root: null,
    rootMargin: "-38% 1000% -60% 1000%",
    threshold: 0,
  };
  const [margin, setMargin] = useState(0);
  
  let observer = new IntersectionObserver(moveIntoFocus, observerOptions);
   
  return (
    <main className="d-flex flex-column justify-content-start h-100v w-100v bg-dark text-white overflow-y-hidden overflow-x-hidden">
      <div className="">
        <TitleBar></TitleBar>
        {/* {margin} */}
      </div>
      
      <div 
        className="overflow-y-auto overflow-x-auto d-flex flex-column fit-content-width map-body"
        style={{marginLeft: (margin*-1 + 800)}}
      >
        <div className="h-100 mt-4 roadmap-container">
          <Roadmap focusport={observer}></Roadmap>
        </div>
        <div className="position-fixed">
          <TimeLine></TimeLine>
        </div>
      </div>
    </main>
  )
  
function moveIntoFocus(entries: any) {
  const [entry] = entries;
  let entryName = entry.target.innerText.slice(0, 10);
  // console.log(entryName, entry.isIntersecting);
  
  if (entry.isIntersecting) {
      entry.target.classList.add("intersected");
      //console.log(entryName, "intersected", entry.target.offsetLeft, entry.target.style.marginLeft, entry)
      let offset = entry.target.style.marginLeft.replace('px','');
      // console.log(offset)
      setMargin(offset);
  } else {
      entry.target.classList.remove("intersected");
      //console.log(entryName, "not intersected")
  }
}

}
