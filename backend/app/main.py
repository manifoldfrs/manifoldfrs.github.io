from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import posts, categories
from app.core.config import settings

app = FastAPI(
    title="Blog API",
    description="API for personal blog",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(posts.router, prefix="/api/v1/posts", tags=["posts"])
app.include_router(categories.router, prefix="/api/v1/categories", tags=["categories"])

@app.get("/")
async def root():
    return {"message": "Blog API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}