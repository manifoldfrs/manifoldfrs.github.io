---
layout: page
title: Portfolio
permalink: /portfolio/
---

<div class="portfolio-index">
  <p></p>
  {% comment %}
  <div class="portfolio-items">
    {% for item in site.portfolio %}
      <article class="portfolio-item">
        <h2 class="portfolio-item__title">
          <a href="{{ item.url | prepend: site.baseurl }}">{{ item.title }}</a>
        </h2>
        <p class="portfolio-item__meta">
          <time datetime="{{ item.date | date_to_xmlschema }}">
            {{ item.date | date: "%b %-d, %Y" }}
          </time>
          {% if item.categories.size > 0 %}
          <span class="portfolio-item__categories">
            in
            {% for category in item.categories %}
              <a href="{{ site.baseurl }}/portfolio/categories/#{{ category | slugify }}">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
          {% endif %}
        </p>

        {% if item.featured_image %}
        <div class="portfolio-item__image">
          <a href="{{ item.url | prepend: site.baseurl }}">
            <img src="{{ item.featured_image | prepend: site.baseurl }}" alt="{{ item.title }}">
          </a>
        </div>
        {% endif %}

        <div class="portfolio-item__excerpt">
          {{ item.excerpt | strip_html | truncatewords: 30 }}
        </div>

        <a href="{{ item.url | prepend: site.baseurl }}" class="portfolio-item__read-more read-more">View Project &rarr;</a>
      </article>
    {% endfor %}

  </div>
  {% endcomment %}
</div>
