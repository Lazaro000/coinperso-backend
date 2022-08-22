# Backend of CoinPerso App

Backend of CoinPerso App

## User stories

- The user can register on the platform with his name, email, password.
- User can login with email and password.
- The user can upload/modify their profile picture.

## Entities

## User

- id: Unique identifier
  -UUID V4
  - Unique per user
- name : Name and surname of the user
  - Between 2 and 30 characters
  - Can contain uppercase, lowercase, spaces and hyphens
  - Cannot begin or end with a space or hyphen
  - Cannot contain double spaces or double hyphens
  - No word can begin or end with spaces
- email: [RFC 5322] (https://www.ietf.org/rfc/rfc5322.txt)
- key code:
  - Between 8 and 30 characters
  - Cannot contain spaces
- profile picture:
  - Photo URL
- portfolios:
  - Array of ids of the portolios created by the user
