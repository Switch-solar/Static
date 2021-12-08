(function($) {
  'use strict';
  $(function() {
    var base_url = window.location.origin;
    $("#show").avgrund({
      height: 500,
      holderClass: "custom",
      showClose: true,
      showCloseText: "x",
      onBlurContainer: ".container-scroller",
      template:
        '<h4 class="card-title">Select Amount</h4>' +
        '<p class="card-description">Recharge your meter fast and easy.</p>' +
        '<form class="forms-sample">' +
        '<div class="form-group">' +
        "<tbody>" +
        '<td><a type="button" class="btn btn btn-primary btn-rounded btn-fw" href="' + base_url + '/top-up/1000/">1,0000</a></td>' +
        '<td><a type="button" class="btn btn btn-primary btn-rounded btn-fw" href="' + base_url + '/top-up/3000/">3,000</a></td>' +
        '<td><a type="button" class="btn btn btn-primary btn-rounded btn-fw" href="' + base_url + '/top-up/5000/">5,000</a></td>' +
        "</tbody>" +
        "</div>" +
        " <tbody>" +
        '<td><a type="button" class="btn btn btn-primary btn-rounded btn-fw" href="' + base_url + '/top-up/10000/">10,000</a></td>' +
        '<td><a type="button" class="btn btn btn-primary btn-rounded btn-fw" href="' + base_url + '/top-up/25000/">25,000</a></td>' +
        " </tbody>" +
        "</form>" +
        '<div class="text-center mt-4">' +
        // '<a href="#" target="_blank" class="btn btn-success me-2">Great!</a>' +
        '<a href="#" target="_blank" class="btn btn-primary">Cancel</a>' +
        "</div>",
    });
  })
})(jQuery);