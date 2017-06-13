var data = [
    {
        "name": "braugust",
        "marchants": "biconi,cordlife,emicakes,energeyes,eyescreen,firefly,jd,naturefarm,shopee,touchelite"
    },
    {
        "name": "brjuly",
        "marchants": "biconi,cordlife,emicakes,energeyes,eyescreen,firefly,jd,naturefarm,shopee,touchelite,travelalliance,xiyan"
    }
	];

var promoData = {
    "biconi": {
        "promo_code": "birthday-treats",
        "date_until": "Valid till 31 December 2017"
    },
    "cordlife": {
        "promo_code": "",
        "date_until": "Valid till 31 August 2017."
    },
    "emicakes": {
        "promo_code": "JUNECORDLIFE",
        "date_until": "Valid till 30 June 2017"
    },
    "energeyes": {
        "promo_code": "CORDLIFE",
        "date_until": "Valid till 31 December 2017"
    },
    "eyescreen": {
        "promo_code": "",
        "date_until": "Valid till 31 December 2017"
    },
    "firefly": {
        "promo_code": "",
        "date_until": "Valid till 31 December 2017"
    },

    "jd": {
        "promo_code": "CLmum617",
        "date_until": "Valid till 30 June 2017."
    },
    "naturefarm": {
        "promo_code": "",
        "date_until": "Valid till 31 December 2017"
    },
    "shopee": {
        "promo_code": "Cordlifenew",
        "promo_code_2": "Cordlife10",
        "date_until": "Valid till 31 December 2017"
    },
    "touchelite": {
        "promo_code": "",
        "date_until": "Valid till 31 December 2017"
    },
    "travelalliance": {
        "promo_code": "",
        "date_until": ""
    },
    "xiyan": {
        "promo_code": "",
        "date_until": "Valid till 31 December 2017"
    },
    "Page not found": {
        "promo_code": "",
        "date_until": ""
    }
};

var currentData = {};

jQuery(document).ready(function () {

    jQuery('.itemTitle').show();

    jQuery.each(data, function (i, val) {
        if (window.location.href.indexOf(val.name) > -1) {
            currentData = val.marchants;
        }
    });

    if (window.location.hash) {
        var hash = window.location.hash.substr(1);
        var not_found = 'Page not found';
        if (currentData.indexOf(hash) > -1) {
            EnableMerchantDetailView(hash);
        } else {
            EnableMerchantDetailView(not_found);
        }
    }

    jQuery('.merchant').each(function (i, obj) {
        var currentMerchant = jQuery(this).data('elementurl');
        if (currentData.indexOf(currentMerchant) > -1) {
            jQuery(this).show().addClass('active');
        }
    });

    jQuery('.merchant .click-btn').click(function (event) {
        event.preventDefault();
        var clickMerchant = jQuery(this).closest("div.merchant ").data('elementurl');
        window.location.hash = clickMerchant;
        EnableMerchantDetailView(clickMerchant);
        scrolltop();
    });

    jQuery('.merchant-body .go-back').click(function (event) {
        event.preventDefault();
        history.pushState("", document.title, window.location.pathname);
        RenderMerchantList(jQuery(this));
        scrolltop();
    });

});

function EnableMerchantDetailView(currentMerchantId) {
    jQuery('.merchant').hide();
    jQuery('.merchant-body').each(function (i, obj) {
        if (jQuery(this).data("elementurl") === currentMerchantId) {
            jQuery(this).show().addClass('active-body');
            jQuery('.merchant-list-view .sub-title').hide();
            jQuery('.itemTitle').text(currentMerchantId);
        }

        jQuery('.merchant-list-view').hide();
        jQuery('.merchant-detail-view').show();
    });

    if (promoData[currentMerchantId].promo_code !== '') {
        jQuery('.promo-code').text(promoData[currentMerchantId].promo_code);
    }
    if (promoData[currentMerchantId].promo_code_2 !== '') {
        jQuery('.promo-code-2').text(promoData[currentMerchantId].promo_code_2);
    }
    if (promoData[currentMerchantId].date_until !== '') {
        jQuery('.valid-date').text(promoData[currentMerchantId].date_until);
    }
}

function RenderMerchantList(backbutton) {
    backbutton.parent().hide();
    jQuery('.merchant-detail-view').hide();
    jQuery('.merchant-list-view').show();
    jQuery('.merchant-list-view .sub-title').show();
    jQuery('.itemTitle').text('Happy Birthday');
    jQuery('.merchant').each(function (i, obj) {
        var currentMerchant = jQuery(this).data('elementurl');
        if (currentData.indexOf(currentMerchant) > -1) {
            jQuery(this).show();
            jQuery(this).addClass('active');
        }
    });
}

function scrolltop() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".itemHeader").offset().top
    }, 200);
}
