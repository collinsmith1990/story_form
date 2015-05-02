//------------------Input------------------------
var Form_Group = function(ele) {
	this.ele = ele;
  this.prompt = ele.children(".prompt");
  this.label = ele.children("label")
  this.input = ele.children("input");
}

Form_Group.prototype.show = function() {
  this.ele.removeClass("hidden");
  if(this.prompt.length) {
    this.label.addClass("hidden");
  	this.prompt.removeClass("hidden");
  }
  this.input.focus();
}

Form_Group.prototype.hide = function() {
  this.ele.addClass("hidden");
}

Form_Group.prototype.index = function() {
  return this.ele.index();
}

Form_Group.prototype.next = function() {
  return this.ele.next();
}

//------------------Form------------------------
var Form = function(form) {
  this.form_groups = $(form + " > .form-group");
  this.summary = $(form + " > .form-group > .summary");
  this.form_group = new Form_Group($(form + " > .form-group:first"));
  this.submit = $(form + " > .submit")
  this.confirmed = false;
}

Form.prototype.show = function() {
  this.summary.removeClass("hidden");
  this.form_groups.removeClass("hidden");
  this.form_groups.children(".prompt").addClass("hidden");
  this.form_groups.children(".control-label").removeClass("hidden");
  this.submit.removeClass("hidden");
}

Form.prototype.hide = function() {
  this.form_groups.addClass("hidden");
  this.submit.addClass("hidden");
}

Form.prototype.next_form_group = function() {
  return new Form_Group(this.form_group.next());
}

Form.prototype.show_next_form_group = function() {
	this.form_group.hide();
  this.form_group = this.next_form_group()
  this.form_group.show();
}

//-----------------Execute----------------------
$(document).ready(function(){
  var form = new Form(".story-form");
  form.hide();
  form.form_group.show();
  $(window).keydown(function(event){
  	if((event.keyCode == 13 || event.keyCode == 9) && form.form_group.index() < form.form_groups.length -1) {
      event.preventDefault();
      form.show_next_form_group();
    }
    else if((event.keyCode == 13 || event.keyCode == 9) && !form.confirmed) {
      event.preventDefault();
      form.show();
      form.confirmed = true;
    }
  });
});
