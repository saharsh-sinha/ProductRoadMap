import { Send, Award, BarChartSteps, Justify, ZoomIn, ZoomOut } from 'react-bootstrap-icons';

export default function TitleBar() {
    return (
    <div className="d-flex justify-content-between w-100 p-2">
        <div className="d-flex">
            <h3 className="mx-2"><BarChartSteps/></h3>
            <h3>Product Map</h3>
        </div>
        <div className="w-25">
            <h3 className="d-flex  justify-content-end">
                <div className="d-flex">
                    <ZoomOut />
                    <input type="range" className="form-range px-2" min="0" max="5" step="1" id="customRange3" />
                    <ZoomIn />
                </div>
                <div className="d-flex  flex-row flex-nowrap justify-content-start ml-4">
                    <Send />
                    <Award />
                    <Justify />
                </div>
            </h3>

            {/* <div className="form-check form-switch d-flex">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <Send />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Releases</label>
            </div>
            <div className="form-check form-switch d-flex">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <Award />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Feature</label>
            </div>
            <div className="form-check form-switch d-flex">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" />
                <Justify />
                <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Items</label>
            </div> */}
           
        </div>
    </div>
    
    )
}