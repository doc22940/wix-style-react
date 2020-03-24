### `<Card.Header/>`
A card header component

#### Props

| propName | propType | defaultValue | isRequired | description|
| -------- | -------- | ------------ | ---------- | --------------------------- |
| `title` | node | | false | a placeholder for text title or any custom node |
| `subtitle` | node |  | false | a placeholder for text subtitle or any custom node |
| `suffix` | node |  | false | a render slot for action nodes, for example buttons |

### `<Card.Subheader/>`
A card sub-header component

#### Props

| propName | propType | defaultValue | isRequired | description|
| -------- | -------- | ------------ | ---------- | --------------------------- |
| `title` | node | |  | a placeholder for text title or any custom node |
| `suffix` | node |  | false | a render slot for action nodes, for example buttons |

### `<Card.Content/>`
A card content component

#### Props

| propName | propType | defaultValue | isRequired | description|
| -------- | -------- | ------------ | ---------- | --------------------------- |
| `children` | node | | false | any custom content to display |
| `size` | oneOf [`'medium'`, `'large'`] | | false | controls the appearance of the element |

### `<Card.Divider/>`

A simple divider
