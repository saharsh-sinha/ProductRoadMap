
"use client";

import { ReleaseModel, FeatureModel, LineItemModel } from '../app/models/release';
import { Send, Award, Justify, Link45deg } from 'react-bootstrap-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { startDate, numberOfDays } from './timeline';

export default function Roadmap() {
    return (<div>
        {releases.map(r => 
            (<div className="card fit-content p-2 my-2 mr-2" style={{marginLeft: numberOfDays(startDate, r.releaseStartDate)}}>
                <div className="d-flex">
                    <div className=" pr-2"><Send /></div>
                    <div className="">{r.releaseName}</div>
                </div>
                <Feature features={r.features}/>
            </div>)
        )}
        </div>)
}

export function Feature(props: {
    features: FeatureModel[]
}) {
    return (<div>
        {props.features.map((feature) => 
            (<div className="pl-2">
                <div className="d-flex">
                    <div className=" pr-2"><Award /></div>
                    <OverlayTrigger
                        placement={'right'}
                        delay={{ show: 400, hide: 400 }}
                        overlay={
                            <Tooltip>
                                {feature.featureDescription}
                            </Tooltip>
                        }>
                        <div className="">{feature.featureName}</div>
                    </OverlayTrigger>
                    <a href={feature.url} className=" pl-2"><Link45deg /></a>
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

    for (let i = 0; i < 20; i++) {
        let release = new ReleaseModel();
        release.releaseName = "Release " + (i + 1);
        release.releaseDescription = "Release " + (i + 1) + " description";
        release.releaseStartDate = new Date(Math.ceil((2019 + (i*0.25))), (1 + i)%12, 15);
        release.releaseEndDate = new Date(Math.ceil((2019 + (i*0.25))), (1 + i)%12, 15);
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

const text = "Lorem Ipsum is a dummy or placeholder text that's often used in print, infographics, or web design. The primary purpose of Lorem Ipsum is to create text that doesn't distract from the overall layout and visual hierarchy. It's also called filler or placeholder text." + 
"Lorem Ipsum has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. " +
"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

const releases: ReleaseModel[] = getReleases();
const releases1: ReleaseModel[] =[
    {
        releaseName: "Release 1",
        releaseDescription: "Release 1 description",
        releaseStartDate: new Date(2019, 10, 15),
        releaseEndDate: new Date(2019, 10, 15),
        url: "",
        features: [
            {
                featureName: "Lorem Ipsum is simply dummy",
                featureDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                url: "",
                lineItems: [
                    {
                        lineItemName: "lineItem 1 a x",
                        lineItemDescription: "lineItem 1 a x description",
                        url: "",
                    },
                    {
                        lineItemName: "lineItem 1 a y",
                        lineItemDescription: "lineItem 1 a y description",
                        url: "",
                    },
                ]
            },
            {
                featureName: "Lorem Ipsum has been the industry's",
                featureDescription: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s description",
                url: "",
                lineItems: [
                    {
                        lineItemName: "lineItem 1 b x",
                        lineItemDescription: "lineItem 1 b x description",
                        url: "",
                    },
                    {
                        lineItemName: "lineItem 1 b y",
                        lineItemDescription: "lineItem 1 b y description",
                        url: "",
                    },
                ]
            },
        ]
    },
    {
        releaseName: "Release 2",
        releaseDescription: "Release 2 description",
        releaseStartDate: new Date(2020, 10, 15),
        releaseEndDate: new Date(2020, 10, 15),
        url: "",
        features: [
            {
                featureName: "when an unknown printer took",
                featureDescription: "when an unknown printer took a galley of type and scrambled it to make a type specimen book description",
                url: "",
                lineItems: [
                    {
                        lineItemName: "lineItem 2 a x",
                        lineItemDescription: "lineItem 2 a x description",
                        url: "",
                    },
                    {
                        lineItemName: "lineItem 2 a y",
                        lineItemDescription: "lineItem 2 a y description",
                        url: "",
                    },
                ]
            },
            {
                featureName: "It has survived not only five centuries",
                featureDescription: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged description",
                url: "",
                lineItems: [
                    {
                        lineItemName: "lineItem 2 b x",
                        lineItemDescription: "lineItem 2 b x description",
                        url: "",
                    },
                    {
                        lineItemName: "lineItem 2 b y",
                        lineItemDescription: "lineItem 2 b y description",
                        url: "",
                    },
                ]
            },
        ]
    },
];
