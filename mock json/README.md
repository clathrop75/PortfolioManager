#JSON Mock Files

Purpose: The JSON mock files are samples of JSON that will be returned from various RESTful API calls.

##portfolio.json
This is what will be returned when a user navigates to the portfolio.php page. This page will only require a read operation, so this is the only json feed that is associated with this page. The lastTradePriceOnly, shares, costBasis, marketValue and gain values are currency but the source data is a float. As such, they will need to be properly formatted as a currency - "1234.5" needs to be formatted in the UI as "$1,234.50". Additionally, the return value is a percentage. It will have already been calculated but a percent sign will need to be appended to the value.

##transaction.json
This is what will initially be returned when a user navigates to the transaction.php page. This page will require full CRUD operations but this file is only what is returned for the initial read operation. Additional, mock files for the other operations will be added in the future.

##user-success.json
This is what is returned when a user successfully logs in or after a user successfully registers. Upon success the user should be automatically taken to the portfolio.php page.

##user-failure.json
This is what is returned when a user fails the logon.

##watchList.json
This is what is returned when a full list of a user's watch lists are required for loading into whatever UI structure will handle switching between lists (e.g. a drop down box, left nav bar, etc.)

##watchListItems.json
This is what is returned when a watch list is selected by the user. It contatins the details of every stock in that particular watch list. All numerical values in the JSON are currency, but the source data is a float. Similarly to the portfolio.json the data will need to be properly formatted as a currency.
