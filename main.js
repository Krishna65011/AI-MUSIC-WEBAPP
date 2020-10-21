sound_harry = "";
sound_peter = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
sound_status = "";
sound_status2 = "";
function preload()
{
    sound_harry = loadSound("harry.mp3");
    sound_peter = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Model is loaded!!");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    sound_status =  sound_harry.isPlaying();
    sound_status = sound_peter.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        sound_harry.stop();
    }

    if(sound_status2 == "false")
    {
        sound_peter.play();
        document.getElementById("song_name").innerHTML = "Song playing = Peter Pan Theme song";
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        sound_peter.stop();
    }

    if(sound_status == "false")
    {
        sound_harry.play();
        document.getElementById("song_name").innerHTML = "Song playing = Harry Poter theme song"; 
    }
}

function gotPoses(results)
{
    if(results.length > 0);
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + " y = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristX + " y = " + rightWristY);
    }
}