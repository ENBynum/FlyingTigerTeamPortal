import os

from dotenv import load_dotenv
from ravendb import DocumentStore

load_dotenv()

class AuthDB:
    _store: DocumentStore = None

    @staticmethod
    def _create_document_store() -> DocumentStore:
        document_store = DocumentStore([os.getenv('RAVENDB_SERVER_URL')], 'Auth')
        document_store.certificate_pem_path = os.getenv('RAVENDB_SERVER_CERT')
        document_store.initialize()
        return document_store
    
    @classmethod
    def store(cls) -> DocumentStore:
        if not cls._store:
            cls._store = cls._create_document_store()

        return cls._store
    
class RSTDB:
    _store: DocumentStore = None

    @staticmethod
    def _create_document_store() -> DocumentStore:
        document_store = DocumentStore([os.getenv('RAVENDB_SERVER_URL')], 'RST')
        document_store.certificate_pem_path = os.getenv('RAVENDB_SERVER_CERT')
        document_store.initialize()
        return document_store
    
    @classmethod
    def store(cls) -> DocumentStore:
        if not cls._store:
            cls._store = cls._create_document_store()

        return cls._store