Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        return Tasks.find({}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
       return Session.get("hideCompleted");
    },
    incompleteCount: function () {
       return Tasks.find({checked: {$ne: true}}).count();
    }  

  });

  Template.body.events({
    "submit .new-task": function (event) {
    
      var text = event.target.text.value;

      if (text.trim()) {
 
         Tasks.insert({
           text: text,
           createdAt: new Date()
         });     
 
      }

      event.target.text.value = "";

      return false;
    }
  });

  Template.task.events({
     "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
     },
     "click .toggle-checked": function () {
     
     Tasks.update(this._id, {$set: {checked: !this.checked}});
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
