# Donor Database


# GUI
Basic user interface for interacting with the database

# Landing page
People -> Add, Search, or Edit Persons or Organizations

Scheduled Contacts -> List of people that have a contact activity without a completion date

Admin ->  Configure lists for interests, fund raisers, outcomes, sources, etc.

## People
  Search bar searches both people and organizations

  **Person Page**
- Relationship: individual or organization
- Information: Title, name, org name, gender ,notes
- Address: person or organization's address
- Interests: list of items defined in the admin
- Contact Info: Email, phone numbers, contact preference
- Contact Activity: an interaction with a person or organziation.
- Donation Activity: Amount, Date, Source

## Scheduled Contacts
  Search bar searches for people or organizations that have an empty completed date for a contact activity.  This can be utilized as a To-Do List.
  Selecting a name routes you to the Person page for that individual

## Admin 
**Pages:**
- Contact Channels: Ex. Phone, Email, In Person, Mail, etc.
- Funraisers (people that are raising funds): John Doe, Jane Done, etc.
- Contact Outcomes: Ex. Donation, Deferred Donation, No Answer, etc.
- Donation Sources: Ex. Annual Auction, Golf Outing, General Donation, etc.
- Interests: Ex. Math, Sports Programs, Volunteering, etc.
- Person Types: Individual, Organization Contact, etc.
- Genders: Male, Female, N/A, Other, etc.
- Phone Types: Home, Cell, Work, etc.
- Contact Preferences: Home Phone, Cell Phone, Mail, Email, etc.

# SQL

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
