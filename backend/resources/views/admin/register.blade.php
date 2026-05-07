<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register — Algero Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #030712;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        /* Animated background grid */
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            pointer-events: none;
        }

        /* Animated background orbs */
        .orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.2;
            z-index: 0;
            animation: float 8s ease-in-out infinite;
        }
        .orb-1 {
            width: 500px; height: 500px;
            background: #22c55e;
            top: -150px; right: -100px;
        }
        .orb-2 {
            width: 400px; height: 400px;
            background: #3b82f6;
            bottom: -100px; left: -100px;
            animation-direction: reverse;
            animation-duration: 10s;
        }
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
        }

        .register-container {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 440px;
            padding: 20px;
        }

        .register-card {
            background: rgba(17, 24, 39, 0.5);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            padding: 48px 40px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .register-brand {
            text-align: center;
            margin-bottom: 36px;
        }
        .register-brand .logo {
            width: 56px; height: 56px;
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            color: #4ade80;
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.15);
        }
        .register-brand h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #f9fafb;
            letter-spacing: -0.5px;
        }
        .register-brand p {
            color: #9ca3af;
            font-size: 14px;
            margin-top: 6px;
        }

        .form-group { margin-bottom: 22px; }
        .form-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: #9ca3af;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .form-control {
            width: 100%;
            padding: 12px 16px;
            background: rgba(3, 7, 18, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 10px;
            color: #f9fafb;
            font-size: 15px;
            font-family: inherit;
            transition: all 0.2s ease;
        }
        .form-control:focus {
            outline: none;
            border-color: #22c55e;
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.15);
        }
        .form-control::placeholder { color: #6b7280; }

        .btn-register {
            width: 100%;
            padding: 13px;
            background: #22c55e;
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 15px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.3px;
            margin-top: 8px;
        }
        .btn-register:hover {
            background: #4ade80;
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.25);
            transform: translateY(-1px);
        }
        .btn-register:active { transform: translateY(0); }

        .error-msg {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.25);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: #f87171;
            font-size: 14px;
        }

        .success-msg {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.25);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: #4ade80;
            font-size: 14px;
        }

        .login-link {
            text-align: center;
            margin-top: 24px;
            font-size: 14px;
            color: #9ca3af;
        }
        .login-link a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        .login-link a:hover { color: #93bbfd; }

        .info-banner {
            background: rgba(59, 130, 246, 0.08);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: #93c5fd;
            font-size: 13px;
            line-height: 1.5;
            display: flex;
            gap: 10px;
            align-items: flex-start;
        }
        .info-banner svg {
            flex-shrink: 0;
            margin-top: 2px;
        }
    </style>
</head>
<body>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="register-container">
        <div class="register-card">
            <div class="register-brand">
                <div class="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                </div>
                <h1>Create Account</h1>
                <p>Register for an Algero Admin account</p>
            </div>

            <div class="info-banner">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <span>After registration, your account will remain <strong>inactive</strong> until approved by the Super Admin.</span>
            </div>

            @if(session('success'))
                <div class="success-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="error-msg">
                    @foreach($errors->all() as $error)
                        {{ $error }}<br>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="/admin/register">
                @csrf
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" class="form-control"
                           value="{{ old('name') }}" placeholder="John Doe" required autofocus>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="{{ old('email') }}" placeholder="admin@algero.com" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control"
                           placeholder="••••••••" required>
                </div>

                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" class="form-control"
                           placeholder="••••••••" required>
                </div>

                <button type="submit" class="btn-register">Create Account</button>
            </form>

            <div class="login-link">
                Already have an account? <a href="/admin/login">Sign In</a>
            </div>
        </div>
    </div>
</body>
</html>
