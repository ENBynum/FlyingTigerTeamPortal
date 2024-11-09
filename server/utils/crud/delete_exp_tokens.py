from datetime import UTC, datetime
from models.documents.tokens import BlacklistToken, RefreshToken
from utils.raven_database.databases import AuthDB


def delete_expired_tokens():
    try:
        with AuthDB().store().open_session() as session:
            refresh_tokens = list(session.query_collection('RefreshTokens', RefreshToken))
            for token in refresh_tokens:
                if token.expires.timestamp() < datetime.now(UTC).timestamp():
                    session.delete(token)

            blacklist_tokens = list(session.query_collection('BlacklistTokens', BlacklistToken))
            for token in blacklist_tokens:
                if token.expires.timestamp() < datetime.now(UTC).timestamp():
                    session.delete(token)
    except:
        pass