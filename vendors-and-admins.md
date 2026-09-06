# Vendors and Admins

Pulled from the live database after deleting `v_373`–`v_450`.

The remaining vendor IDs are `v_451`–`v_466`. Older IDs `v_001`–`v_372` are not in `vendors` or `login`, but historical trades, transactions, and wallets for that older range are still in the database.

## Counts

| Source | Count |
|---|---|
| login (all roles) | 22 |
| vendors table | 17 (16 vendors + `a_001` ADMIN) |
| vendors in login | 16 |
| admins (`admin` + `admin1`) | 4 |
| coordinators | 2 |

## Admins

| ID | Email | Role | Status |
|---|---|---|---|
| A_001 | admindevil@gmail.com | admin | approved |
| A_002 | naviu@gmail.com | admin | approved |
| a_001 | hr.esepaper@gmail.com | admin1 | approved |
| a_002 | admin724@gmail.com | admin1 | approved |

`a_001` also has a row in `vendors` (name ADMIN). That is expected.

## Coordinators

| ID | Name | Email | Status |
|---|---|---|---|
| C_001 | krishna | naviu3@gmail.com | approved |
| C_002 | Aarthi patil | roivun9@gmail.com | approved |

## Vendors

All 16 remaining vendor logins are approved and each has a vendor row and a wallet.

| ID | Name | Status | Coordinator |
|---|---|---|---|
| v_451 | Krishna14 | approved | — |
| v_452 | aarthi | approved | — |
| v_453 | mahamood | approved | — |
| v_454 | Jagan mohan | approved | — |
| v_455 | Sanjeev | approved | — |
| v_456 | Dilip More | approved | — |
| v_457 | POTHANABOINA MAHESH | approved | — |
| v_458 | Kottu Malleswara Rao | approved | — |
| v_459 | MULKALPALLY UDAY KUMAR | approved | — |
| v_460 | Sukka kumari | approved | C_002 |
| v_461 | Nandana sree | approved | C_002 |
| v_462 | Latke Akash | approved | C_002 |
| v_463 | Anigani Reddy | approved | C_002 |
| v_464 | Jason | approved | C_002 |
| v_465 | ASHWINI | approved | C_002 |
| v_466 | Durgam Nagesh | approved | C_002 |

## Integrity after delete

- No leftover `v_373`–`v_450` IDs in any table or text/array column.
- No remaining vendor is missing a login or wallet.
- No remaining vendor refers to a deleted or missing ID.
- No duplicate emails in `vendors` or `login`.
- No negative wallet balances.
- `product_requests` is empty.
- Elite (`wild_products`): 3 products, 0 trades.

Pre-existing orphans from `v_001`–`v_372` (not from this delete):

| Table | Orphan rows | ID range |
|---|---|---|
| trading | 6301 | outside current vendors |
| transaction | 15978 | outside current login |
| wallet | 210 | `v_011`–`v_372` |
| easebuzz_payments | 236 | outside current login |
