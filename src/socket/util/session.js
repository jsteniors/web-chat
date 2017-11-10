var Storage = function () {
    console.log('constru');
    this.addToItem = function (key, value) {
        var item = JSON.parse(sessionStorage.getItem(key));
        if (item) {
            console.log('add');
            item.push(value);
            sessionStorage.setItem(key, JSON.stringify(item));
        } else {
            console.log('crie');
            sessionStorage.setItem(key, JSON.stringify([value]));
        }
    }

    this.getJsonItem = function (key) {
        return JSON.parse(window.localStorage.getItem(key));
    }

    this.setJsonItem = function(key, value){
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

