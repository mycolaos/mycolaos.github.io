---
pubDate: '2024-10-18'
title: 'The Unexpected Complexity of Migrating a Next.js Header to Server Components'
description: 'Exploring the challenges and solutions in refactoring a Next.js Header component from client-side to server-side rendering.'
tags:
  ['Software Engineering', 'Javascript', 'Next.js', 'Server Side Rendering', 'Routing']
---

I recently began the process of refactoring my Next.js App Router project. It was initially built as a client-side app using the Page Router, but now I want to simplify the architecture and improve performance by migrating more to server-side components. To my surprise, something as seemingly simple as the `Header` component has proven more difficult than expected.

## The Problem: The `Header` Component

The Header component serves a small but important role in the app:

- It's rendered in the root layout.
- By default, it shows the website logo.
- When the URL includes a game slug (e.g., `/[game]`), it fetches the game's title from the database and displays it. This works for all nested paths, such as `/[game]/[variant]/[step]`.

Currently, the `Header` is a client component, and all the URL reading and data fetching happen on the client. My goal is to refactor this to a server component, but that's easier said than done.

<br />
<br />

| Default header with logo | Header with game title |
| :----------------------: | :--------------------: |
| ![BGRH Home page with default logo header](images/bgrh-home-header.png) | ![BGRH Game page with game titile header](images/bgrh-game-header.png) |

## The Challenges I Faced:

### 1. No Access to Request URL in Server Components.

I can't access the request URL directly from a server component, which complicates dynamic rendering based on the current route.

### 2. Page Params Don't Work for Layouts.

The `Header` component needs to be present across all pages, so its natural place is in the root layout. However, the root layout only has access to the dynamic parameters of its specific segment. For example, even if the request is for `/[game]`, the root layout doesn't receive information about deeper segments like `/[game]/[variant]`.

This means that since `page.tsx` is only rendered for its own segment, placing the `Header` in `/[game]/page.tsx` wouldn't render the header for any of its child routes. As a result, each `page.tsx` would have to include its own `Header`, which defeats the purpose of layouts and makes managing components much more difficult.

### 3. Route Groups Seemed Promising, But...

I considered using Route Groups and creating separate layouts for different routes. However, this came with several drawbacks:

- I'd have to duplicate the root layout across multiple files, which leads to unnecessary maintenance overhead.
- It messes with the HTML structure, such as replacing the `<body>` tag.
- Moving all game related pages under a group just for this detail lacks flexibility.
- What if I need another component with similar logic?

> ⚠️ _I actually missed an important detail on how groups and layout nesting work, I'll show it in the solution section._

### 4. Route Slots Didn't Work Either

I tried using Route Slots, but they also didn't solve the issue because of inconsistent rendering logic between soft and hard navigation events.

### 5. Route Groups + Route Slots: The Only Workable Solution?

After some trial and error, combining Route Groups and Route Slots finally worked as a proof of concept. However, this approach has its own issues:

- It requires redundant files and a tricky layout structure to ensure the correct component is rendered:

  - `@header/(root)/layout.tsx` has Header component with default title
  - `@header/(game)/layout.tsx` has nothing and just renders children. It's because it replaces the (root) group layout.
  - `@header/(game)/[game]/layout.tsx` finally has Header component with fetched game title.

- It's challenging to keep the layouts in sync.
- I'm afraid to imagine the complexity if I need another component with similar logic.

![BGRH Slot Group Files Structure](images/bgrh-slot-group-files-structure.png)

## Is there any solution at all?

After trying multiple approaches, it seemed like the simplest option was to stick with client-side rendering for the `Header` component. This felt counterintuitive, given my goal to move to server components, but the workarounds for server-side rendering created more complexity than they solved—at least at first.

That's what I initially thought. But it turns out I missed an important detail about how groups and layout nesting work. Let's dive into the solution in the next section.

## The Solution: Route Groups and Layout Nesting

I had mistakenly believed it was impossible to nest and group layouts for the same segment. My logic was that I needed:

- A root layout for all the configurations and providers.
- A sub-root layout for the `Header` component.
- To replace the sub-root layout for a given group, e.g. `/(game)`, with a different layout.

<br />

But I thought that the Home page layout, with the default `Header`, should reside in the root layout, which led to my confusion:

```javascript
  /app
    // Root layout with configs and default `Header`.
    layout.tsx
    page.tsx // Home page

  /(game)
    // Layout with game title Header.
    // It should replace the root layout's default Header. But how?
    layout.tsx

    /[game]
      page.tsx // Game page
```

<br />

In reality, it's possible to create a group solely for the Home page and have a nested layout for it:

```javascript
  /app
    // Root layout with configs.
    layout.tsx 

    /(home)
      // Layout with default `Header`.
      layout.tsx
      page.tsx // Home page.

    // At this point, we don't even need to create a separate group for this segment.
    /[game]
      // Layout with game title Header.
      layout.tsx 
      page.tsx // Game page.
```
<br />

Since I had another group of pages that required the default `Header`, I also moved them into the Home page group and renamed the group from `/(home)` to `/(default)`.

The `Header` component is just one part of this layout. It's part of a larger layout structure that includes the `NavDrawer` and the page `Container`. So, I created a `MainLayout` component that wraps all these elements and used it in the `layout.tsx` files. This `MainLayout` component passes the necessary props to the `Header` to configure it for each layout group.

## Conclusion
I missed a crucial detail regarding how groups and layout nesting work in Next.js.

The key is that you can nest layouts for the same segment, even for the Home page. This gives you the flexibility to configure similar components differently based on the route group.

Don't forget about component composition or reusability, as I did with the `MainLayout` component.

I wish the implementation were simpler, but I like this approach because it makes the layout structure clear. Using a separate layout for the `(default)` group highlights that the layout differs. If this were done with an `if` statement in the root layout or `Header` component by checking the request URL, the unique layout configuration could easily be overlooked.
