<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    /**
     * Verify a reCAPTCHA v2 response token with Google.
     *
     * @param  string|null  $token  The g-recaptcha-response token from the client.
     * @return bool  True if verification succeeded, false otherwise.
     */
    public static function verify(?string $token): bool
    {
        $secret = config('services.recaptcha.secret');

        // If no secret key is configured, skip verification (dev/staging)
        if (empty($secret)) {
            return true;
        }

        // Skip verification in local / testing environments
        if (in_array(app()->environment(), ['local', 'testing', 'development'])) {
            return true;
        }

        // If secret is set but no token provided, fail
        if (empty($token)) {
            return false;
        }

        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => $secret,
                'response' => $token,
            ]);

            $body = $response->json();

            return $body['success'] ?? false;
        } catch (\Exception $e) {
            Log::error('reCAPTCHA verification failed: ' . $e->getMessage());
            return false;
        }
    }
}
