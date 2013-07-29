app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                         "home",
        "notes/index":              "home",
        "notes/:id":                "noteDetails",
        "note/new":                "newNote",
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));

    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.homeView.$el);
    },
    noteDetails: function (id) {
        var note = new app.models.NoteModel({id: id});
        note.fetch({
            success: function (data) {
                
                app.slider.slidePage(new app.views.NoteView({model: data}).render().$el);
            }
        });
    },

    newNote: function () {
        var note = new app.models.NoteModel();
           

          app.noteAddView = new app.views.NoteAddView();
            app.noteAddView.render();
            app.slider.slidePage(app.noteAddView.$el);
    }

     

});