let bouton1 = document.getElementById("boutonFilms");
let boutonCar = document.getElementById("boutonCar");
let header = document.getElementById("header");
let i = 0;
let imax = 0;

let storyButton1 = document.getElementById("storyButton1");
let storyButton2 = document.getElementById("storyButton2");
let storyButton3 = document.getElementById("storyButton3");

let story1 = document.getElementById('story1');
let story2 = document.getElementById('story2');
let story3 = document.getElementById('story3');
let story = 1;

bouton1.addEventListener("click", GetMoviesList);
boutonCar.addEventListener("click", displayCar);

storyButton1.addEventListener("click", () => {
    if (story == 2) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story1.style.opacity = opacity;
                story2.style.opacity = 1 - opacity;
            }, i);
        }
    } else if (story == 3) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story1.style.opacity = opacity;
                story3.style.opacity = 1 - opacity;
            }, i);
        }
    }
    story = 1;
    storyButton1.style.backgroundColor = "transparent";
    storyButton2.style.backgroundColor = "#bd92e2";
    storyButton3.style.backgroundColor = "#bd92e2";
});

storyButton2.addEventListener("click", () => {
    if (story == 1) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story1.style.opacity = 1 - opacity;
                story2.style.opacity = opacity;
            }, i);
        }
    } else if (story == 3) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story2.style.opacity = opacity;
                story3.style.opacity = 1 - opacity;
            }, i);
        }
    }
    story = 2;
    storyButton1.style.backgroundColor = "#bd92e2";
    storyButton2.style.backgroundColor = "transparent";
    storyButton3.style.backgroundColor = "#bd92e2";
});

storyButton3.addEventListener("click", () => {
    if (story == 1) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story1.style.opacity = 1 - opacity;
                story3.style.opacity = opacity;
            }, i);
        }
    } else if (story == 2) {
        let opacity = 0;
        for (let i = 0; i < 1000; i += 10) {
            setTimeout(() => {
                opacity += 0.01;
                story2.style.opacity = 1 - opacity;
                story3.style.opacity = opacity;
            }, i);
        }
    }
    story = 3;
    storyButton1.style.backgroundColor = "#bd92e2";
    storyButton2.style.backgroundColor = "#bd92e2";
    storyButton3.style.backgroundColor = "transparent";
})

function GetMoviesList() {
    if (imax == 0) {
        $.ajax({
            url: "https://ghibliapi.herokuapp.com/films",
            type: "GET",
            datatype: "json",
            success: function (data) {
                console.log(data);
                imax = data.length - 1;

                for (const element of data) {

                    let movieCard = document.createElement("div");
                    movieCard.id = "movieCardFilms";
                    let carroussel = document.getElementById("Image");
                    carroussel.appendChild(movieCard);

                    let image = document.createElement("img");
                    image.id = "movieCardImage";
                    movieCard.appendChild(image);

                    let original_title1 = document.createElement("h1");
                    original_title1.id = "original_title";
                    movieCard.appendChild(original_title1);

                    let date = document.createElement("h2");
                    date.id = "release_date";
                    movieCard.appendChild(date);

                    image.src = element.image;
                    original_title1.innerHTML = element.original_title;
                    date.innerHTML = element.release_date;
                }

            }
        })
    }
    let cadre = document.getElementById("cadre");
    cadre.style.display = "block";
    let histoire = document.getElementById("Histoire");
    histoire.style.display = "none";
    header.style.display = "flex";
    let carroussel = document.getElementById("carJq");
    carroussel.style.display = "none";

}


$(".gauche").hide();

function move(direction) {
    if (direction == "left") {

        if (i > 0) {
            $('#Image').animate({
                left: "+=100%"
            });
            i--;
            $(".droite").show();
        }
        if (i === 0) {
            $(".gauche").hide();
        }
    } else if (direction == "right") {
        if (i < imax) {
            $('#Image').animate({
                left: "-=100%"
            });
            i++;
            $(".gauche").show();
        }
        if (i === imax) {
            $(".droite").hide();
        }
    }
}

function move2(taille) {
    $('#Image').animate({
        left: "=" + taille
    })
}

function txt() {
    let cadre = document.getElementById("cadre");
    cadre.style.display = "none";
    let histoire = document.getElementById("Histoire");
    histoire.style.display = "flex";
    header.style.display = "flex";
    let carroussel = document.getElementById("carJq");
    carroussel.style.display = "none";
}

$numJq = $('.imgJq').length;

$evenJq = $numJq / 2;
$oddJq = ($numJq + 1) / 2;

if ($numJq % 2 == 0) {
    $('.imgJq:nth-child(' + $evenJq + ')').addClass('active');
    $('.imgJq:nth-child(' + $evenJq + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $evenJq + ')').next().addClass('next');
} else {
    $('.imgJq:nth-child(' + $oddJq + ')').addClass('active');
    $('.imgJq:nth-child(' + $oddJq + ')').prev().addClass('prev');
    $('.imgJq:nth-child(' + $oddJq + ')').next().addClass('next');
}

$('.imgJq').click(function() {

    $slide = $('.active').width() + 40;

    if ($(this).hasClass('next')) {
        $('#carFigJq').stop(false, true).animate({ left: '-=' + $slide });
    }
    else if ($(this).hasClass('prev')) {
        $('#carFigJq').stop(false, true).animate({ left: '+=' + $slide });
    }

    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    $(this).addClass('active');
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
});

function displayCar() {
    let cadre = document.getElementById("cadre");
    cadre.style.display = "none";
    let histoire = document.getElementById("Histoire");
    histoire.style.display = "none";
    let carroussel = document.getElementById("carJq");
    carroussel.style.display = "block";
    header.style.display = "block";
}