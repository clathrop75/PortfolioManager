##DB Creation Instructions

In phpMyAdmin create a new database called "portfolio_manager". Then click on the Import tab and the Choose File button. Select the first .sql file accept the defaults and click the "Go" button. The tables have test data in them and should be imported in the following order:

1. company.sql
2. financials.sql
3. history.sql
4. symbol.sql
5. user.sql
6. watchlist.sql
7. watchlistitems.sql
8. transaction.sql
9. auth.sql 

##Stored Procedures

Run procs.sql (forthcoming) to create the stored procedures in the database. Check the [Stored Procedures.md](Stored Procedures.md) file for specific details on the stored procedures.
