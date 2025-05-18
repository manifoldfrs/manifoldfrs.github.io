---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-index">
  <div class="post-list">
    {% for post in paginator.posts %}
      {% include post-card.html post=post %}
    {% else %}
      <p>No posts found.</p>
    {% endfor %}
  </div>

{% include pagination.html %}

</div>
