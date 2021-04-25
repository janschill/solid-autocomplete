# solid-autocomplete

This module allows an HTML form to be populated with data from your Solid pod. As of now only data from a WebId profile document is supported. This is also part of a proof of concept programming, which aims at working with an existing software system called [Inidico](https://github.com/indico/indico).

## How Does the Library Work?

An input field is generated which will be used to fetch the WebId profile document. It also requires a base element, ideally the form with the input fields is given here. It then grabs all `<input>` and `textarea>` fields.
Then the fields are mapped to available data in the fetched document and automatically filled in, if the inputs do not have any values. If the inputs have values prior to automatic filling, a DOM element is rendered which gives the user the option to either accept the new data or reject it and keep the filled in data.

## How Are the Inputs Mapped to the Fetched Data?

HTML input fields carry a few attributes which can be used to identify what type of data it is describing.

### Autocomplete

The first attribute, which is also used by the browser to suggest possible data to the user for the inputs is the `autocomplete` attribute. The HTML specification defines exactly what values need to be used for what type of data [[Source]](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
If the `autocomplete` attribute exists on the inputs it is checked for any useful values and then looked up in the [dictionary](#dictionary) to mapped against the fetched data.

### ID

TODO: explain

### Name

TODO: explain

### Label

If all the above mentioned approaches do not yield good results the last option is the label tag. The label tag should exist per HTML specification for every input. It can be easily found by following the `id` attribute of the input, as every `label` should also have a `for` attribute, which links the `label` and `input` together.

```html
<label for="my-text-input">My text input</label>
<input id="my-text-input" type="text">
```

The value or `textContent` of a label describes what the user should provide in the linked `input` field. Unfortunately, to reason about the content of the label is not trivial, as it does not follow any conventions and can be in any language.

## Dictionary

The dictionary is a simple key value store that maps possible entries for the above mentioned attributes against the VCARD vocabulary.

## Preview

An example form showing conflicting data.

![](./assets/example.png)

## What Fields Can Be Detected?

Only fields that can be *autocompleted* by the browser are:

- `<input>`
- `<textarea>`
- `<select>`

Additionally it needs

1. Have a name and/or id attribute
2. Be descendants of a <form> element
3. The form to have a submit button

### Valid Fields

HTML autocomplete form inputs:

| ID | Description |
| -  | -           |
| name | “The field expects the value to be a person's full name. Using "name" rather than breaking the name down into its components is generally preferred” |
| email | Email address |

*For a complete list see link [[2]](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).*

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

## Useful Links

- [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
- [2] https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
