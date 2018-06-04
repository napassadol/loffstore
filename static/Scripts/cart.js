(function () {
    'use strict';

    
    angular.module('app').factory("shoppingCart", ['$http', '$cookieStore', function ($http, cookies) {


        var cart = {

            itemsCookie: '',
            checkoutParameters: {},

            init: function (itemsCookie) {
                this.itemsCookie = itemsCookie;

                //If cookie not defined then put an empty array
                if (!(cookies.get(this.itemsCookie) instanceof Array)) {
                    cookies.put(this.itemsCookie, []);
                }
            },

            getAll: function () {
                return cookies.get(this.itemsCookie);
            },

            addItem: function (item, quantity) {
                //Set default value for quantity
                if (quantity == undefined) quantity = 1;

                var items = cookies.get(this.itemsCookie);
                var found = false;
                // update quantity for existing item
                for (var i = 0; i < items.length && !found; i++) {
                    var itemInside = items[i];

                    if (itemInside.id == item.id) {
                        found = true;
                        itemInside.quantity = itemInside.quantity + quantity;
                        if (item.quantity <= 0) {
                            this.items.splice(i, 1);
                        }
                    }

                }
                // new item, add now
                if (!found) {
                    items.push({
                        id: item.id,
                        title: item.title,
                        image: item.image,
                        quantity: quantity,
                        price: item.price
                    });
                }

                cookies.put(this.itemsCookie, items);
            },

            getItemByIndex: function (index) {

                var items = cookies.get(this.itemsCookie);

                return items[index];
            },

            updateQuantity: function (index, quantity) {

                var items = cookies.get(this.itemsCookie);

                items[index].quantity = quantity;

                cookies.put(this.itemsCookie, items);
            },

            removeItem: function (index) {

                var items = cookies.get(this.itemsCookie);

                items.splice(index, 1);

                cookies.put(this.itemsCookie, items);
            },
            
            clearItems: function(){

                var items = cookies.get(this.itemsCookie);

                cookies.remove(this.itemsCookie, items);
                cookies.put(this.itemsCookie, []);
            },

            totalItems: function () {

                var quantity = 0;
                var items = cookies.get(this.itemsCookie);
                //if (items.length != null) {

                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        quantity += this.toNumber(item.quantity);
                    }
                //}

                return quantity;
            },

            priceTotal: function () {

                    var total = 0;
                    var items = cookies.get(this.itemsCookie);

                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        total += this.toNumber(item.quantity * item.price);;
                    }

                    return total;
            },

            /********************************************************************
                 CHECKOUT 
            *********************************************************************/

            addCheckoutParameters: function (serviceName, merchantID, options) {
                // check parameters
                if (serviceName != "PayPal") {
                    throw "serviceName must be 'PayPal'.";
                }
                if (merchantID == null) {
                    throw "A merchantID is required in order to checkout.";
                }

                // save parameters
                this.checkoutParameters[serviceName] = new this.checkoutParameters(serviceName, merchantID, options);
            },

            checkout: function (serviceName, clearCart) {
                // select serviceName if we have to
                if (serviceName == null) {
                    var p = this.checkoutParameters[Object.keys(this.checkoutParameters)[0]];
                    serviceName = p.serviceName;
                }

                // sanity
                if (serviceName == null) {
                    throw "Use the 'addCheckoutParameters' method to define at least one checkout service.";
                }

                // go to work
                var parms = this.checkoutParameters[serviceName];
                if (parms == null) {
                    throw "Cannot get checkout parameters for '" + serviceName + "'.";
                }
                switch (parms.serviceName) {
                    case "PayPal":
                        this.checkoutPayPal(parms, clearCart);
                        break;
                    default:
                        throw "Unknown checkout service: " + parms.serviceName;
                }
            },

            checkoutPayPal: function (parms, selectCurrency) {
                // global data
                var data = {
                    cmd: "_cart",
                    business: parms.merchantID,
                    upload: "1",
                    rm: "2",
                    charset: "utf-8"
                };
                
                var currency = selectCurrency.symbolPayPal;
                var rate = selectCurrency.rate;
                var items = cookies.get(this.itemsCookie);

                // item data
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var ctr = i + 1;
                    data["item_name_" + ctr] = item.title;
                    data["quantity_" + ctr] = item.quantity;
                    data["amount_" + ctr] = (item.price * rate).toFixed(2);
                    data["currency_code"] = currency;
                    data["shipping_1"] = 1.75;
                    data["tax_cart"] = ((15 * Math.round(((this.priceTotal() * rate) * 100) / 100)) / 100);
                }

                // build form
                var form = $('<form/></form>');
                //    form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
                form.attr("action", "https://www.sandbox.paypal.com/us/cgi-bin/webscr");
                form.attr("method", "POST");
                form.attr("style", "display:none;");
                this.addFormFields(form, data);
                this.addFormFields(form, parms.options);
                $("body").append(form);

                // submit form
                this.clearItems();
                form.submit();
                form.remove();
            },

            addFormFields: function (form, data) {
                if (data != null) {
                    $.each(data, function (name, value) {
                        if (value != null) {
                            var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                            form.append(input);
                        }
                    });
                }
            },

            checkoutParameters: function (serviceName, merchantID, options) {
                this.serviceName = serviceName;
                this.merchantID = merchantID;
                this.options = options;
            },



        }
        cart.toNumber = function (value) {
            value = value * 1;
            return isNaN(value) ? 0 : value;
        }
        return cart;
    }]);

})();