app.views.NoteListView = Backbone.View.extend({

    tagName:'ul',

    className:'list',

    initialize:function () {
        var self = this;
        this.model.on("reset", this.render, this);
        this.model.on("add", function (note) {
            self.$el.append(new app.views.NoteListItemView({model:note}).render().el);
        });
    },

    render:function () {
        this.$el.empty();
        _.each(this.model.models, function (note) {
            this.$el.append(new app.views.NoteListItemView({model:note}).render().el);
        }, this);
        return this;
    }
});

app.views.NoteListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.model.on("change", this.render, this);
        this.model.on("destroy", this.close, this);
    },

    render:function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});