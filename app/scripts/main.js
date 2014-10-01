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
    submit: function() {

    }
});

var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'todo-item',
    template: _.template($('#todo-item-template').text())
});

var ListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    template: _.template($('#todo-item-template').text())
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
