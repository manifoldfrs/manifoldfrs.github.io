---
layout: page
title: Portfolio
permalink: /portfolio/
---

<div class="portfolio">
  <div class="portfolio-items">
    {% for item in site.portfolio %}
      <article class="portfolio-item">
        <h2 class="portfolio-title">
          <a href="{{ item.url | prepend: site.baseurl }}">{{ item.title }}</a>
        </h2>
        <p class="portfolio-meta">
          <time datetime="{{ item.date | date_to_xmlschema }}">
            {{ item.date | date: "%b %-d, %Y" }}
          </time>
          {% if item.categories.size > 0 %}
          <span class="portfolio-categories">
            in
            {% for category in item.categories %}
              <a href="{{ site.baseurl }}/portfolio/categories/#{{ category | slugify }}">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
          {% endif %}
        </p>

        {% if item.featured_image %}
        <div class="portfolio-image">
          <img src="{{ item.featured_image | prepend: site.baseurl }}" alt="{{ item.title }}">
        </div>
        {% endif %}

        <div class="portfolio-excerpt">
          {{ item.excerpt }}
        </div>

        <a href="{{ item.url | prepend: site.baseurl }}" class="read-more">View Project</a>
      </article>
    {% endfor %}

  </div>
</div>
