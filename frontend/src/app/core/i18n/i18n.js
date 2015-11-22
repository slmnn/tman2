(function() {
	'use strict';

	angular.module('frontend.core.i18n', []);

	angular.module('frontend.core.i18n')
	.config(function ($translateProvider) {
	  $translateProvider.preferredLanguage('fi');
	  $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('fi', {
      TITLE: 'Aluesovellus v2.0',

      // General
      EDIT: 'Muokkaa',
      SAVE: 'Tallenna',
      CANCEL: 'Peruuta',
      DELETE: 'Poista',

      ADD: 'Lisää',

      FIRST: 'Ensimmäinen',
      PREVIOUS: 'Edellinen',
      NEXT: 'Seuraava',
      LAST: 'Viimeinen',

      EMAIL: 'Sähköpostiosoite',
      EMAIL_ADDRESS_IS_IN_USE: 'Sähköpostiosoite on käytössä',

      // Profile.html
      USER_NOT_FOUND: 'Käyttäjää ei löydy',
      NEW_PASSWORD: 'Uusi salasana',
      REPEAT_PASSWORD: 'Toista uusi salasana',
      SAVE_PASSWORD: 'Tallenna salasana',
      NEW_PASSWORD_HINT: 'Syötä uusi salasanasi tähän',
      REPEAT_NEW_PASSWORD_HINT: 'Syötä uusi salasanasi uudemman kerran',

      NEW_HOLDER_HISTORY_ADDED_SUCCESS: 'Alueen historiatieto lisätty.',
      HOLDER_HISTORY_UPDATED_SUCCESS_1: 'Alueen ',
      HOLDER_HISTORY_UPDATED_SUCCESS_2: ' historiatieto päivitetty.',
      HOLDER_HISTORY_REMOVED_SUCCESS_2: ' historiatieto poistettu.',

      HOLDER: 'Alueomistaja',
      COVERED: 'Merkitty käydyksi',
      TAKEN: 'Annettu alueomistajalle',
      TYPE: 'Aluetyyppi',
      NUMBER_OF_APARTMENTS: 'Asuntojen lukumäärä',
      ARCHIVED: 'Arkistoitu',
      DESCRIPTION: 'Alueen kuvaus',
      NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED: 'Ei lasketa vuoteen käymättömiä alueita laskettaessa',
      NOT_COUNTED_WHEN_CALCULATING_POORLY_COVERED_2: 'lasketaanko alue mukaan, kun lasketaan yhteen vuoteen käymättömät alueet?',

      DELETING_TERRITORY_HISTORY_ROW: 'Olet poistamassa aluehistoriatietoa.',
      DELETING_TERRITORY: 'Olet poistamassa aluetta ',
      ARE_YOU_SURE: 'Oletko varma?',

      TERRITORY_NOT_FOUND: 'Aluetta ei löydy',
      NO_HOLDER_HISTORY: 'Alueella ei ole historiatietoja.',
      HISTORY: 'Alueen historia',

      START_DATE: 'Alkupäivä',
      END_DATE: 'Loppupäivä',
      ADDITIONAL_INFO: 'Lisätiedot',
      ADDITIONAL_COMMENT: 'Lisää kommentti tähän',

      NO_TERRITORY_ATTRIBUTES: 'Alueella ei ole attribuutteja',
      ADD_ATTRIBUTE: 'Lisää attribuutti',
      ATTRIBUTES: 'Attribuutit',

      NAME: 'Nimi',
      ATTRIBUTE_DESCRIPTION: 'Kuvaus',

      DELETE_BORDER: 'Aseta rajat alkutilaan',
      SAVE_MAP: 'Tallenna kartta',

      TERRITORY : 'Alue',

      TERRITORY_LIST: 'Aluekorttiluettelo',
      MAP: 'Kartta',
      QUICK_VIEW: 'Pikatarkastelu',

      TERRITORY_CODE: 'Aluekoodi',
      INITIAL_HOLDER: 'Ensimmäinen alueomistaja',

      TERRITORIES: 'Alueet',
      CLEAR_SELECTION: 'Poista valinta kaikista',

      OPERATIONS_FOR_SELECTED_TERRITORIES: 'Valitut alueet',

      MARK_COVERED_NO_HOLDER_CHANGE: 'Merkistse alue käydyksi vaihtamatta alueomistajaa',
      CHANGE_HOLDER_MARK_COVERED: 'Vaihda alueomistajaa ja merkitse merkitse alue käydyksi',
      CHANGE_HOLDER_NOT_MARK_COVERED: 'Vaihda alueomistajaa merkitsemättä aluetta käydyksi',

      TERRITORY_HELP_1: 
      'Joissakin tilanteissa saattaa olla tarpeen lisätä alueen käymiseen tai palautukseen liittyvä kommentti. Esimerkiksi, myöhemmin voi olla hyödyllistä tietää että alueelle on levitetty muistonvietto- tai konventtikutsut. Kirjoita kommentti sille varttuun tilaan. Kommentti ei ole pakollinen.',
      TERRITORY_HELP_2:
      'Alueen voi merkitä käydyksi niin että se jää nykyiselle alueomistajalle. Valitse silloin \'Merkitse alue käydyksi vaihtamatta alueomistajaa\' -painike.',
      TERRITORY_HELP_3:
      'Jos haluat vaihtaa alueomistajan, toimi seuraavasti:',
      TERRITORY_LI_1: 'Valitse uusi alueomistaja alasvetovalikosta.',
      TERRITORY_LI_2: 'Vaihda alueomistaja ja merkitse alue käydyksi valitsemalla \'Vaihda alueomistajaa ja merkitse merkitse alue käydyksi\' -painike. Jos et halua että alue merkitään samalla käydyksi, valitse \'Vaihda alueomistajaa merkitsemättä aluetta käydyksi\'-painike.',

      HOLDER_DESCRIPTION: 'Alueomistajaan liittyvät lisätiedot',
      HOLDER_TELEPHONE: 'Alueomistajan puhelinnumero',
      HOLDER_EMAIL: 'Alueomistajan sähköpostiosoite',
      HOLDER_EMAIL_IN_USE: 'Alueomistajan sähköpostiosoite on käytössä',
      HOLDER_NAME: 'Alueomistajan nimi',

      HOLDER_NOT_FOUND: 'Alueomistajaa ei löydy',

    });
    $translateProvider.preferredLanguage('fi');
  });
})();

