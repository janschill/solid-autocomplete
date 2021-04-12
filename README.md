# solid-form-fill

This module allows an HTML form to be populated with data from your Solid pod.

## What Fields Can Be Detected?

Only fields that can be *autocompleted* by the browser are:

- `<input>`
- `<textarea>`
- `<select>`

Additionally it needs

1. Have a name and/or id attribute
2. Be descendants of a <form> element
3. The form to have a submit button

https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

### Valid Fields

HTML autocomplete form inputs:

| ID | Description |
| -  | -           |
| name | “The field expects the value to be a person's full name. Using "name" rather than breaking the name down into its components is generally preferred” |
| lname | Last name |
| email | Email address |

## Features

1. Authenticate to Solid Pod
2. Fetch data from pod
    - From WebID profile document
    - From other resources?
3. Put data into form inputs
    - Check for already filled in data, and ask for what to keep
    - Have checkbox to remember data? Save data in pod and use next time

## Indico Example Fields

- Title
- First Name
- Last Name
- Email Address
- Affiliation
- Institutional Address
- Country
