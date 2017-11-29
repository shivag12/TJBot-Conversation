var soundplayer = require('sound-player');



	var speakerOptions = {
            filename: "/home/pi/TJBot-Conversation/tell_about.wav",
            gain: 100,
            debug: true,
            player: "aplay", // "afplay" "aplay" "mpg123" "mpg321"
            device: "plughw:1,0"
        }
        var player = new soundplayer(speakerOptions);

        //winston.debug("Playing audio with parameters: ", speakerOptions);

        player.on('complete', function() {
            //winston.debug("audio playback finished");

            // resume listening
            //self._resumeListening();

            // done
            resolve();
        });

        player.on('error', function(err) {
            //winston.error('Error occurred while playing audio :', err);
        });

        // play the audio
	player.play(speakerOptions.filename);


	