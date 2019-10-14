$(document).ready(function() {
    $.getJSON( "destinations.json", function( data ) {  
        var itemList = "";         
        $.each( data.destinations, function( key, val ) {
            itemList += "<div class='item' id='" + key + "'><div class='slider'><span class='img-promo-label'>" + val.upto + "</span><div class='next'><i class='fas fa-angle-left'></i></div><div class='prev'><i class='fas fa-angle-right'></i></div><ul>"

            $.each( val.img, function( j, img ){
                itemList += "<li class=img img" + j +"><img src='images/" + img.name +"' alt='" + img.name +"'></li>"
            });

            itemList += "</ul></div><div class='infos-block-wrapper'><div class='infos-block-text'><div class='infos-block-line country'>" + val.country + "<i>&#822;</i><span class='place'>" + val.place + "</span></div><div class='infos-block-line'><div class='label'>" + val.label + "</div><div class='stars-wrapper'>";
     
            ratingRank = val.rating;
            parsedRating =parseInt(ratingRank);
            console.log(parsedRating);

            for(var i=0; i <= parsedRating; i++){
                itemList+= "<i class='star fas fa-star'></i>"
            } 

            itemList+="</div></div><div class='infos-block-line'><ul class='tags-list'>";

            $.each( val.tags, function( i, tags ){
                itemList += "<li class='" + tags.classname + "'>" + tags.label + "</li>";
            });

            itemList += "</ul></div></div><div class='info-block-link'><a href=''><i class='fas fa-angle-right'></i></a></div></div></div>";
        });
        $('.items-wrapper').append( itemList );

        var itemWidth = $('.img').width();
        
        i=0;
        $(".next").on("click", function(){
            i++;
            $(this).parent('.slider').children('ul').animate({
                'left': '-='+itemWidth
            },200,function(){
                if(i == 2){
                    var copy = $(this).parent('.slider').children('ul').first().clone();
                    copy.css({left : 410});
                    copy.appendTo($(this).parent('.slider'));
                }
                if(i > 2){
                    $(this).parent('.slider').children('ul').first().remove();
                    i=0;
                }
            });       
        });

        $(".prev").on("click", function(){
            if(i == 0){
                var copy = $(this).parent('.slider').children('ul').first().clone();
                copy.css({left : -1230});
                copy.prependTo($(this).parent('.slider'));
            }
            else  if(i == -3){
                var copy = $(this).parent('.slider').children('ul').first().clone();
                copy.css({left : -1230});
                copy.prependTo($(this).parent('.slider'));
            }
            else if(i < -3){
                $(this).parent('.slider').children('ul').last().remove();
                i=0;
            }
            $(this).parent('.slider').children('ul').animate({
                'left': '+='+itemWidth
            },200);
            i--;
        });
    });
});
