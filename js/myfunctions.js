var startTime;
var numberOfTaps = 0;
var bpms = [];

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	
	$("#home-page").on("touchmove", function(e) {
		e.preventDefault();
	});
}

function onDeviceReady() {
	adSetter();
}

function calculateBPM() {
	$("#home-page").css("background-color", "red");
	setTimeout(function(){ $("#home-page").css("background-color", "black"); }, 25);
	
	++numberOfTaps;
	
	if (numberOfTaps > 1) {
		var endTime = Date.now();
		var secondsPassed = (endTime - startTime)/1000;
		var bpm = (1/secondsPassed) * 60;
		bpms.push(bpm);
		
		var sumOfBpms = 0;
		
		for (var i = 0; i < bpms.length; i++) {
			sumOfBpms += bpms[i]; 
		}
		
		var averageBpm = sumOfBpms/bpms.length;
		
		//$("#home-page .bpm").html(averageBpm.toFixed(2));
		$("#home-page .bpm").html(Math.round(averageBpm));
	}
	
	startTime = Date.now();
}

function reset() {
	numberOfTaps = 0;
	bpms = [];
	$("#home-page .bpm").html("");
	event.stopPropagation();
}

function openMineTracksSite() {
	window.open('https://minetracks.com', '_system');
	event.stopPropagation();
}

function adSetter() {
	var admobid = {};
	// select the right Ad Id according to platform
	if (/(android)/i.test(navigator.userAgent)) {
		admobid = {// for Android
			banner : 'ca-app-pub-9124771327241907/5064247075'
		};
	} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = {// for iOS
			banner : 'ca-app-pub-9124771327241907/5064247075'
		};
	} else {
		admobid = {// for Windows Phone
			banner : 'ca-app-pub-9124771327241907/5064247075'
		};
	}

	if (typeof AdMob !== "undefined") {
		alert("screen.width: " + screen.width "\n$(window).width(): " + $(window).width());
		AdMob.createBanner({
			adId : admobid.banner,
			adSize : "CUSTOM", width : screen.width, height : 50,
			overlap : true,
			position : AdMob.AD_POSITION.TOP_CENTER,
			autoShow : true
		});
	}
}
