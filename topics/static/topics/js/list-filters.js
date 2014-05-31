//
// Sortowanie listy dyskusji
// -----------------------------------------------------------------------------
//
(function ($) {
    "use strict";
    //
    // Funkcja konwertuje zapytanie GET na JSON.
    // -----------------------------------------
    // @returns Obj
    function urlToJSON (url) {
        var urlItems = [],
            jsonData = {},
            i, itm;
            
        url = url.split('?')[1] || false;
        
        if (!url) {
            return {}; // Brak danych GET.
        }
        
        url = url.split('&');
        
        for (i = 0; i < url.length; i++) {
            itm = url[i].split('=');
            jsonData[itm[0]] = itm[1];
        }
        
        return jsonData;
    }
    //
    // Funkcja serializuje proste obiekty do URL.
    // ------------------------------------------
    // @param {JSON Obj} json Obiekt do konwersji
    function JSONtoUrl(json) {
        var pairs = _.pairs(json),
            urlitems = [],
            i;
        
        for (i = 0; i < pairs.length; i++) {
            urlitems.push(pairs[i].join('='));
        }
        
        return '?' + urlitems.join('&');
    }
    //
    // Wczytanie wybranych opcji.
    // ---------------------------
    // Sprawdzenie aktywnych elementów (klikniętych linków)
    // w celu "pozbierania" opcji wyszukiwarki.
    // 
    function getListOptions () {
        var $sel = $('.forum-list-control'),
            opts = {},
            optType = null,
            optValue = null;
        
        $sel.each(function () {
            var $this = $(this);
            
            if ($this.hasClass('active')) {
                optType = $this.attr('data-control');
                optValue = $this.attr('data-target');
                opts[optType] = optValue;
            }
        });
        
        return opts;
    }
    //
    // Wczytanie opcji startowych.
    // ---------------------------
    // Parsowanie aktywnego url-a w celu ustawienia aktywnych
    // elementów w oparciu o wybrane opcje.
    //
    function loadListOptions() {
        var $sel = $('.forum-list-control'),
            data = urlToJSON(document.location.href);

        if (_.isEmpty(data)) {
            return true;
        }

        $sel.each(function () {
            var key = $(this).attr('data-control'),
                val = $(this).attr('data-target'),
                selected = data[key];
            
            if (val === selected) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    //
    // Obsługa kliknięć.
    // -----------------
    // Po kliknięciu na aktywny link w formularzu ta funkcja
    // zbiera wybrane opcje i tworzy URL do przekierowania.
    $('.forum-list-control').bind('click', function (evt) {
        var selectedItem = $(this).attr('data-control'),
            options = {},
            url     = '';
            
        evt.preventDefault();
        
        $('.active[data-control="' + selectedItem + '"]')
            .removeClass('active');
        $(this).addClass('active');
        
        options = getListOptions();
        url = $('#discussion-target-url').val() + JSONtoUrl(options);
        
        document.location.href = url;
    });
    // Wczytanie początkowych ustawień.
    loadListOptions();
})(jQuery);