var sigInst, canvas, $GP;
var config = {};

function GetQueryStringParams(sParam, defaultVal) {
    var sPageURL = "" + window.location;
    if (sPageURL.indexOf("?") == -1) return defaultVal;
    sPageURL = sPageURL.substr(sPageURL.indexOf("?") + 1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) return sParameterName[1];
    }
    return defaultVal;
}

jQuery.getJSON(GetQueryStringParams("config", "config.json"), function(data) {
    config = data;
    $(document).ready(setupGUI(config));
});

function initSigma(config) {
    var drawProps = { defaultEdgeType: "arrow", labelThreshold: 10, fontStyle: "bold" };
    var graphProps = { minNodeSize: 4, maxNodeSize: 22, minEdgeSize: 1.0, maxEdgeSize: 20.0 };
    var a = sigma.init(document.getElementById("sigma-canvas")).drawingProperties(drawProps).graphProperties(graphProps);
    sigInst = a;

    dataReady = function() {
        a.iterEdges(function(e) {
            e.type = "arrow"; // Pfeil erzwingen
            var w = parseFloat(e.size) || 1.0;
            e.size = (w > 1.5) ? Math.pow(w, 2.3) * 3.5 : w * 1.5;
        });
        a.draw();
        configSigmaElements(config);
    }
    a.parseJson(config.data, dataReady);
}

// ... (Hier folgen deine bestehenden Funktionen setupGUI, configSigmaElements, Search, Cluster, nodeNormal, nodeActive, showCluster wie gewohnt)
// Da der Rest deiner Datei funktional war, kannst du den unteren Teil deiner alten main.js einfach hier wieder anhängen.
