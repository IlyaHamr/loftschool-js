/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    var promise = new Promise (function (resolved, reject) {

        setTimeout(function () {
            resolved();
        }, 1000)
    });

    return promise;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    var promise = new Promise (function (resolved, reject) {

        var req = new XMLHttpRequest();
        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        req.send();

        req.addEventListener('load', function () {
            var arr = req.response;
            arr = JSON.parse(arr);
            
            function comparison(obj1, obj2) {
                if( obj1.name < obj2.name ) return -1;
                if( obj1.name > obj2.name ) return 1;
            };

            arr = arr.sort(comparison);
            resolved(arr);
            
        });

    });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
