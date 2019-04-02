var myPageNum = 1;
var EndPageNum = 0;
var mytochenNum = 0;
var myCodeGame = 0;
var thisgame = [];

$(document).ready(function () {
    $("#myCode").hide();
    $("#pageOrgin").hide();
    $("#QuizPage").hide();
    //מסך פתיחה
    $("#student").click(function () {
        $("#navOp").fadeOut(500);
        myCodSowe();

    });
    $("#techer").click(function () {
        $("#navOp").fadeOut(500);

    });
    //קוד
    $("#start").click(function () {
        var valCode = $("#codeGame").val();
        //טעינת הקודים
        $.getJSON("json.json", function (json) {
            var myRusalt = false;
            var myObject = json.allApp.games._gameNum;
            for (i = 0; i < myObject; i++) {
                if (valCode == json.allApp.games.game[i]._code) {
                    valCode = json.allApp.games.game[i]._id;

                    var NumPage = (json.allApp.games.game[i].page).length;
                    for (z = 0; z < NumPage; z++) {
                        var ThisPage = [];
                        var q1 = [];
                        var q2 = [];
                        var q3 = [];
                        ThisPage[0] = json.allApp.games.game[i].page[z]._id;
                        ThisPage[1] = json.allApp.games.game[i].page[z]._quiz;
                        ThisPage[2] = json.allApp.games.game[i].page[z].tochen._tape;
                        ThisPage[3] = json.allApp.games.game[i].page[z].tochen.__text;
                        if (ThisPage[1] == "true") {
                            q1[0] = json.allApp.games.game[i].page[z].myseala[0]._tayp;
                            q1[1] = json.allApp.games.game[i].page[z].myseala[0].__text;
                            q1[2] = json.allApp.games.game[i].page[z].myseala[0]._linke;
                            ThisPage[4] = q1;
                            q2[0] = json.allApp.games.game[i].page[z].myseala[1]._tayp;
                            q2[1] = json.allApp.games.game[i].page[z].myseala[1].__text;
                            q2[2] = json.allApp.games.game[i].page[z].myseala[1]._linke;
                            ThisPage[5] = q2;
                            if (3 == (json.allApp.games.game[i].page[z].myseala).length) {
                                q3[0] = json.allApp.games.game[i].page[z].myseala[2]._tayp;
                                q3[1] = json.allApp.games.game[i].page[z].myseala[2].__text;
                                q3[2] = json.allApp.games.game[i].page[z].myseala[2]._linke;
                                ThisPage[6] = q3;
                            }
                            EndPageNum = (json.allApp.games.game[i].page).length;
                        }


                        thisgame[z] = ThisPage;

                        if (z == (NumPage - 1)) {
                            //תחילת המשחק
                            StartGame();
                        }
                    }




                    myRusalt = true;
                } else if (i == myObject - 1 && myRusalt == false) {
                    alert("טעות בקוד");
                }
            }
        });
    });
});
function myCodSowe() {
    var time = setInterval(function () {
        $("#myCode").fadeIn(500);
        clearInterval(time)
    }, 500);
}
//אתר של המורה
function myTecherSite() {

}

//המשך למשחק
function StartGame() {
    //לבנות את הממשק
    $("#myCode").fadeOut(500);
    nextPage(myPageNum)

    //myCodeGame = valCode-1;
    //nextPage(myPageNum);
}
//דף הבא
function nextPage(num) {

    var time = setInterval(function () {
        $("#pageOrgin").fadeIn(500);
        clearInterval(time)
    }, 500);

    //var thisimage1 = "images/" + thisgame[num - 1][3];
    //$("#Myimage").attr("src", thisimage1);
    var Shela = false;
    while (Shela == false) {
        if (thisgame[num - 1][1] == "true") {
            Shela = true;
            if (myPageNum >= EndPageNum) {
                End();
            } else {
                Myquize(num)
            }
        } else {
            var img = $('<img />', {
                src: "images/" + thisgame[num - 1][3],
                class: 'col-12 imageOnePage',
                height: '100%'
            });
            img.appendTo($('#imagepage'));
            num++;
            myPageNum = num;
        }
    }
}
//לשאלה
function Myquize(num) {
    myPageNum = num;

    $("#QutisionBut").click(function () {
        $("#pageOrgin").fadeOut(500);
        if (myPageNum >= EndPageNum) {
            End();

        } else {
            var time = setInterval(function () {
                $("#QuizPage").fadeIn(500);
                clearInterval(time)
            }, 500);
        }
    });

    var img = $('<img />', {
        src: "images/" + thisgame[num - 1][3],
        class: 'col-12 imageTwoPage',
        height: '100%'
    });
    img.appendTo($('#imageQuiz'));

    $("#Q1").html(thisgame[num - 1][4][1]);
    $("#Q1").click(function () {
        myPageNum = thisgame[num - 1][4][2]
        mavar();
    });

    $("#Q2").html(thisgame[num - 1][5][1]);
    $("#Q2").click(function () {
        myPageNum = thisgame[num - 1][5][2]
        mavar();
    });

    if (thisgame[num - 1].length == 7) {
        $("#Q3").html(thisgame[num - 1][6][1]);
        $("#Q3").click(function () {
            myPageNum = thisgame[num - 1][6][2]
            mavar();
        });
    } else {
        $("#Q3").hide();
    }

}

//תכנת מעבר
function mavar() {
    $("#QuizPage").fadeOut(500);

    $(".imageOnePage").remove();
    $(".imageTwoPage").remove();


    if (myPageNum > EndPageNum) {
        End();
    } else {
        nextPage(myPageNum);
    }
}

//סוף
function End() {
    alert("סוף");
}