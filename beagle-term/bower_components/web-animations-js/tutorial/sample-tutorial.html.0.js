
     "use strict";
     
    var myDisplay = new TryItDisplay(document.getElementById("myDisplayDiv"));
    myDisplay.setDefaultHtml("<div id='a' class='test'></div>");
    var css = ".test {" +
        "\n" + "background-color: red;" +
        "\n" + "border-radius: 10px;" +
        "\n" + "width: 100px;" +
        "\n" + "height: 50px;" +
        "\n" + "top: 50px;" +
        "\n" + "left: 0px;" +
        "\n" + "position: absolute;" +
        "\n" + "}";
    myDisplay.setDefaultCss(css);
    myDisplay.setDefaultAnimationEndTime(2);
    myDisplay.addCheck("document.getElementById('a')", "{'left': '0px'}", 0);
    myDisplay.addCheck("document.getElementById('a')", "{'left': '300px'}", 2);
  