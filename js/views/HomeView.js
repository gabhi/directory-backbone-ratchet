app.views.HomeView = Backbone.View.extend({

    initialize: function () {
        this.searchResults = new app.models.NoteCollection();
        this.searchResults.fetch({reset: true, data: {name: ''}});
        this.searchresultsView = new app.views.NoteListView({model: this.searchResults});
    },

    render: function () {
        this.$el.html(this.template());
        $('.content', this.el).append(this.searchresultsView.render().el);
        return this;
    },

    events: {
        "keyup .search-key":    "search",
        "keypress .search-key": "onkeypress"
    },

    search: function (event) {
        var key = $('.search-key').val();
        this.searchResults.fetch({reset: true, data: {name: key}});
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    }

});