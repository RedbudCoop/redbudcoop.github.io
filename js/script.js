window.addEventListener('mousemove', cursor);
var $win = $(window);
var $cursor = $('#cursor');
var $width = $(window).width();

function everyTick() {
    cursor();
    setTimeout(arguments.callee, 0);
}

function getX(event) //left position
{
    if(!event.pageX)
    {
        return event.clientX;
    }
    else
    {
        return event.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft);
    }
}

function getY(event) //top position
{
    if(event.pageY)
    {
        return event.pageY - (document.body.scrollTop || document.documentElement.scrollTop);
    }
    else
    {
        return event.clientY;
    }
}
function getScroll()
{
}

var offset = 200;
/** 
var i = 0;
const lim = 2;
function cursor() {
    if ($width > 1050) {
        $cursor.css("top", getY(event) - 30 + "px");
        $cursor.css("left", getX(event) - 30 + "px");
        if ($('#images').is(":hover")) {
            $('*').css("cursor", "none");
            if ((getX(event) > ($width * .5))) {
                $('#images').unbind().click(function() {
                    $('#l' + i).css("opacity", "0");
                    if (i == lim) {
                        i = 0;
                    } else {
                        i = i + 1;
                    }
                    $('#l' + i).css("opacity", "1");
                    console.log(i);
                });
            }
            if ((getX(event) <= $width * .5)) {
                $('#images').unbind().click(function() {
                    $('#l' + i).css("opacity", "0");
                    if (i == 0) {
                        i = lim;
                    } else {
                        i = i - 1;
                    }
                    $('#l' + i).css("opacity", "1");
                    console.log(i);
                });
            }
            if (getX(event) > $width * .5) {
                $cursor.attr("src", "img/ui/arrowRight.svg");
            } else {
                $cursor.attr("src", "img/ui/arrowLeft.svg");
            }
        } else {
            $cursor.attr("src", "");
            $('*').css("cursor", "auto");
        }
    }
}*/
