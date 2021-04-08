// Holds the colors for each color-blindess type
var profiles = {
    'inverted': {
        'text': 'white',
        'background': 'black',

        'headers': 'white',
        'links': 'red'
    },

    'red-green': {
        'text': 'white',
        'background': '#184890',

        'headers': 'white',
        'links': '#ffd800'
    },

    'blue-yellow': {
        'text': 'white',
        'background': '#BF692C',

        'headers': '#01D4B4',
        'links': 'yellow'
    }
};



function change_colors(profile) {

    // Execute this code from the tab to change the site's colors
    chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
            code: `
                document.body.style.color = '${profiles[profile].text}'
                document.body.style.background = '${profiles[profile].background}'


                var all = document.all;
                for(var i = 0; i < all.length; i++) {
                    all[i].style.background = '${profiles[profile].background}';
                    all[i].style.color = '${profiles[profile].text}';
                }


                // var divs = document.getElementsByTagName('div');
                // for(var i = 0; i < divs.length; i++) {
                //     divs[i].style.border = 'thin solid ${profiles[profile].text}';
                // }


                var headers = document.getElementsByTagName('h1');
                for(var i = 0; i < headers.length; i++) {
                    headers[i].style.color = '${profiles[profile].headers}';
                }

                var links = document.getElementsByTagName('a');
                for(var i = 0; i < links.length; i++) {
                    links[i].style.color = '${profiles[profile].links}';
                }
                `
        });
    });
}



document.getElementById('red-green').addEventListener('click', () => change_colors('red-green'));
document.getElementById('blue-yellow').addEventListener('click', () => change_colors('blue-yellow'));
document.getElementById('invert').addEventListener('click', () => change_colors('inverted'));