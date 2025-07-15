---
layout: page
title: Portfolio
permalink: /portfolio/
excerpt: "A showcase of projects and work."
---

<div class="portfolio-index">
  <p></p>
  {% comment %}
  <div class="portfolio-items">
    {% for item in site.portfolio %}
      <article class="portfolio-item">
        <h2 class="portfolio-item__title">
          <a href="{{ item.url | relative_url }}">{{ item.title | escape }}</a>
        </h2>
        <p class="portfolio-item__meta">
          <time datetime="{{ item.date | date_to_xmlschema }}">
            {{ item.date | date: "%b %-d, %Y" }}
          </time>
          {% if item.categories.size > 0 %}
          <span class="portfolio-item__categories">
            in
            {% for category_item in item.categories %}
              <a href="{{ '/portfolio/categories/' | append: category_item | slugify | relative_url }}">{{ category_item | escape }}</a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
          {% endif %}
        </p>

        {% if item.featured_image %}
        <div class="portfolio-item__image">
          <a href="{{ item.url | relative_url }}">
            <img src="{{ item.featured_image | relative_url }}" alt="{{ item.title | escape }}" loading="lazy">
          </a>
        </div>
        {% endif %}

        <div class="portfolio-item__excerpt">
          {{ item.excerpt | strip_html | truncatewords: 30 }}
        </div>

        <a href="{{ item.url | relative_url }}" class="portfolio-item__read-more read-more" aria-label="View project {{ item.title | escape }}">View Project &rarr;</a>
      </article>
    {% endfor %}

  </div>
  {% endcomment %}
</div>
