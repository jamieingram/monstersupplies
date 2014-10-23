/**
 * Module to ajaxify all add to cart forms on the page.
 *
 * Copyright (c) 2014 Caroline Schnapp (11heavens.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
Shopify.AjaxifyCart = (function($) {
  
  var _config = {
    addedToCartBtnLabel: 'Thank you!',
    addingToCartBtnLabel: 'Adding...',
    soldOutBtnLabel: 'Sold Out',
    howLongTillBtnReturnsToNormal: 1000, // in milliseconds.
    cartCountSelector: '.cart, #cart-count a:first, #gocart p a, #cart .checkout em, .item-count, header #cartCount',
    cartTotalSelector: '.basket-total-amount',
    feedbackPosition: 'nextButton', // 'aboveForm' for top of add to cart form, 'belowForm' for below the add to cart form, and 'nextButton' for next to add to cart button.
    shopifyAjaxAddURL: '/cart/add.js',
    shopifyAjaxUpdateURL: '/cart/update.js',
    shopifyAjaxCartURL: '/cart.js'
  };

  var _showFeedback = function(success, html, addToCartForm) {
    $('.ajaxified-cart-feedback').remove();
    var feedback = '<p class="ajaxified-cart-feedback ' + success + '">' + html + '</p>';
    switch (_config.feedbackPosition) {
      case 'aboveForm':
        addToCartForm.before(feedback);
        break;
      case 'belowForm':
        addToCartForm.after(feedback);
        break;
      case 'nextButton':
      default:
        // In New Standard theme:
        // addToCartForm.find('#product-add').append(feedback);
        addToCartForm.find('input[type="submit"]').after(feedback);
        break;   
    }
    // If you use animate.css
    // $('.ajaxified-cart-feedback').addClass('animated bounceInDown');
    $('.ajaxified-cart-feedback').slideDown();
  };

  var _init = function() {
    $(document).ready(function() { 

      $('form[action="/cart/add"]').submit(function(e) {
        e.preventDefault();
        var addToCartForm = $(this);

        // Disable add to cart button.
        var addToCartBtn = addToCartForm.find('input[type="submit"]');
        addToCartBtn.attr('data-label', addToCartBtn.val());
        addToCartBtn.val(_config.addingToCartBtnLabel).addClass('disabled').attr('disabled', 'disabled');

        // Add to cart.
        $.ajax({
          url: _config.shopifyAjaxAddURL,
          dataType: 'json',
          type: 'post',
          data: addToCartForm.serialize(),
          success: function(itemData) {
            // Re-enable add to cart button.
            addToCartBtn.addClass('inverted').val(_config.addedToCartBtnLabel);
            _showFeedback('success','<i class="fa fa-check"></i> Added to casket <a href="/cart">View casket</a> or <a href="/collections/all">continue shopping</a>.',addToCartForm);
            window.setTimeout(function(){
              addToCartBtn.removeAttr('disabled').removeClass('disabled').removeClass('inverted').val(addToCartBtn.attr('data-label'));
            }, _config.howLongTillBtnReturnsToNormal);

            // Update cart count and show cart link.
            _updateBasketValues();        
          }, 

          error: function(XMLHttpRequest) {
            var response = eval('(' + XMLHttpRequest.responseText + ')');
            response = response.description;
            if (response.slice(0,4) === 'All ') {
              _showFeedback('error', response.replace('All 1 ', 'All '), addToCartForm);
              addToCartBtn.removeAttr('disabled').val(_config.soldOutBtnLabel).attr('disabled','disabled');
            } else {
              _showFeedback('error', '<i class="fa fa-warning"></i> ' + response, addToCartForm);
              addToCartBtn.removeAttr('disabled').removeClass('disabled').removeClass('inverted').val(addToCartBtn.attr('data-label'));
            }
          }
        });   
        return false;    
      });
    });
  };

  var _updateBasketValues = function () {
    $.getJSON(_config.shopifyAjaxCartURL, function(cart) {

      if (_config.cartCountSelector && $(_config.cartCountSelector).size()) {
        var value = $(_config.cartCountSelector).html() || '0';
        $(_config.cartCountSelector).html(value.replace(/[0-9]+/,cart.item_count));
      }

      if (_config.cartTotalSelector && $(_config.cartTotalSelector).size()) {

        if (typeof Currency !== 'undefined' && typeof Currency.moneyFormats !== 'undefined') {
          var newCurrency = '';
        
          if ($('[name="currencies"]').size()) {
            newCurrency = $('[name="currencies"]').val();
          } else if ($('#currencies span.selected').size()) {
            newCurrency = $('#currencies span.selected').attr('data-currency');
          }

          if (newCurrency) {
            $(_config.cartTotalSelector).html('<span class=money>' + Shopify.formatMoney(Currency.convert(cart.total_price, "{{ shop.currency }}", newCurrency), Currency.money_format[newCurrency]) + '</span>');
          } else {
            $(_config.cartTotalSelector).html(Shopify.formatMoney(cart.total_price, "{{ shop.money_format }}"));
          }

        } else {
          $(_config.cartTotalSelector).html(Shopify.formatMoney(cart.total_price, "{{ shop.money_format }}"));
        }
      };
    });
  }

  var _addToBasket = function(product_id, quantity) {
    $.ajax({
      url: _config.shopifyAjaxAddURL,
      dataType: 'json',
      type: 'post',
      data: {id: product_id, quantity: quantity },
      success: function(itemData) {
        _updateBasketValues();
      }, 

      error: function(XMLHttpRequest) {

      }
    });
  }

  var _updateBasket = function(product_id, quantity) {
    $.ajax({
      url: _config.shopifyAjaxUpdateURL,
      dataType: 'json',
      type: 'post',
      data: {id: product_id, quantity: quantity },
      success: function(itemData) {
        console.log(itemData);
        _updateBasketValues();
      }, 

      error: function(XMLHttpRequest) {

      }
    });
  }

  return {
    init: function(params) {
        // Configuration
        params = params || {};
        // Merging with defaults.
        $.extend(_config, params);
        // Action
        $(function() {
          _init();
        });
    },

    getConfig: function() {
      return _config;
    },

    addToBasket: function (product_id, quantity) {
      return _addToBasket(product_id, quantity);
    },

    updateBasket: function (product_id, quantity) {
      return _updateBasket(product_id, quantity);
    }
  }  
})(jQuery);