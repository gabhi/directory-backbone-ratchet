app.views.NoteAddView = Backbone.View.extend({

  
    showErrors: function (note, errors) {
      this.$el.find('.error').removeClass('error');
      this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
      // highlight the fields with errors
      _.each(_.keys(errors), _.bind(function (key) {
        this.$el.find('*[name=' + key + ']').parent().addClass('error');
      }, this));
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .button-prev": "back",
        "click .save": "save"
    },

    back: function(event) {
        window.history.back();
        return false;
    },
    save: function(event) {
        alert("1"); 
         note =new app.models.NoteModel();
         alert("2"); 
         note.set({
        title: this.$el.find('input[name=title]').val(),
        author: this.$el.find('input[name=author]').val(),
        description: this.$el.find('textarea[name=description]').val(),
        // just setting random number for id would set as primary key from server
        id: Math.floor(Math.random() * 100) + 1
      }); 
         alert("3"); 
        app.adapters.note.saveNote(note);
        alert("dne"); 
        return false;
    }
});
