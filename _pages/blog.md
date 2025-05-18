---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog">
  <div class="blog-posts">
    {% for post in site.posts %}
      <article class="post-item">
        <h2 class="post-title">
          <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h2>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%b %-d, %Y" }}
          </time>
          {% if post.categories.size > 0 %}
          <span class="post-categories">
            in
            {% for category in post.categories %}
              <a href="{{ site.baseurl }}/categories/#{{ category | slugify }}">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
          {% endif %}
        </p>
        <div class="post-excerpt">
          {{ post.excerpt }}
        </div>
        <a href="{{ post.url | prepend: site.baseurl }}" class="read-more">Read More</a>
      </article>
    {% endfor %}
  </div>
</div>
