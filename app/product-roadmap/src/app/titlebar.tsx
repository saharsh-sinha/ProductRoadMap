import { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { Send, Award, BarChartSteps, Justify, ZoomIn, ZoomOut, Flag, Sliders2, House, Calendar2CheckFill, MoonStarsFill, Bullseye, Sliders } from 'react-bootstrap-icons';
import roadmapDefaultsJson from './roadmap-defaults.json'

export default function TitleBar(props: {
    zoomLevel: number, onZoomLevelChange: any,    
    flagsAreVisible: boolean, onFlagVisibilityChange: any, 
    releasesAreVisible: boolean, onReleaseVisibilityChange: any, 
    featuresAreVisible: boolean, onFeatureVisibilityChange: any, 
    lineItemsAreVisible: boolean, onLineItemVisibilityChange: any,
    dateMarkersAreVisible: boolean, onDateMarkersVisibilityChange: any,
    darkMode: boolean, onDarkModeChange: any,
    setTodayWasBroughtIntoView: any,
    goToHome: any
}) {
    const [show, setShow] = useState(false);
    
    return (
    <div className="d-flex flex-row-reverse justify-content-between w-100 p-2" style={{    position: "fixed", right: "5px", top: "55px"}}>
        
        <div className="d-flex flex-column" style={{ position: "fixed", left: "10px", bottom: "10px"}}>
            <div className="d-flex">
                <div className="h1 mx-2 cast-a-shadow " style={{fontSize: 44}}><BarChartSteps/></div>
                <div className="h1 cast-a-shadow "  style={{fontSize: 72, marginTop: "-22px"}}>{roadmapDefaultsJson.pageTitle}</div>
            </div>
        </div>
        <div className="d-flex flex-row flex-nowrap justify-content-end control-buttons">
            
           <button className="h3 cast-a-shadow " onClick={() => props.goToHome()}><b><Bullseye /></b></button>
           <OverlayTrigger
                placement={'left'}
                show={show}
                overlay={
                    <div className="control-panel fit-content-height bg-skin-fill" style={{width: '300px' }}>

                        <div className="d-flex flex-column flex-nowrap justify-content-start ml-4">
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Flag className="mr-3" /> Flags </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onFlagVisibilityChange} checked={props.flagsAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Send className="mr-3" /> Release Names </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onReleaseVisibilityChange} checked={props.releasesAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Award className="mr-3" /> Features </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onFeatureVisibilityChange} checked={props.featuresAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Justify className="mr-3" /> Tickets </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onLineItemVisibilityChange} checked={props.lineItemsAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Calendar2CheckFill className="mr-3" /> Dates </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onDateMarkersVisibilityChange} checked={props.dateMarkersAreVisible} /></div></div>
                            <hr />
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><MoonStarsFill className="mr-3" /> Dark mode </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onDarkModeChange} checked={props.darkMode} /></div></div>
                        </div>
                        <div className="d-flex mt-2">
                            <ZoomOut />
                            <input onChange={props.onZoomLevelChange} type="range" className="form-range px-2" min="1" max="5" step="0.1" id="customRange3" />
                            <ZoomIn />
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button onClick={() => setShow(!show)}>Reset</button>
                            <button onClick={() => setShow(!show)}>Close</button>
                        </div>
                    </div>
                }>
                    
                    <button className="h3 cast-a-shadow " onClick={() => setShow(!show)}><b><Sliders /></b></button>
                </OverlayTrigger>
            
        </div>
    </div>
    
    )
}
