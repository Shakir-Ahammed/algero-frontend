<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — Algero Admin</title>
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
            background: #3b82f6;
            top: -150px; right: -100px;
        }
        .orb-2 {
            width: 400px; height: 400px;
            background: #06b6d4;
            bottom: -100px; left: -100px;
            animation-direction: reverse;
            animation-duration: 10s;
        }
        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
        }

        .login-container {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 420px;
            padding: 20px;
        }

        .login-card {
            background: rgba(17, 24, 39, 0.5);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            padding: 48px 40px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .login-brand {
            text-align: center;
            margin-bottom: 36px;
        }
        .login-brand .logo {
            width: 56px; height: 56px;
            background: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            margin-bottom: 16px;
            color: #60a5fa;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
        }
        .login-brand h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #f9fafb;
            letter-spacing: -0.5px;
        }
        .login-brand p {
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
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }
        .form-control::placeholder { color: #6b7280; }

        .remember-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 28px;
        }
        .remember-row input { width: 16px; height: 16px; accent-color: #3b82f6; cursor: pointer; }
        .remember-row label { font-size: 13px; color: #9ca3af; cursor: pointer; margin: 0; text-transform: none; letter-spacing: 0; }

        .btn-login {
            width: 100%;
            padding: 13px;
            background: #3b82f6;
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 15px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.3px;
        }
        .btn-login:hover {
            background: #60a5fa;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.25);
            transform: translateY(-1px);
        }
        .btn-login:active { transform: translateY(0); }

        .error-msg {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.25);
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 24px;
            color: #f87171;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="login-container">
        <div class="login-card">
            <div class="login-brand">
                <div class="logo">🔐</div>
                <h1>Algero Admin</h1>
                <p>Sign in to manage your content</p>
            </div>

            @if($errors->any())
                <div class="error-msg">
                    @foreach($errors->all() as $error)
                        {{ $error }}
                    @endforeach
                </div>
            @endif

            <form method="POST" action="/admin/login">
                @csrf
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="{{ old('email') }}" placeholder="admin@algero.com" required autofocus>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control"
                           placeholder="••••••••" required>
                </div>

                <div class="remember-row">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>

                <button type="submit" class="btn-login">Sign In</button>
            </form>
        </div>
    </div>
</body>
</html>
