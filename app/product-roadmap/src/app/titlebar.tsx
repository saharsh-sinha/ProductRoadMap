import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Send, Award, BarChartSteps, Justify, ZoomIn, ZoomOut, Flag, Sliders2 } from 'react-bootstrap-icons';

export default function TitleBar(props: {
    pixelsPerDay: number, onPixelPerDayChange: any,    
    flagsAreVisible: boolean, onFlagVisibilityChange: any, 
    releasesAreVisible: boolean, onReleaseVisibilityChange: any, 
    featuresAreVisible: boolean, onFeatureVisibilityChange: any, 
    lineItemsAreVisible: boolean, onLineItemVisibilityChange: any 
}) {
    

    const [show, setShow] = useState(false);
    
    return (
    <div className="d-flex justify-content-between w-100 p-2">
        <div className="d-flex">
            <div className="h1 mx-2"><BarChartSteps/></div>
            <div className="h1" >Product Map</div>
        </div>
        <div className="d-flex flex-row flex-nowrap justify-content-end">
           <OverlayTrigger
                placement={'left'}
                show={show}
                overlay={
                    <div className="release-card-bg  control-panel fit-content-height" style={{width: '300px' }}>

                        <div className="d-flex flex-column flex-nowrap justify-content-start ml-4">
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Flag /> Flags </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onFlagVisibilityChange} checked={props.flagsAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Send /> Release Names </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onReleaseVisibilityChange} checked={props.releasesAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Award /> Features </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onFeatureVisibilityChange} checked={props.featuresAreVisible} /></div></div>
                            <div className="d-flex  justify-content-between"><div className="h6 d-flex  justify-content-start"><Justify /> Line Items </div> <div className="form-check form-switch"><input className="form-check-input" type="checkbox" onChange={props.onLineItemVisibilityChange} checked={props.lineItemsAreVisible} /></div></div>
                        </div>
                        <div className="d-flex mt-2">
                            <ZoomOut />
                            <input onChange={props.onPixelPerDayChange} type="range" className="form-range px-2" min="0" max="5" step="1" id="customRange3" />
                            <ZoomIn />
                        </div>
                        <button onClick={() => setShow(!show)}>Close</button>
                    </div>
                }>
                    
                    <button className="h1" onClick={() => setShow(!show)}><b><Sliders2 /></b></button>
                </OverlayTrigger>
            
        </div>
    </div>
    
    )
}
