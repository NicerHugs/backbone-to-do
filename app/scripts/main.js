(function(){
    'use strict';

//==============================================================================
                                  //Views
//==============================================================================

var EditItemView = Backbone.View.extend({
    tagName: 'form',
    className: 'edit-item',
    template: _.template($('#edit-item-template').text()),
    initialize: function(){
        this.render();
    },
    render: function() {
        $('.container').append(this.el);
        this.$el.append(this.template({}));
    },
    events: {
        'submit' : 'submit'
    },
    submit: function(e) {
        e.preventDefault();
        //get the data from the form and store it in a var
        var that = this;
        var date = this.$el.find(':nth-child(3) input').val() || new Date();
        var data = {
            title: this.$el.find(':first-child input').val() || '',
            description: this.$el.find(':nth-child(2) input').val() || '',
            date: new Date(date),
            id: Date.now()
        };
        //make a new model and give it the data.
        var newToDo = this.collection.add(data);
        this.remove();

    }
});

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo-item',
    template: _.template($('#edit-item-template').text()),
    initialize: function(){
        this.render();
    },
    render: function() {
        $('.todo-list').append(this.template(this.model));
    }
});

var ToDoView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    template: _.template($('#todo-item-template').text()),
    initialize: function() {
        $('.container').append(this.el);
        this.$el.append('<button id="addNew" class="hidden">Add new</button>');
        this.$el.append('<button id="bulkDelete" class="hidden">Delete Completed</button>');
        this.listenTo(this.collection, 'add', function(newModel){
            this.$el.find('#addNew').removeClass('hidden');
            this.render(newModel.attributes);
        });
        this.listenTo(this.collection, 'remove', function(deletedModel){
            var id = '#' + deletedModel.id;
            $(id).remove();
        });
    },
    render: function(options) {
        this.$el.append(this.template(options));
    },
    events: {
        'click #addNew'                : 'addNew',
        'click .delete'                : 'deleteItem',
        'click input[type="checkbox"]' : 'markComplete'
    },
    addNew: function(e) {
        e.preventDefault();
        var newItem = new EditItemView({collection: this.collection});
    },
    deleteItem: function(e) {
        e.preventDefault();
        var id = $(event.target).parent().attr('id');
        this.collection.remove(id);
    },
    markComplete: function(e) {
        $(event.target).parent().toggleClass('complete');

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
    model: ToDoModel
});

//==============================================================================
                                  //GLUE
//==============================================================================

$(document).ready(function(){
    var todoList = new ToDoCollection;
    var editItem = new EditItemView({collection: todoList});
    var todoListView = new ToDoView({collection: todoList});
});

})();
