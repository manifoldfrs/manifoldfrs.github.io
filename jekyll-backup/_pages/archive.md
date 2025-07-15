---
layout: page
title: Archive
permalink: /archive/
---

<div class="archive-page">
  <p class="archive-intro">
    A chronological listing of all published posts. You can browse through the history of thoughts and updates shared on this site.
  </p>

  <ul class="archive-list">
    {% for post in site.posts %}
      <li class="archive-list-item">
        <span class="archive-list-item__date">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
        </span>
        <span class="archive-list-item__separator">&raquo;</span>
        <a class="archive-list-item__title" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        {% if post.categories.size > 0 %}
          <span class="archive-list-item__categories">
            (<em>{% for category in post.categories %}{{ category }}{% unless forloop.last %}, {% endunless %}{% endfor %}</em>)
          </span>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
</div>
