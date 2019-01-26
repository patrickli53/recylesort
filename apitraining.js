const Clarifai = require('clarifai'); 

const app = new Clarifai.App({
    apiKey: '149600ad4a084e3e8501b5255a8c4778'
}); 

app.inputs.create([{
    "url": "https://i5.walmartimages.com/asr/3bc43683-1ba5-4c62-ba6a-460504e7b152_1.484d5d58b37bf0575a5364df5d69ffe2.jpeg",
    "concepts": [
        {
            "id": "trash",
            "value": true
        },
        {
            "id": "recyclable",
            "value": false
        }
    ]
}, {
    "url": "http://www.calgary.ca/UEP/WRS/PublishingImages/What-goes-where/items/Chip-bag-160px.jpg",
    "concepts": [
        {
            "id": "trash",
            "value": true
        },
        {
            "id": "recyclable",
            "value": false
        }
    ]
}, {
        "url": "https://assets3.thrillist.com/v1/image/1288649/size/tmg-article_default_mobile.jpg",
        "concepts": [
            {
                "id": "trash",
                "value" : true
            },
            {
                "id": "recyclable",
                "value" : false
            }
        ]
}
]).then(
    createModel,
    errorHandler
); 



var recycleTags = ['recycling', 'plastic', 'paper', 'cardboard', 'carton']; 

app.models.predict(Clarifai.GENERAL_MODEL, 'https://i5.walmartimages.com/asr/3bc43683-1ba5-4c62-ba6a-460504e7b152_1.484d5d58b37bf0575a5364df5d69ffe2.jpeg')
    .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']; 
        var tags = []; 
        var banned = []; 

        for (var i = 0; i < concepts.length; i++) {
            for (var u = 0; u < recycleTags.length; u++) {
                if (concepts[i].name == recycleTags[u]) {
                    tags.push(concepts[i]);
                };
            };  
        };  

        console.log(concepts);

        if (tags.length != 0) {
            console.log("This is recyclable lulll");
        } else {
            console.log("Uh lol not sure lol kek");
        }
    })
    .catch(err => {
        console.log(err);
    }); 