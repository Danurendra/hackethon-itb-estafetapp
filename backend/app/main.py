import asyncpg
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import CORS_ORIGINS, DATABASE_URL

app = FastAPI(
    title="Estafet API",
    description="Local API for the Estafet community food-rescue relay.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)


@app.get("/", tags=["service"])
async def service_info() -> dict[str, str]:
    return {
        "service": "Estafet API",
        "docs": "/docs",
        "liveness": "/health/live",
        "readiness": "/health/ready",
    }


@app.get("/health/live", tags=["health"])
async def liveness() -> dict[str, str]:
    """Confirm the API process is running without depending on the database."""
    return {"status": "ok"}


@app.get("/health/ready", tags=["health"])
async def readiness() -> dict[str, object]:
    """Confirm the API can reach PostgreSQL and execute a simple query."""
    connection = None
    try:
        connection = await asyncpg.connect(DATABASE_URL, timeout=2.0)
        await connection.fetchval("SELECT 1")
    except (asyncpg.PostgresError, OSError, TimeoutError) as error:
        raise HTTPException(
            status_code=503,
            detail={"status": "unavailable", "database": "unavailable"},
        ) from error
    finally:
        if connection is not None:
            await connection.close()

    return {"status": "ok", "database": "ok"}
