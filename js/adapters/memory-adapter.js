 


app.adapters.note = (function () {

    console.log("Loading localstorage adapter module");

    var findById = function (id) {

            var deferred = $.Deferred(),
                notes = JSON.parse(window.localStorage.getItem("notes")),
                note = null,
                l = notes.length;

            for (var i = 0; i < l; i++) {
                if (notes[i].id === id) {
                    note = notes[i];
                    break;
                }
            }

            deferred.resolve(note);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                notes = JSON.parse(window.localStorage.getItem("notes")),
                results = notes.filter(function (element) {
                    var fullName = element.firstName + " " + element.lastName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred(),
                notes = JSON.parse(window.localStorage.getItem("notes")),
                results = notes.filter(function (element) {
                    return managerId === element.managerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        };


    // Store sample data in Local Storage
    window.localStorage.setItem("notes", JSON.stringify(
        [
            {"id": 1, "firstName": "abhijit", "lastName": "King", "managerId": 0, "managerName": "", "title": "President and CEO"},
            {"id": 2, "firstName": "bbb", "lastName": "Taylor", "managerId": 1, "managerName": "James King",  "title": "VP of Marketing"},
            ]
    ));

        // The public API
    return {
        findById: findById,
        findByName: findByName,
        findByManager: findByManager
    };


}());