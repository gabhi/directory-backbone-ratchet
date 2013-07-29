

app.models.NoteModel = Backbone.Model.extend({
    // you can set any defaults you would like here
    defaults: {
      title: "",
      description: "",
      author: ""
    },
  sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.note.findById(parseInt(this.id)).done(function (data) {
                options.success(data);
            });
        }
    },
    validate: function (attrs) {
      var errors = {};
      if (attrs.title === '') {
        errors.title = "Hey! Give this thing a title.";
      }
      if (attrs.description === '') {
        errors.description = "You gotta write a description, duh!";
      }
      if (attrs.author === '') {
        errors.author = "Put your name in dumb dumb...";
      }

      if (!_.isEmpty(errors)) {
        return errors;
      }
    }
  });

app.models.NoteCollection = Backbone.Collection.extend({

    model: app.models.NoteModel,
sync: function(method, model, options) {
        if (method === "read") {
            app.adapters.note.findByName(options.data.name).done(function (data) {
                options.success(data);
            });
        }
    }
});


