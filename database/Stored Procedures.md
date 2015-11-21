#Description of Stored Procedures
Following is a listing of the Stored Procedures in the database, what their purpose is and guidelines on usage.

##User Stored Procedures
###spInsertUser
This proc inserts a new user into the database after they have registered. It takes the FirstName, LastName, Email, Username and HashedPassword as parameters in that order. It returns the Id of the inserted row if successful or 0 if unsuccessful. Two common cases for a 0 return would be if either the Username or Email already exists in the table. However, technically, in order to meet the assignment's requirements these two values should be validated as unique in the UI (using AJAX) prior to attempting to insert the new user.

###spValidateUser
This proc validates the user's credentials during the logon. It takes the Username and HashedPassword as parameters in the order. If successful it returns the Username, FirstName and LastName. If unsuccessful, it returns a 0.

###spGetUserExistsByUsername
This proc is used during the user registration process to check whether or not the supplied Username is already in use. If the Username already exists it returns a 1, if not, it returns a 0.

###spGetUserExistsByEmail
This proc is used during the user registration process to check whether or not the supplied Email is already in use. If the Email already exists it returns a 1, if not, it returns a 0.

##WatchList Stored Procedures
###spInsertWatchList

###spUpdateWatchList

###spDeleteWatchList

###spGetWatchListById

###spGetWatchLists

##WatchListItems Stored Procedures
###spInsertWatchListItem

###spUpdateWatchListItem

###spDeleteWatchListItem

###spGetWatchListItemsById

###spGetWatchListItems

##Transaction Stored Procedures
###spInsertTransaction

###spUpdateTransaction

###spDeleteTransaction

###spGetTransactionById

###spGetTransactionsPaged

###spGetTransactionsSummaryBySymbol

##Company Stored Procedures
###spGetCompanyById

###spGetCompanyBySymbol

## Company History Stored Procedures
###spGetHistoryRange

## Company Financials Stored Procedures
###spGetFinacialsLatest
