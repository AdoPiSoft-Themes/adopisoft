define([
  'knockout',
  'toast',
  'http'
], function(ko, toast, http) {
  var c = {
    id: ko.observable(0),
    username: ko.observable(""),
    credits: ko.observable(0),
    email: ko.observable(""),
    first_name: ko.observable(""),
    is_confirmed: ko.observable(false),
    last_name: ko.observable(""),
    set: function(customer) {
      c.id(customer.id);
      c.username(customer.username)
      c.credits(customer.credits)
      c.email(customer.email)
      c.first_name(customer.first_name)
      c.is_confirmed(customer.is_confirmed)
      c.last_name(customer.last_name)
    },
    fetch: function(cb) {
      http.getCurrentUser(function(err, customer) {
        if (err) return toast.error('Unable to sync customer information.');
        c.set(customer);
        cb(c);
      });
    }
  };
  return c;
});
