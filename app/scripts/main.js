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
            date: new Date(date),
            id: Date.now()
        };
        var newItem = new ToDoModel(data);
        this.remove();
    }
});

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo-item',
    template: _.template($('#todo-item-template').text()),
    render: function(){
        $('.todo-list').append(this.template(this.model));
    }
});

var ListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    initialize: function() {
        $('.container').append(this.el);
        this.listenTo(this.collection, 'add', console.log("hi"));
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
    var todoListView = new ListView({collection: todoList});
});

})();
