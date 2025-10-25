---
pubDate: '2024-10-25'
title: 'Mastering Code Simplicity: Why Deep Functions Like JSON.parse() Make Programming Easier'
description: 'Discover the power of deep functions in simplifying complex tasks. Learn how functions like JSON.parse() encapsulate complexity behind simple interfaces, making coding more efficient and maintainable.'
tags:
  ['Software Engineering', 'Javascript', 'Software Design']
---

I love the concept of "deep functions" by Dr. Ousterhout. It's a profound insight on the way we code.

At its core, this approach is all about simplifying complex tasks through well-designed functions.

Instead of useless debates about functions length, we should focus on creating functions that are simple to use and understand by hiding maximum complexity behind the simplest interface possible.

## What Makes a Function "Deep"?

A deep function isn’t necessarily a short or simple function. Instead, it’s one that handles as much complexity as possible through a clean, minimal interface. This isn’t about whether your function is a single, large chunk or broken into multiple pieces—it’s about creating a function that simplifies the job for everyone using it.

### Consider `JSON.parse()`

`JSON.parse()` is a perfect example. Its interface is straightforward: you pass a JSON string, and it returns a parsed object. But behind the scenes, it’s doing some heavy lifting:

- Validates the JSON format
- Handles nested structures
- Manages data types
- Provides meaningful errors

Imagine if, instead of one `JSON.parse()` function, we had to call multiple smaller functions for each of these tasks. The simplicity of `JSON.parse()`’s interface allows it to be incredibly powerful and efficient for users.

### Create Simple Interfaces

When writing functions that others will use, prioritize a clean, simple interface while managing huge complexity. This lets other developers do more with less effort.

## Splitting Logic for Clarity

You might wonder: Should I ignore function length entirely?

No, but the length of a function isn’t the primary concern. Instead, focus on creating functions that are easy to use and understand.

If your function is easy to read and understand, then there's no problem, you can leave it as is. But if it's hard to understand, then splitting it into smaller functions can help.

Splitting a function into smaller pieces forces you to encapsulate different parts of the logic and make it more explicit. You'll need to clearly define what variables are used where and how they interact.

The end goal is to make your code easier to understand and maintain, not to reduce the number of lines in a function.

**However, these helper functions should remain hidden within the deep function’s logic** to keep the interface simple. Their purpose is to organize the internal complexity in a way that’s more understandable to future you or other developers.

### Example: `parseUserData(userData)`

Let’s say we have a function `parseUserData(userData)` that takes in raw user data and returns a parsed object. This function performs multiple tasks:

1. Validating the `userData` input format.
2. Parsing name, email, and address fields.
3. Handling any nested data (e.g., parsing additional profile data).
4. Providing meaningful error messages if parsing fails.

A good approach is to break down these steps into smaller internal helper functions, while `parseUserData` itself remains the only function exposed. 

For example:

```javascript
function parseUserData(userData) {
  validateInput(userData);
  const name = parseName(userData);
  const email = parseEmail(userData);
  const address = parseAddress(userData);

  return { name, email, address };
}

function validateInput(data) { /* internal validation logic */ }
function parseName(data) { /* extract and format name */ }
function parseEmail(data) { /* extract and format email */ }
function parseAddress(data) { /* extract and format address */ }
```

This structure keeps `parseUserData` as a simple, clean interface while managing the complexity of each parsing step internally. The main interface (`parseUserData`) remains simple and accessible, handling all parsing tasks under the hood without exposing the internal sub-functions.

Deep functions are a reminder that simplicity on the outside often means complexity is well-managed on the inside. By following this approach, you’ll make your code easier to work with and maintain over time.

*P.S.: You can also have read of my [Insights on “A Philosophy of Software Design” by John Ousterhout](./insights-on-a-philosophy-of-software-design-by-john-ousterhout)*