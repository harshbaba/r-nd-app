$(document).ready(function(){
    $('.go-btn').click(function(){
        var videoUrl = $('input[name="youtube-url"]').val();
        if(videoUrl != ""){
            var html = createVideoHtml(videoUrl);
            $('.videos-list').html(html);

            callVideoPlugin();
        }
    });

    function createVideoHtml(videoUrl){
        var videoId = youtube_parser(videoUrl);
        var placeholderPicUrl = "https://img.youtube.com/vi/"+videoId+"/0.jpg";
        console.log(placeholderPicUrl);

        var html = "";
        html +='<li>'+
                    '<div class="video-ind">'+
                        '<a href="#" data-video-url="https://www.youtube.com/watch?v='+videoId+'" class="youtube"></a>'+
                        '<img src="'+placeholderPicUrl+'" alt="" />'+
                    '</div>'+
                '</li>';

        return html;
    }

    function youtube_parser(url){
		//console.log(url);
        video_id = url.match(/v=(.{11})/)[1];
        return video_id;
	}
});

