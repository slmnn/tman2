/**
 * Simple service to return configuration for generic list. This service contains only
 * getter methods that all list views uses in Boilerplate frontend application.
 *
 * So generally you change these getter methods and changes are affected to all list
 * views on application.
 *
 * @todo text translations
 */
(function() {
  'use strict';

  angular.module('frontend.core.services')
    .factory('ListConfig', [
      '_',
      function factory(_) {
        /**
         * List title item configuration.
         *
         * @type  {{
         *          territory: *[],
         *          holder: *[]
         *        }}
         */
        var titleItems = {
          territory: [
            {
              title: 'Koodi',
              column: 'territoryCode',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Tyyppi',
              column: 'type',
              class: 'col-xs-1 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyty',
              column: 'covered',
              class: 'col-xs-1',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Omistajalle',
              column: 'taken',
              class: 'col-xs-1 mobile-hide',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Attribuutit',
              column: false,
              class: 'col-xs-1 mobile-hide',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Kuvaus',
              column: 'description',
              class: 'col-xs-3 mobile-hide',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Kommentti',
              column: false,
              class: 'col-xs-1 mobile-hide',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Omistaja',
              column: false,
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Valinta',
              column: false,
              class: 'text-center',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            }
          ],
          holder: [
            {
              title: 'Nimi',
              column: 'name',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sähköposti',
              column: 'email',
              class: 'col-xs-3 mobile-hide',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Puhelin',
              column: 'telephone',
              class: 'col-xs-2 mobile-hide',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Kuvaus',
              column: false,
              class: 'col-xs-4 text-left',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Alueita',
              column: false,
              class: 'col-xs-1 text-left',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            }
          ],
          userlogin: [
            {
              title: 'IP-address',
              column: 'ip',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Browser',
              column: 'browser',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Operating System',
              column: 'os',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Username',
              column: false,
              class: 'col-xs-2',
              searchable: false,
              sortable: false,
              inSearch: false,
              inTitle: true
            },
            {
              title: 'Login time',
              column: 'createdAt',
              class: 'col-xs-4',
              searchable: false,
              sortable: true,
              inSearch: false,
              inTitle: true
            }
          ],
          user: [
            {
              title: 'Etunimi',
              column: 'firstName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sukunimi',
              column: 'lastName',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Käyttäjänimi',
              column: 'username',
              class: 'col-xs-1',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Sähköposti',
              column: 'email',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Tyyppi',
              column: 'admin',
              class: 'col-xs-2',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            },
            {
              title: 'Luotu',
              column: 'createdAt',
              class: 'col-xs-3',
              searchable: true,
              sortable: true,
              inSearch: true,
              inTitle: true
            }
          ]
        };

        return {
          /**
           * Getter method for list default settings.
           *
           * @returns {{
           *            itemCount:            Number,
           *            items:                Array,
           *            itemsPerPage:         Number,
           *            itemsPerPageOptions:  Array,
           *            currentPage:          Number,
           *            where:                {},
           *            loading:              Boolean,
           *            loaded:               Boolean
           *          }}
           */
          getConfig: function getConfig() {
            return {
              itemCount: 0,
              items: [],
              itemsPerPage: 10,
              itemsPerPageOptions: [10, 25, 50, 100],
              currentPage: 1,
              where: {},
              loading: true,
              loaded: false
            };
          },

          /**
           * Getter method for lists title items. These are defined in the 'titleItems'
           * variable.
           *
           * @param   {String}    model   Name of the model
           *
           * @returns {Array}
           */
          getTitleItems: function getTitleItems(model) {
            return _.isUndefined(titleItems[model]) ? [] : titleItems[model];
          }
        };
      }
    ])
  ;
}());
