var startTime;
var numberOfTaps = 0;
var bpms = [];

if (localStorage.app_rated == null) {
	localStorage.app_rated = "false";
}

if (localStorage.use_count == null) {
	localStorage.use_count = "0";
}

if (localStorage.later_count == null) {
	localStorage.later_count = "0";
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	
	$("#home-page").on("touchmove", function(e) {
		e.preventDefault();
	});
	
	$("#home-page > .ui-content").on("touchstart", function() {
		calculateBPM();
	});
	
	$("#home-page .reset-button").on("tap", function(event) {
		reset();
	});
	
	$("#rate-app-popup .rate-now-button").on("tap", function(event) {
		localStorage.app_rated = "true";
		window.open('market://details?id=com.triplea.bpmcalculator', '_system');
		$("#rate-app-popup").off("popupafterclose");
		$("#rate-app-popup").popup("close");
	});
	
	$("#rate-app-popup .later-button").on("tap", function(event) {
		$("#rate-app-popup").popup("close");
	});
	
	$("#rate-app-popup").on("popupafterclose", function() {
		localStorage.later_count = parseInt(localStorage.later_count) + 1;
	});
	
	var mainContentBorderSize = $("#home-page > .ui-content").innerHeight() - $("#home-page > .ui-content").height();
	$("#home-page > .ui-content").height($("#home-page").height() - mainContentBorderSize);
	
	if ((localStorage.app_rated == "false") && (localStorage.later_count < 2)) {
		localStorage.use_count = parseInt(localStorage.use_count) + 1;
		
		if ((parseInt(localStorage.use_count) % 5) == 0) {
			setTimeout(function(){ $("#rate-app-popup").popup("open"); }, 500);
		}
	}
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
		AdMob.createBanner({
			adId : admobid.banner,
			adSize : "CUSTOM", width : $(window).width(), height : 50,
			overlap : true,
			position : AdMob.AD_POSITION.TOP_CENTER,
			autoShow : true
		});
	}
}
