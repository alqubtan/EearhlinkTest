const express = require("express");
const app = express();
const http = require("http");
const ffmpeg = require("fluent-ffmpeg");
const PORT = 3000;
const VIDEO_URL = "";

// Route to serve the movie page
app.get("/", async (req, res) => {
  try {
    // 1- Here we get the audio stream from a given video (server || local) url
    const audioStream = ffmpeg(VIDEO_URL).outputFormat("mp3").noVideo().pipe();

    // this code to handle individual sentences, I assume that i will wait until get all stream
    audioStream.on("data", (data) => {
      const sentence = data.toString().trim();
    });

    // 2-
    // (THE Solution here ) : here we should interact with google api to get the text,
    // but to take this cost from us is we can training a Model or using existing one like
    // mozila deepspeech "https://github.com/mozilla/DeepSpeech/releases/tag/v0.9.3"

    // 3- Generating the Video
    // // Generate the HTML for the video player with muted segments for bad words
    // let playerHTML = `
    //     <html>
    //       <head>
    //         <title>Movie Page</title>
    //       </head>
    //       <body>
    //         <video controls>
    //           <source src="${VIDEO_URL}" type="video/mp4">
    //   `;

    // let previousMutedEnd = 0;
    // for (const badWordTimestamp of badWordTimestamps) {
    //   if (badWordTimestamp > previousMutedEnd) {
    //     playerHTML += `
    //         <source src="${VIDEO_URL}#t=${previousMutedEnd},${badWordTimestamp}" type="video/mp4">
    //       `;
    //   }
    //   playerHTML += `
    //       <source src="${VIDEO_URL}#t=${badWordTimestamp}" type="video/mp4" muted>
    //     `;
    //   previousMutedEnd = badWordTimestamp;
    // }

    // if (previousMutedEnd < video.metadata.duration.raw) {
    //   playerHTML += `
    //       <source src="${VIDEO_URL}#t=${previousMutedEnd},${video.metadata.duration.raw}" type="video/mp4">
    //     `;
    // }

    // playerHTML += `
    //         </video>
    //       </body>
    //     </html>
    //   `;

    // res.send(playerHTML);
    res.send("<h2>Read app.js file<h2/>");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading movie");
  }
});

// Start the server
http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
