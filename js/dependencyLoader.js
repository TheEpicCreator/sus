let dependencyUrls = []
const maxLoadTimesTrys = 4;

//Main Libraries
dependencyUrls.push("https://www.googletagmanager.com/gtag/js?id=UA-118283086-6", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
//Ads Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/adsController.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/cpmstar.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/moneyController.js");
//Firebase/Google Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/googleAnalytics.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/Firebase/firebase-init.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/Firebase/firebase-login.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/Firebase/firebase-config.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/Firebase/firebase-firestore.js")
//Game Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/unityUrls.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/unityGame.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/mobileRedirect.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/fullscreen.js")
//etc. Libraries
dependencyUrls.push("https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/windowResize.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/blockManager.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/macUserAgent.js", "https://cdn.jsdelivr.net/gh/TheEpicCreator/sus@latest/js/visibilityChangeListener.js")

dynamicallyLoadScripts();

async function dynamicallyLoadScripts() {
    for (let i = 0; i < dependencyUrls.length; i++) {
        let url = dependencyUrls[i];
        let script = document.createElement("script");
        script.src = url;

        document.head.appendChild(script);
    }

    let trys = 0;
    while (window.loadedUrls === undefined || window.firebaseLoaded === undefined || window.adsLoaded === undefined
    || window.gameScriptLoaded === undefined || window.configInit === undefined || window.adsControllerLoaded === undefined) {
        await sleep(500)
        trys++;
        if(trys >= maxLoadTimesTrys) {
            break;
        }
    }

    isGameLoaded();
    initAds();
    loadGame();
    initFirebaseLibraries();
    fixMacUserAgent();
}

function loadGame() {
    let gameLoader = document.createElement("script")
    gameLoader.src = getGameLoaderUrl();
    gameLoader.id = "unity-loader"
    gameLoader.onload = function () {
        showGame();
    };

    let gameLoadDiv = document.getElementById("unity-loader-div");
    gameLoadDiv.innerHTML = "";
    gameLoadDiv.appendChild(gameLoader);
}

async function isGameLoaded() {
    await sleep(5000);
    if(window.gameStartLoading === undefined) {
        location.reload();
    }
}

function initFirebaseLibraries() {
    initializeFireBase();
    initRemoteConfig();
}

function onUnityReady() {
    //checkAdBlock();
    sendConfig();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
