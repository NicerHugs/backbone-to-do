(function(){
    'use strict';

//==============================================================================
                                  //Views
//==============================================================================
var EditItemView = Backbone.View.extend({
    tagName: 'form',
    className: 'edit-item',
    template: _.template($('#edit-item-template').text()),
    initialize: function() {
        this.render();},
    render: function(){
        $('.container').append(this.el);
        this.$el.append(this.template({}));
    },
    events: {
        'submit' : 'submit'
    },
    submit: function(e) {
        e.preventDefault();
        var date = this.$el.find(':nth-child(3) input').val() || new Date();
        var data = {
            title: this.$el.find(':first-child input').val() || '',
            description: this.$el.find(':nth-child(2) input').val() || '',
            date: new Date(date)
        };
        var newItem = this.collection.add(new ToDoModel(data));
        this.remove();
    }
});

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo-item',
    template: _.template($('#todo-item-template').text()),
    initialize: function() {
        this.render();
        this.listenTo(this.model, 'destroy', function() {
            this.remove();
        });
    },
    render: function() {
        $('.container').append(this.el);
        this.$el.append(this.template(this.model.attributes));
    },
    events: {
        'click .delete'               : 'deleteItem',
        'click input[type="checkbox"]' : 'markComplete'
    },
    deleteItem: function() {
        this.model.destroy();
    },
    markComplete: function() {
        this.$el.toggleClass('complete');
    }
});

var ListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    initialize: function() {
        $('.container').append(this.el);
        this.$el.append('<button id="addNew" class="hidden">Add new</button>');
        this.$el.append('<button id="bulkDelete" class="hidden">Delete Completed</button>');
        this.listenTo(this.collection, 'add', function(newModel){
            this.$el.find('#addNew').removeClass('hidden');
            this.$el.find('#bulkDelete').removeClass('hidden');
            new ItemView({model: newModel});
        });
    },
    events: {
        'click #addNew': 'addNew'
    },
    addNew: function() {
        new EditItemView({collection: this.collection});
    }
});

//==============================================================================
                                  //Model
//==============================================================================

var ToDoModel = Backbone.Model.extend({

});

//==============================================================================
                                //Collection
//==============================================================================

var ToDoCollection = Backbone.Collection.extend({
    model: ToDoModel,
});

//==============================================================================
                                  //GLUE
//==============================================================================

  $(document).ready(function(){
      var todoList = new ToDoCollection();
      var editItem = new EditItemView({collection: todoList});
      var todoListView = new ListView({collection: todoList});
  });

})();
