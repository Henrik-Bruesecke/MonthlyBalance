# AccountBalance
## Objective

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

This project was created in order to implement a coding task for a job application. The requirements were:
1. Customer wants to see their monthly balance and cumulative balance
2. There is an API that is developed by another team. The API provides bank transactions which include amount transferred and date
3. Things to consider
    * In this task there is no need to develop the API developed by another team
    * How to design your application so that it is testable?
    * If the application must be deployed to a server in remote location, how would you do it?

## Usage
The application created will display the monthly cumulative balance and net balance in the customer's account for the date range of transactions the API
returns. The application displays a table of years and months with the account's net balance or cumulative balance. Using a toggle button on the top
right of the screen the user can switch between viewing the cumulative or net balance.

## JSON returned by API
The format of JSON returned by the API is defined in the file src/app/transaction.ts:
```
export interface Transaction {
  timestamp : number;
  amount : number;
};
```

The timestamp is an epoch timestamp in seconds when the transaction took place. The amount is a signed number containing the amount of the transaction.
The sign (+ or -) determines whether the money went in or out of the account.

The transactions returned by the API need not be ordered chronologically.

## Processing of received JSON

1. The transactions are iterated over and the following is done:
    - The application determines the youngest and oldest transaction (to later determine what range of years should be shown in the UI)
    - The application populates a hash table of the transactions where the key is a date of the format "yyyy/mm", e.g. "2023/07"
        - Any transactions with the same key (i.e. that occurred in the same year and month) are simply added together
2. The application iterates from the youngest year to the oldest year and does the following:
    - Populates an array with the net balances for each year and month
        - It takes the net balance from the hash table constructed in step 1 if present.
        - If no entry is found in the hash table then a net balance of €0.00 is assumed for this month
3. The application iterates over the array constructed in step 2 from oldest year to youngest year and does the following:
    - Populates the cumulative value for each month and year by adding the cumulative value from the previous month to the net balance of the month
      currently being processed
    - A starting cumulative balance of 0.0 is assumed

## JSON server mock API

Run `json-server --watch db.json` to mock the API. The mock API is served at `http://localhost:3000/transactions`. Edit the file db.json to change what
the mocked API will return.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
