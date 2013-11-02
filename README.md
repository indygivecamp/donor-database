donor-database
==============

Create a minimal record for a person

```
INSERT INTO Person (
  PersonType,
  FirstName,
  LastName,
  Gender
)
VALUES (
  '12',
  'Paul',
  'Grenier',
  '15'
);
```

Create a minimal record for an organization

```
INSERT INTO Person (
  PersonType,
  FirstName,
  LastName,
  Gender,
  OrgName
)
VALUES (
  '13',
  'Bob',
  'Super',
  '16',
  'Super Co.'
);
```
