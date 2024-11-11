from datetime import UTC, datetime
import os
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from dotenv import load_dotenv
from pytz import utc

from models.documents.tokens import BlacklistToken, RefreshToken
from utils.raven_database.databases import AuthDB

load_dotenv()


TokenScheduler = AsyncIOScheduler(timezone=utc)

@TokenScheduler.scheduled_job('interval', minutes=int(os.getenv('REFRESH_TOKEN_EXP')))
def handle_refresh_tokens():
    try:
        with AuthDB().store().open_session() as auth:
            tokens = list(auth.query_collection('RefreshTokens', RefreshToken).where_less_than('expires', datetime.now(UTC).timestamp()))
            for token in tokens:
                auth.delete(token)
                auth.save_changes()
    except:
        pass

@TokenScheduler.scheduled_job('interval', minutes=int(os.getenv('REFRESH_TOKEN_EXP')))
def handle_blacklist_tokens():
    try:
        with AuthDB().store().open_session() as auth:
            tokens = list(auth.query_collection('BlacklistTokens', BlacklistToken).where_less_than('expires', datetime.now(UTC).timestamp()))
            for token in tokens:
                auth.delete(token)
                auth.save_changes()
    except:
        pass