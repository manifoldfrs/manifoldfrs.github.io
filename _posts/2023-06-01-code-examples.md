---
layout: post
title: "Code Block Examples"
date: 2023-06-01 12:00:00 +0000
categories: [development, examples]
---

# Code Block Examples

This post demonstrates various code blocks with syntax highlighting and the new copy functionality.

## Python Example

```python
def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Generate the first 10 Fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")
```

## JavaScript Example

```javascript
// Function to create a simple counter
function createCounter() {
  let count = 0;

  return {
    increment: function () {
      return ++count;
    },
    decrement: function () {
      return --count;
    },
    getValue: function () {
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    }
  };
}

// Usage
const counter = createCounter();
console.log(counter.getValue()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset()); // 0
```

## HTML Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Example Page</title>
    <link
      rel="stylesheet"
      href="styles.css"
    />
  </head>
  <body>
    <header>
      <h1>Welcome to My Website</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h2>About Us</h2>
        <p>This is a simple example website.</p>
      </section>
    </main>

    <footer>
      <p>&copy; 2023 Example Site</p>
    </footer>
  </body>
</html>
```

## CSS Example

```css
/* Basic styling for the example page */
:root {
  --primary-color: #2e3440;
  --text-color: #eceff4;
  --accent-color: #88c0d0;
}

body {
  font-family: "Arial", sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--primary-color);
  margin: 0;
  padding: 0;
}

header {
  background-color: var(--accent-color);
  color: var(--primary-color);
  padding: 1rem;
  text-align: center;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

nav a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: bold;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  border-top: 1px solid var(--accent-color);
}
```

## Ruby Example

```ruby
# A simple Ruby class for a blog post
class BlogPost
  attr_accessor :title, :content, :author, :published_at

  def initialize(title, content, author)
    @title = title
    @content = content
    @author = author
    @published_at = nil
  end

  def publish
    @published_at = Time.now
    puts "Post '#{@title}' by #{@author} published at #{@published_at}"
  end

  def word_count
    @content.split.size
  end

  def reading_time
    # Assuming average reading speed of 200 words per minute
    (word_count / 200.0).ceil
  end
end

# Create a new blog post
post = BlogPost.new(
  "Code Blocks with Nord Theme",
  "This post demonstrates code blocks styled with the Nord theme...",
  "Faris Habib"
)

post.publish
puts "Word count: #{post.word_count}"
puts "Estimated reading time: #{post.reading_time} minute(s)"
```
