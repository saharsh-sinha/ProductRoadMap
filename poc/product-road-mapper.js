import data from './product-roadmap.json';
console.log(data);

var jsonData = {
    releases: [{
        display: 'Release 1',
        tooltip: '',
        url: '',
        startDate: '',
        endDate: '',
        features: [{
            display: 'feature 1',
            tooltip: '',
            url: '',
            items: [{
                display: 'item 1',
                tooltip: '',
                url: ''
            },{
                display: 'item 2',
                tooltip: '',
                url: ''
            }]
        },{
            display: 'Release 1',
            tooltip: '',
            url: '',
            items: []
        }]
    }]
};

// fetch("product-roadmap.json")
//   .then(response => response.json())
//   .then(json => console.log(json));

  

for (var releaseIdx = 0; releaseIdx < jsonData.releases.length; releaseIdx++){
    var thisRelease = jsonData.releases[releaseIdx];
    console.log(thisRelease.display);

    for (var featureIdx = 0; featureIdx < thisRelease.features.length; featureIdx++){
        var thisFeature = thisRelease.features[featureIdx];
        console.log(thisFeature.display);
        
        for (var itemIdx = 0; itemIdx < thisFeature.items.length; itemIdx++){
            var thisItem = thisFeature.items[itemIdx];
            console.log(thisItem.display);
        }

    }
}
