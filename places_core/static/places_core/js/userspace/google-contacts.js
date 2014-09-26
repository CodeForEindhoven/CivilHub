//
// google-contacts.js
// ==================
//
// Aplikacja pozwalająca wysyłać zaproszenia na adresy z listy kontaktów Gmail
// uwierzytelnionego użytkownika.

define(['jquery',
        'underscore',
        'backbone',
        'js/utils/utils',
        'js/ui/ui',
        'bootstrap',
        'includes/google/client'],

function ($, _, Bootstrap, utils, ui) {
    
    "use strict";
    
    var ContactModel = Backbone.Model.extend({});
    
    var ContactView = Backbone.View.extend({
        
        tagName: 'li',
        
        className: 'contact-entry',
        
        template: _.template($('#google-contacts-entry-tpl').html()),
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    var ContactsCollection = Backbone.Collection.extend({
        
        model: ContactModel
    });
    
    var ContactListView = Backbone.View.extend({
        
        tagName: 'div',
        
        className: 'modal fade',
        
        template: _.template($('#google-contacts-tpl').html()),
        
        events: {
            'click #check-all-button': 'toggleAll'
        },
        
        initialize: function (options) {
            this.$el.html(this.template({})).modal({show:false});
            this.$form = this.$el.find('form:first');
            this.$submit = this.$el.find('.submit-btn:first');
            this.collection = new ContactsCollection(options.contacts);
            this.render();
            
            this.$form.on('submit', function (e) {
                e.preventDefault();
                this.submit();
                this.close();
            }.bind(this));
            
            this.$submit.on('click', function (e) {
                e.preventDefault();
                this.$form.trigger('submit');
            }.bind(this));
        },
        
        render: function () {
            this.collection.each(function (item) {
                this.renderItem(item);
            }, this);
        },
        
        renderItem: function (item) {
            var contact = new ContactView({
                model: item
            });
            $(contact.render().el).appendTo(this.$el.find('#contact-list'));
        },
        
        submit: function () {
            
            var addresses = [];
            
            this.$form.find('[type=checkbox]').each(function () {
                if ($(this).is(':checked')) {
                    addresses.push($(this).val());
                }
            });
            
            $.post('/civmail/', {
                'emails': addresses.join(','),
                'link': 'https://civilhub.org',
                'name': 'Civilhub.org',
                'csrfmiddlewaretoken': utils.getCookie('csrftoken')
            }, function (resp) {
                ui.message.success(gettext("All messages sent successfully"));
            });
        },
        
        toggleAll: function () {
            this.$form.find('[type=checkbox]').each(function () {
                $(this).trigger('click');
            });
        },
        
        open: function () {
            this.$el.modal('show');
        },
        
        close: function () {
            this.$el.modal('hide');
        }
    });
    
    return ContactListView;
    
});