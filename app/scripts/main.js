(function(){
    'use strict';

//==============================================================================
                                  //Views
//==============================================================================

    var ListView = Backbone.View.extend({
        tagName: 'main',
        template: _.template($('#list-template').text()),

        initialize: function(){
          var that = this;
            this.render();

        },
        events: {'click .todo-item .edit' : 'edit'},
        edit: function(e) {
            e.preventDefault();
            new EditView({model: this.collection.get($(event.target).parent().attr('id'))});
        },

        render: function() {
            $('.container').append(this.el);
            var that = this;
            _.each(this.collection.models, function(model) {
                that.$el.append(that.template(model.attributes));
            });
        }
    });

    var EditView = Backbone.View.extend({
        tagName: 'div',
        className: 'edit-item',
        template: _.template($('#edit-template').text()),
        initialize: function() {
            this.render();
        },
        render: function() {
            console.log(this);
            $('.container').append(this.el);
            this.$el.append(this.template(this.model.attributes));
        }
    });

//==============================================================================
                                  //Model
//==============================================================================

    var ListItem = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            title: 'Todo Item',
            dueDate: moment().endOf('day').fromNow(),
            description: ''
        }
    });

//==============================================================================
                                //Collection
//==============================================================================

    var List = Backbone.Collection.extend({
        model: ListItem,
        url: '//tiny-pizza-server.herokuapp.com/collections/NicerHugs',
        initialize: function(){
            this.fetch().done(function(data) {
                if (data.length === 0) {
                    new EditView();
                }
                else {
                    _.each(data, function(listItem) {
                        new ListItem(listItem);
                    });
                    var listView = new ListView({collection: list});
                }
            });
        }
    });

//==============================================================================
                                  //GLUE
//==============================================================================


    var list = new List();

})();
