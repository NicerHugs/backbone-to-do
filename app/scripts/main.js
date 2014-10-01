(function(){
    'use strict';

//==============================================================================
                                  //Views
//==============================================================================

var EditItemView = Backbone.View.extend({
    tagName: 'form',
    className: 'edit-item',
    template: _.template($('#edit-item-template').text()),
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
            date: new Date(date)
        };
        //make a new model and give it the data.
        var newToDo = this.collection.add(data);
        this.remove();

    }
});

var ToDoView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    template: _.template($('#todo-item-template').text()),
    initialize: function() {
        $('.container').append(this.el);
        this.$el.append('<button id="addNew" class="hidden">Add new</button>');
        var that = this;
        this.listenTo(this.collection, 'add', function(newModel){
            that.$el.find('#addNew').removeClass('hidden');
            console.log(that.$el.find('button'));
            that.render(newModel.attributes);
        });
    },
    render: function(options) {
        this.$el.append(this.template(options));
    },
    events: {
        '#addNew click' : 'addNew'
    },
    addNew: function() {
        console.log('you want to add new');
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
    editItem.render();
    var todoListView = new ToDoView({collection: todoList});
});

})();
