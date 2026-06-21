import logging

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


async def verify_recaptcha(token: str | None) -> bool:
    """Verify a reCAPTCHA v2 token. Ports App\\Http\\Services\\RecaptchaService.

    - No secret configured  -> skip (return True) for dev/staging.
    - Local-like environment -> skip.
    - Secret set but no token -> fail.
    """
    secret = settings.recaptcha_secret
    if not secret:
        return True
    if settings.is_local:
        return True
    if not token:
        return False

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                VERIFY_URL, data={"secret": secret, "response": token}
            )
            body = response.json()
            return bool(body.get("success", False))
    except Exception as exc:  # noqa: BLE001
        logger.error("reCAPTCHA verification failed: %s", exc)
        return False
