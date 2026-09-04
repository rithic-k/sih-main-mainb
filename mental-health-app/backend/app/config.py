from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://voltix:voltix_dev_pw@localhost:5432/wellness_app"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "change_me_dev_only"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    steam_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
