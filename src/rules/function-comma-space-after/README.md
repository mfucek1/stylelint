# function-comma-space-after

Require or disallow a space after the commas of functions.

```css
    a { transform: translate(1, 1) }
/**                           ↑  
 * The space after these commas */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the comma.

The following patterns are considered warnings:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1 ,1) }
```

The following patterns are *not* considered warnings:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate(1 , 1) }
```

### `"never"`

There *must never* be whitespace after the comma.

The following patterns are considered warnings:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate(1 , 1) }
```

The following patterns are *not* considered warnings:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1 ,1) }
```