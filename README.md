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
