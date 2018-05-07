/* eslint-disable */

$(document).ready(function(){
  
  if ($('#city-autocomplete').length) {
    
    var cities = [
      {
        value: "volgograd",
        label: "Волгоград",
        count: "111",
        category: "В"
      },
      {
        value: "moscow",
        label: "Москва",
        count: "333",
        category: "М"
      },
      {
        value: "nizhnovgorod",
        label: "Нижний Новгород",
        count: "191",
        category: "Н"
      },
      {
        value: "novosibirsk",
        label: "Новосибирск",
        count: "999",
        category: "Н"
      },
      {
        value: "rostov",
        label: "Ростов-на-Дону",
        count: "99",
        category: "Р"
      },
      {
        value: "samara",
        label: "Самара",
        count: "101",
        category: "С"
      },
      {
        value: "saintp",
        label: "Санкт-Петербург",
        count: "222",
        category: "С"
      }
    ];
  
    var cityComplete = $('#city-autocomplete').autocomplete({
      appendTo: "#city-dropdown",
      source: function(request,response){
        var re=$.ui.autocomplete.escapeRegex(request.term);
        var matcher=new RegExp("^"+re,"i");
        results=$.grep(cities,function(item){
          return matcher.test(item.label);
        });
        if(!results.length){
          results=[{value: 'notfound', label: 'Такого города нет в каталоге', count: '', category: ''}];
        }
        response(results);
      },
      focus: function( event, ui ) {
        if (ui.item.value !== 'notfound') {
          var $this = $(this);
          var label = ui.item.label;
          $this.val(label);
          return false;
        }
      },
      select: function( event, ui ) {
        var $this = $(this);
        if (ui.item.value === 'notfound') {
          $this.val('');
        } else {
          var label = ui.item.label;
          $this.val(label);
          $this.parents('.header__dropdown').prev().click().find('span').text(label);
        }
        return false;
      }
    });
    
    cityComplete.autocomplete('widget').menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    
    cityComplete.autocomplete('instance')._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.label + "<span class='ui-autocomplete-count'>" + item.count + "</span></div>" )
        .appendTo( ul );
    };
    
    cityComplete.autocomplete('instance')._renderMenu = function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
      });
    };
    
    $(document).on('click', '.header__select', function() {
      if ($(this).hasClass('is-active')) {
        cityComplete.autocomplete( 'search', '' );
      }
    });
    
    $(document).on('click', '.header__dropdown-close', function(e) {
      e.preventDefault();
      $(this).parent().prev().click();
    });
    
    var desktop, newdesktop;
    
    if ($(window).width() > globalOptions.sizes.md) {
      desktop = true;
    } else {
      desktop = false;
    }
    
    $(window).on('resize', function(){
      if ($(window).width() > globalOptions.sizes.md) {
        newdesktop = true;
      } else {
        newdesktop = false;
      }
      
      if (newdesktop !== desktop) {
        if (newdesktop === true) {
          cityComplete.autocomplete( 'option', 'minLength', 1 );
          desktop = true;
        } else {
          cityComplete.autocomplete( 'option', 'minLength', 0 );
          desktop = false;
        }
      }
    });
    
  }
});

/* eslint-enable */
