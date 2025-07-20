# Migration Plan: GitHub Pages to FastAPI + AWS

## Overview
Migrate from static GitHub Pages site to a dynamic Python/FastAPI backend with AWS asset hosting.

## Phase 1: Backend API Development

### 1.1 FastAPI Backend Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration management
│   ├── models/
│   │   ├── __init__.py
│   │   ├── post.py          # Post data models
│   │   └── user.py          # User models (future)
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── posts.py     # Post endpoints
│   │   │   ├── categories.py # Category endpoints
│   │   │   └── assets.py    # Asset management
│   ├── core/
│   │   ├── __init__.py
│   │   ├── database.py      # Database connection
│   │   └── security.py      # Auth/security
│   ├── services/
│   │   ├── __init__.py
│   │   ├── post_service.py  # Business logic
│   │   └── s3_service.py    # AWS S3 integration
│   └── utils/
│       ├── __init__.py
│       └── markdown.py      # Markdown processing
├── alembic/                 # Database migrations
├── tests/
├── requirements.txt
└── Dockerfile
```

### 1.2 Key API Endpoints
- `GET /api/v1/posts` - List all posts (with pagination)
- `GET /api/v1/posts/{slug}` - Get single post
- `GET /api/v1/categories` - List categories
- `GET /api/v1/categories/{name}/posts` - Posts by category
- `GET /api/v1/archive` - Archive data
- `POST /api/v1/posts` - Create post (admin)
- `PUT /api/v1/posts/{slug}` - Update post (admin)
- `DELETE /api/v1/posts/{slug}` - Delete post (admin)

### 1.3 Database Schema (PostgreSQL)
```sql
-- Posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'draft',
    featured_image VARCHAR(500)
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- Post categories (many-to-many)
CREATE TABLE post_categories (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Assets table
CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    content_type VARCHAR(100),
    size BIGINT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Phase 2: AWS Infrastructure

### 2.1 AWS Services Architecture
```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   CloudFront   │────▶│ S3 (Assets)  │     │  RDS/Aurora │
│      (CDN)     │     │  - Images    │     │ (PostgreSQL)│
└────────┬────────┘     │  - Files     │     └──────▲──────┘
         │              └──────────────┘              │
         │                                            │
         ▼                                            │
┌─────────────────┐     ┌──────────────┐             │
│ Route 53 (DNS) │────▶│   EC2/ECS    │─────────────┘
└─────────────────┘     │  (FastAPI)   │
                        └──────────────┘
```

### 2.2 S3 Bucket Structure
```
your-blog-assets/
├── images/
│   ├── posts/
│   │   └── 2024/
│   │       └── 01/
│   │           └── post-image.jpg
│   ├── profile/
│   └── misc/
├── documents/
└── uploads/
```

### 2.3 Infrastructure as Code (Terraform)
```hcl
# S3 bucket for assets
resource "aws_s3_bucket" "blog_assets" {
  bucket = "your-blog-assets"
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "assets_cdn" {
  origin {
    domain_name = aws_s3_bucket.blog_assets.bucket_regional_domain_name
    origin_id   = "S3-blog-assets"
  }
  # ... configuration
}

# RDS instance
resource "aws_db_instance" "blog_db" {
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"
  # ... configuration
}
```

## Phase 3: Frontend Updates

### 3.1 API Integration Layer
```typescript
// lib/api.ts
class BlogAPI {
  private baseURL: string;
  
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourdomain.com';
  }
  
  async getPosts(page: number = 1, limit: number = 10) {
    const response = await fetch(`${this.baseURL}/api/v1/posts?page=${page}&limit=${limit}`);
    return response.json();
  }
  
  async getPost(slug: string) {
    const response = await fetch(`${this.baseURL}/api/v1/posts/${slug}`);
    return response.json();
  }
  
  // ... other methods
}
```

### 3.2 Environment Configuration
```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3.3 Update Data Fetching
Replace static file reading with API calls:
```typescript
// pages/index.tsx
export const getServerSideProps: GetServerSideProps = async () => {
  const api = new BlogAPI();
  const posts = await api.getPosts(1, 5);
  
  return {
    props: { posts },
  };
};
```

## Phase 4: Migration Steps

### 4.1 Data Migration Script
```python
# scripts/migrate_posts.py
import os
import frontmatter
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def migrate_jekyll_posts():
    """Migrate Jekyll posts to PostgreSQL"""
    posts_dir = "jekyll-backup/_posts"
    
    for filename in os.listdir(posts_dir):
        if filename.endswith('.md'):
            with open(os.path.join(posts_dir, filename), 'r') as f:
                post = frontmatter.load(f)
                
                # Extract data
                slug = filename.replace('.md', '')
                title = post['title']
                content = post.content
                categories = post.get('categories', [])
                date = post.get('date')
                
                # Insert into database
                # ... database insertion logic
```

### 4.2 Asset Migration to S3
```python
# scripts/migrate_assets.py
import boto3
from pathlib import Path

s3_client = boto3.client('s3')
bucket_name = 'your-blog-assets'

def upload_to_s3(local_path, s3_key):
    """Upload file to S3"""
    s3_client.upload_file(
        local_path,
        bucket_name,
        s3_key,
        ExtraArgs={'ACL': 'public-read'}
    )

def migrate_images():
    """Migrate all images to S3"""
    images_dir = Path('public/images')
    
    for image_path in images_dir.rglob('*'):
        if image_path.is_file():
            s3_key = f"images/{image_path.relative_to(images_dir)}"
            upload_to_s3(str(image_path), s3_key)
```

## Phase 5: Deployment Strategy

### 5.1 Docker Configuration
```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 5.2 CI/CD Pipeline (GitHub Actions)
```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push Docker image
        run: |
          docker build -t your-registry/blog-api:latest .
          docker push your-registry/blog-api:latest
      
      - name: Deploy to ECS
        # ... ECS deployment steps
```

## Phase 6: Performance Optimizations

### 6.1 Caching Strategy
- Redis for API response caching
- CloudFront for static asset caching
- Database query optimization with indexes

### 6.2 Image Optimization
- Automatic image resizing on upload
- WebP format generation
- Lazy loading implementation

### 6.3 API Optimizations
- GraphQL implementation (optional)
- Response compression
- Rate limiting

## Phase 7: Security Considerations

### 7.1 API Security
- JWT authentication for admin endpoints
- CORS configuration
- Rate limiting with Redis
- Input validation with Pydantic

### 7.2 AWS Security
- VPC configuration
- Security groups
- IAM roles and policies
- SSL/TLS certificates

## Phase 8: Monitoring & Analytics

### 8.1 Application Monitoring
- AWS CloudWatch integration
- Sentry for error tracking
- Custom metrics with Prometheus

### 8.2 Analytics
- Google Analytics 4
- Custom event tracking
- Performance monitoring

## Migration Timeline

1. **Week 1-2**: Set up FastAPI backend, database schema
2. **Week 3**: Implement core API endpoints
3. **Week 4**: AWS infrastructure setup
4. **Week 5**: Data migration scripts
5. **Week 6**: Frontend API integration
6. **Week 7**: Testing and optimization
7. **Week 8**: Deployment and monitoring setup

## Cost Estimation (Monthly)

- **EC2 t3.micro**: ~$10
- **RDS t3.micro**: ~$15
- **S3 + CloudFront**: ~$5-10
- **Route 53**: ~$1
- **Total**: ~$35-40/month

## Benefits of Migration

1. **Dynamic Content**: Real-time updates without rebuilding
2. **Scalability**: Easy to scale with AWS services
3. **Admin Interface**: Build a CMS for content management
4. **API Access**: Mobile apps, third-party integrations
5. **Analytics**: Better tracking and insights
6. **SEO**: Server-side rendering improvements
7. **Performance**: CDN for global content delivery

## Next Steps - Implementation Roadmap

### Immediate Actions (Week 1)

1. **Set Up Development Environment**
   ```bash
   # Clone and set up backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   
   # Copy environment template
   cp .env.example .env
   # Edit .env with your local settings
   
   # Start Docker services
   docker-compose up -d db redis minio
   ```

2. **Create FastAPI Models**
   ```python
   # backend/app/models/post.py
   from sqlalchemy import Column, Integer, String, Text, DateTime
   from app.core.database import Base
   
   class Post(Base):
       __tablename__ = "posts"
       
       id = Column(Integer, primary_key=True, index=True)
       slug = Column(String, unique=True, index=True)
       title = Column(String)
       content = Column(Text)
       # ... other fields
   ```

3. **Implement Basic API Endpoints**
   ```python
   # backend/app/api/posts.py
   from fastapi import APIRouter, Depends, HTTPException
   from sqlalchemy.orm import Session
   from app.core.database import get_db
   from app.models.post import Post
   
   router = APIRouter()
   
   @router.get("/")
   async def get_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
       posts = db.query(Post).offset(skip).limit(limit).all()
       return posts
   ```

### Short Term (Weeks 2-3)

1. **Data Migration**
   ```bash
   # Run migration script
   python scripts/migrate_posts.py
   
   # Verify data integrity
   python scripts/verify_migration.py
   ```

2. **Frontend Integration**
   - Update pages to use the new API client
   - Add error handling and loading states
   - Implement caching strategies

3. **AWS Setup**
   ```bash
   # Initialize Terraform
   cd infrastructure
   terraform init
   
   # Plan infrastructure
   terraform plan
   
   # Apply (create resources)
   terraform apply
   ```

### Medium Term (Weeks 4-6)

1. **Admin Dashboard**
   - Create `/admin` routes in Next.js
   - Implement authentication with NextAuth.js
   - Build post editor with markdown preview
   - Add image upload to S3

2. **Performance Optimization**
   - Implement Redis caching
   - Add database indexes
   - Set up CloudFront behaviors
   - Optimize image delivery

3. **Testing**
   ```bash
   # Backend tests
   cd backend
   pytest tests/
   
   # Frontend tests
   npm run test
   
   # E2E tests
   npm run test:e2e
   ```

### Long Term (Weeks 7-8)

1. **Production Deployment**
   - Set up GitHub Actions for CI/CD
   - Configure domain and SSL
   - Deploy to AWS ECS/EC2
   - Set up monitoring

2. **Advanced Features**
   - Full-text search with PostgreSQL
   - Comment system
   - Newsletter integration
   - Analytics dashboard

## Specific Next Steps for You

### 1. Local Backend Development (Today)
```bash
# Create Python virtual environment
cd backend
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create initial database models
mkdir -p app/models
# Copy the provided model examples

# Run FastAPI locally
uvicorn app.main:app --reload
```

### 2. Database Setup (This Week)
```bash
# Start PostgreSQL with Docker
docker run --name blog-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# Create database
docker exec -it blog-db psql -U postgres -c "CREATE DATABASE blog;"

# Run Alembic migrations
cd backend
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### 3. Frontend Preparation (This Week)
```typescript
// Update pages to check for API availability
// pages/index.tsx
import { getAPIClient } from '@/lib/api/client';

export const getServerSideProps = async () => {
  const client = getAPIClient();
  
  try {
    const posts = await client.getPosts(1, 5);
    return { props: { posts, useAPI: true } };
  } catch (error) {
    // Fallback to static data
    const { getSortedPostsData } = await import('@/lib/posts');
    const posts = getSortedPostsData().slice(0, 5);
    return { props: { posts, useAPI: false } };
  }
};
```

### 4. Migration Script (Next Week)
```python
# scripts/migrate_posts.py
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.core.database import SessionLocal
from backend.app.models.post import Post
import frontmatter
from datetime import datetime

def migrate_posts():
    db = SessionLocal()
    posts_dir = "jekyll-backup/_posts"
    
    for filename in os.listdir(posts_dir):
        if filename.endswith('.md'):
            # Parse Jekyll post
            with open(os.path.join(posts_dir, filename), 'r') as f:
                post_data = frontmatter.load(f)
            
            # Create database entry
            post = Post(
                slug=filename.replace('.md', ''),
                title=post_data['title'],
                content=post_data.content,
                published_at=post_data['date'],
                # ... other fields
            )
            db.add(post)
    
    db.commit()
    db.close()

if __name__ == "__main__":
    migrate_posts()
```

### 5. AWS Infrastructure (In 2 Weeks)
```hcl
# infrastructure/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Start with basic resources
resource "aws_s3_bucket" "blog_assets" {
  bucket = "${var.project_name}-assets"
}

resource "aws_db_instance" "blog_db" {
  identifier     = "${var.project_name}-db"
  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"
  # ... configuration
}
```

## Development Checklist

- [ ] Set up Python virtual environment
- [ ] Install backend dependencies
- [ ] Create database models
- [ ] Implement basic API endpoints
- [ ] Set up local PostgreSQL
- [ ] Run database migrations
- [ ] Create API client abstraction
- [ ] Update one page to use API
- [ ] Write data migration script
- [ ] Test migration with sample data
- [ ] Set up AWS account
- [ ] Create S3 bucket for assets
- [ ] Deploy backend to AWS
- [ ] Update DNS settings
- [ ] Monitor and optimize

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PostgreSQL with Docker](https://hub.docker.com/_/postgres)