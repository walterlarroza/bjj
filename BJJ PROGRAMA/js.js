var MMA = {
	valueLeft : null,
	valueRight : null,
	min : null,
	sec : null,
	interval : null,
	adLeft : null,
	adRight : null,
	peLeft : null,
	peRight : null,
	start : null,
	opacity : null,

	init : function() {
		this.valueLeft = 0;
		this.valueRight = 0;
		this.min = 0;
		this.sec = 0;
		this.adLeft = 0;
		this.adRight = 0;
		this.peLeft = 0;
		this.peRight = 0;
		this.start = 0;
		this.opacity = 1;


		jQuery(window).resize(function() {
			var width = jQuery(this).width();
			var height = jQuery(this).height();	
			if(width >= 1100 || height >= 700)
				jQuery(".center .points").css("font-size", "300px");
			if(width < 1100 || height < 700)
				jQuery(".center .points").css("font-size", "220px")	;	
		});

		jQuery(".center .button p").on("click", function() {
			var value = jQuery(this).attr("value");
			var position = jQuery(this).attr("position");

			if(position == "left") {
				MMA.valueLeft += parseInt(value);
				if(MMA.valueLeft < 0)
					MMA.valueLeft = 0;
				jQuery(".center .left .points").html(MMA.valueLeft);
			}

			if(position == "right") {
				MMA.valueRight += parseInt(value);
				if(MMA.valueRight < 0)
					MMA.valueRight = 0;
				jQuery(".center .right .points").html(MMA.valueRight);
			}
		});

		jQuery(".top .button .start").on("click", function() {
			if(MMA.start == 0) {
				MMA.start = 1;
				MMA.interval = setInterval("MMA.time()", 1000);
			}
		});

		jQuery(".top .button .stop").on("click", function() {
			if(MMA.start == 1) {
				MMA.start = 0;
				clearInterval(MMA.interval);
			}
		});

		jQuery(".top .button .reset").on("click", function() {
			MMA.start = 0;
			clearInterval(MMA.interval);
			MMA.sec = 0;
			MMA.min = 0;
			jQuery(".top .time").html("00:00");		

			MMA.valueLeft = 0;
			MMA.valueRight = 0;
			MMA.adLeft = 0;
			MMA.adRight = 0;
			MMA.peLeft = 0;
			MMA.peRight = 0;

			jQuery(".center .left .points").html(MMA.valueLeft);
			jQuery(".center .right .points").html(MMA.valueRight);
			jQuery(".top .time").html("00:00");
			jQuery(".bottom .left .advantages .text .zahl").html(MMA.adLeft);
			jQuery(".bottom .right .advantages .text .zahl").html(MMA.adRight);
			jQuery(".bottom .left .penalties .text .zahl").html(MMA.peLeft);
			jQuery(".bottom .right .penalties .text .zahl").html(MMA.peRight);	
		});

		jQuery(".bottom .advantages .button p").on("click", function() {
			var value = jQuery(this).attr("value");
			var position = jQuery(this).attr("position");	

			if(position == "left") {
				MMA.adLeft += parseInt(value);
				if(MMA.adLeft < 0)
					MMA.adLeft = 0;
				jQuery(".bottom .left .advantages .text .zahl").html(MMA.adLeft);
			}

			if(position == "right") {
				MMA.adRight += parseInt(value);
				if(MMA.adRight < 0)
					MMA.adRight = 0;
				jQuery(".bottom .right .advantages .text .zahl").html(MMA.adRight);
			}		
		});

		jQuery(".bottom .penalties .button p").on("click", function() {
			var value = jQuery(this).attr("value");
			var position = jQuery(this).attr("position");	

			if(position == "left") {
				MMA.peLeft += parseInt(value);
				if(MMA.peLeft < 0)
					MMA.peLeft = 0;
				jQuery(".bottom .left .penalties .text .zahl").html(MMA.peLeft);
			}

			if(position == "right") {
				MMA.peRight += parseInt(value);
				if(MMA.peRight < 0)
					MMA.peRight = 0;
				jQuery(".bottom .right .penalties .text .zahl").html(MMA.peRight);
			}		
		});

		jQuery(".bottom p.reset").on("click", function() {console.log("df");
			MMA.adLeft = 0;
			MMA.adRight = 0;
			MMA.peLeft = 0;
			MMA.peRight = 0;

			jQuery(".bottom .left .advantages .text .zahl").html(MMA.adLeft);
			jQuery(".bottom .right .advantages .text .zahl").html(MMA.adRight);
			jQuery(".bottom .left .penalties .text .zahl").html(MMA.peLeft);
			jQuery(".bottom .right .penalties .text .zahl").html(MMA.peRight);
		});

		jQuery("body").on("keypress", function(event) {
			if(event.charCode == "32" || event.keyCode == "32") {
				if(MMA.start == 1)
					jQuery(".top .button .stop").click();
				else 
					jQuery(".top .button .start").click();

			}

			if(event.charCode == "114" || event.keyCode == "114" || event.charCode == "82" || event.keyCode == "82")
				jQuery(".top .button .reset").click();		
		});

		jQuery("body").on("keydown", function(event) {console.log(event);
			if(event.keyCode == "189" || event.charCode == "189" || event.keyCode == "109")
				MMA.opacityFunction(0);
				
			if(event.keyCode == "187" || event.charCode == "187" || event.keyCode == "107")
				MMA.opacityFunction(1);
		});
	},

	time : function() {
		var minText = "";
		var secText = "";

		MMA.sec ++;
		if(MMA.sec > 59) {
			MMA.sec = 0;
			MMA.min ++;
		}

		if(MMA.sec < 10)
			secText = "0";

		if(MMA.min < 10)
			minText = "0";

		jQuery(".top .time").html(minText + MMA.min + ":" + secText + MMA.sec);
	},

	opacityFunction : function(data) {
		if(data == 1)
			MMA.opacity += 0.1;
		else
			MMA.opacity -= 0.1;

		if(MMA.opacity > 1)
			MMA.opacity = 1;
		if(MMA.opacity < 0)
			MMA.opacity = 0;

		jQuery(".button").animate({opacity : MMA.opacity}, 1); 
	}

};




jQuery(function(){
	MMA.init();
});