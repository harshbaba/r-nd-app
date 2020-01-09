function callVideoPlugin(){
	var video_id = '';
	jQuery(".youtube").on('click', function(){
		var url = jQuery(this).data("video-url");
		//console.log(url);
		youtube_parser(url);
		//console.log(video_id);
		openYoutubePopup();
	});
	
	jQuery(".vimeo").on('click', function(){
		var url = jQuery(this).data("video-url");
		//console.log(url);
		vimeo_parser(url);
		//console.log(video_id);
		openVimeoPopup();
	});
	
	function youtube_parser(url){
		//console.log(url);
		video_id = url.match(/v=(.{11})/)[1];
	}
	
	function vimeo_parser(url){
		vimeo_Reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
		var match = url.match(vimeo_Reg);
		//console.log(match[3]);
		video_id = match[3];
	}
	
	function openYoutubePopup(){
		showPageBg();
		jQuery('.custom-model').append('<iframe src="https://www.youtube.com/embed/'+video_id+'" frameborder="0" allowfullscreen></iframe>')
		jQuery('.custom-model').addClass('active video-popup');
	}
	
	function openVimeoPopup(){
		showPageBg();
		jQuery('.custom-model').append('<iframe src="https://player.vimeo.com/video/'+video_id+'?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
		jQuery('.custom-model').addClass('active video-popup');
	}
	
	function closePopup(){
		hidePageBg();
		jQuery('.custom-model').removeClass('active video-popup');
		jQuery('.custom-model').html('');
	}
	
	jQuery(".page-bg").on("click", function(){
		hidePageBg();
		jQuery('.custom-model').removeClass('active video-popup');
		jQuery('.custom-model').html('');
	});
}




