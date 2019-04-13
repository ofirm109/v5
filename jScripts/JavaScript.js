var myPageNum = 1;
var EndPageNum = 0;
var mytochenNum = 0;
var myCodeGame = 0;
var thisgame = [];
var myName = "";
var Alldiscripsion = [];
var myDiscripsion = [];
var countDiscripsion = 0;
var disNum = 0;

$(document).ready(function () {
    $("#myCode").hide();
    $("#pageOrgin").hide();
    $("#QuizPage").hide();
    $("#TheEnd").hide();
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
                        Alldiscripsion[z] = json.allApp.games.game[i].page[z].discripsion;
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
                            myName = $("#NameStudent").val();
                            if (myName == "") {
                                alert("רשום את שימך")
                            } else {
                                //תחילת המשחק
                                StartGame();
                            }
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
                myPageNum = num;
            } else {
                Myquize(num)
            }
        } else {
            var img = $('<img />', {
                src: "images/" + thisgame[num - 1][3],
                class: ' imageOnePage',
                height: '100%',
                width: '100%'
            });
            img.appendTo($('#imagepage'));
            if (disNum < num) {
                
                disNum = num;
                dis(num, false);
            }
            num++;
            myPageNum = num;

        }
    }
}
//לשאלה
function Myquize(num) {
    myPageNum = num;
    if (disNum < num) {
        
        disNum = num;
        dis(num, true);
    }
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
        class: ' imageTwoPage',
        height: '100%',
        width: '100%'
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
    $('body').css('background-color', '#FFF6E6');
    var time = setInterval(function () {
        $("#TheEnd").fadeIn(500);
        clearInterval(time)
    }, 500);
    var fuulName = "היי "+myName+" ,"
    $("#myName").html(fuulName);
    var myMasovEnd = "";
    for (i = 0; i < myDiscripsion.length; i++) {
        if (myDiscripsion[i][0] != "") {
            myMasovEnd += myDiscripsion[i][0] + "@";
        }
        if (myDiscripsion[i][1] == true) {
            myMasovEnd += "@";
        }

    }
    myTxt = myMasovEnd;
    typeWriter();
    //$("#Masov").html(myMasovEnd);

}
//תיאור
function dis(numDis, sela) {
    numDis--;
    var disZmani = [];
    disZmani[0] = Alldiscripsion[numDis];
    disZmani[1] = sela;
    myDiscripsion[countDiscripsion] = disZmani
    countDiscripsion++;
}

var Tik = 0;
var speed = 150;
var myTxt = "";
function typeWriter() {
    
    if (Tik < myTxt.length) {
        if (myTxt.charAt(Tik) == "@") {
            var bdika = document.getElementById("Masov").innerHTML;
            $("#Masov").html(bdika + "<br/>");
            Tik++;
        } else {
            document.getElementById("Masov").innerHTML += myTxt.charAt(Tik);
            Tik++;
        }
        setTimeout(typeWriter, speed);
    }
}