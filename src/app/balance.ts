export const Year = {
  months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export interface YearRange {
  youngestYear : number;
  oldestYear : number;
};

export interface MonthlyBalance {
  netBalance : number;
  cumulativeBalance : number;
};

export interface YearlyBalance {
  year: number;
  monthlyBalances : MonthlyBalance[];
};
