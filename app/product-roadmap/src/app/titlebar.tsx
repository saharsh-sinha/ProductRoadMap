
export default function TitleBar() {
    return (
    <div className="d-flex justify-content-between w-100">
        <div>
            <h1>Product Roadmap</h1>
        </div>
        <div className="d-flex  justify-content-end w-25">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Release</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Feature</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Items</label>
            </div>
           
        </div>
    </div>
    
    )
}