prediction_1 = "";
prediction_2 = "";

Webcam.set({

    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90

});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function capture(){

    Webcam.snap(function (data_uri){

        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">';

    });

}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jQuyhucm3/model.json', modelLoaded);

function modelLoaded(){

    console.log("The model has been loaded");

}

function identify(){

    captured = document.getElementById("captured_image");
    classifier.classify(captured, gotResult);  

}

function gotResult(error, result){

    if(error){

        console.error(error);
        
    }
    else{

        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
            prediction_1 = result[0].label;
            prediction_2 = result[1].label;

        speak();

        if(result[0].label == "Amazing"){

            document.getElementById("update_emoji").innerHTML = "&#128076;";

        }

        if(result[0].label == "Best"){

            document.getElementById("update_emoji").innerHTML = "&#128077;";

        }

        if(result[0].label == "Victory"){

            document.getElementById("update_emoji").innerHTML = "&#9996;";

        }




        if(result[1].label == "Amazing"){

            document.getElementById("update_emoji2").innerHTML = "&#128076;";

        }

        if(result[1].label == "Best"){

            document.getElementById("update_emoji2").innerHTML = "&#128077;";

        }

        if(result[1].label == "Victory"){

            document.getElementById("update_emoji2").innerHTML = "&#9996;";

        }


    }


}

function speak(){

    synth = window.speechSynthesis;
    speak_data = "First Prediction Is" + prediction_1;
    speak_data2 = "The Second Prediction Is" + prediction_2;
    utter_this = new SpeechSynthesisUtterance(speak_data + speak_data2);
    synth.speak(utter_this);

}