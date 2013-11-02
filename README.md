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

# API

The collection applies to all objects, including Todo.
GET (collection):
api/Todo  (i.e. contacts without a completed date)
api/Person
api/Contact
api/Donation
api/Interest
api/LOV
api/LOVType

Below applies to all objects except "Todo". Replace {object} with one of the ones above. Replace {id} with the relevant object ID.

POST (adding an item):
api/{object}

GET (single).:
api/{object}/{id}

PUT (update):
api/{object}/{id}

DELETE:
api/{object}/{id}